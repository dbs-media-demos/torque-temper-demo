"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { services } from "@/content/services";
import { symptoms } from "@/content/symptoms";
import { makes } from "@/content/general";
import { slotsFor, fmtTime } from "@/lib/hours";
import { site, telHref } from "@/lib/site";
import { ArrowRight, Check, Phone } from "@/components/ui/Icons";
import { LogoMark } from "@/components/brand/Logo";

type Data = {
  year: string;
  make: string;
  model: string;
  mileage: string;
  services: string[];
  notes: string;
  mode: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  texts: boolean;
};

const STEPS = ["Vehicle", "Services", "Drop-off", "Date & time", "Your details"] as const;

const MODES = [
  { id: "wait", title: "Wait in the lounge", text: "Wi-Fi, desks, coffee. Best for jobs under 2 hours." },
  { id: "drop", title: "Drop off", text: "Leave the keys, we text photos and a pickup time." },
  { id: "shuttle", title: "Drop off + shuttle", text: "Free ride home or to work within 5 miles." },
  { id: "loaner", title: "Need a loaner", text: "For longer repairs. Subject to availability." },
];

const years = Array.from({ length: 2027 - 1996 + 1 }, (_, i) => String(2027 - i));

/** Deterministic "already booked" slots so the calendar looks like a real, busy shop. */
const taken = (date: string, time: string) => {
  let h = 0;
  for (const c of date + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 3 === 0;
};

const isoDay = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function Field({ label, error, children, hint, id }: { label: string; error?: string; children: ReactNode; hint?: string; id: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-faint">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="text-sm text-signal" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "min-h-12 w-full border border-line-strong bg-transparent px-4 text-base text-fg outline-none transition-colors placeholder:text-faint focus:border-signal aria-[invalid=true]:border-signal";

/** Torque-gauge progress: the needle sweeps toward "spec" as steps complete. */
function Gauge({ step }: { step: number }) {
  const pct = step / STEPS.length;
  const angle = -120 + pct * 240;
  return (
    <svg viewBox="0 0 120 80" className="w-28" aria-hidden>
      <path d="M14 70 A48 48 0 1 1 106 70" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="6" />
      <path
        d="M14 70 A48 48 0 1 1 106 70"
        fill="none"
        stroke="#ff5b1f"
        strokeWidth="6"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 - pct, transition: "stroke-dashoffset .8s cubic-bezier(.16,1,.3,1)" }}
      />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1="60" y1="14" x2="60" y2="20" stroke="currentColor" strokeOpacity=".4" transform={`rotate(${-120 + i * 30} 60 58)`} />
      ))}
      <line x1="60" y1="58" x2="60" y2="22" stroke="currentColor" strokeWidth="2" style={{ transform: `rotate(${angle}deg)`, transformOrigin: "60px 58px", transition: "transform .9s cubic-bezier(.34,1.56,.64,1)" }} />
      <circle cx="60" cy="58" r="4" fill="#ff5b1f" />
    </svg>
  );
}

export function BookingForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<null | { ref: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<Data>({
    year: "",
    make: "",
    model: "",
    mileage: "",
    services: [],
    notes: "",
    mode: "wait",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    texts: true,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Pre-fill from ?service= and ?symptom= (links from service pages and the symptom finder).
  useEffect(() => {
    const svc = params.get("service");
    const sym = symptoms.find((x) => x.id === params.get("symptom"));
    if (!svc && !sym) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData((d) => ({
      ...d,
      services: svc && services.some((s) => s.slug === svc) ? [svc] : d.services,
      notes: sym ? `Symptom: ${sym.label}.` : d.notes,
    }));
  }, [params]);

  const days = useMemo(() => {
    const out: Date[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (out.length < 12) {
      d.setDate(d.getDate() + 1);
      if (site.hours[d.getDay()].open) out.push(new Date(d));
    }
    return out;
  }, []);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k as string];
      return n;
    });
  };

  const validate = (i: number) => {
    const e: Record<string, string> = {};
    if (i === 0) {
      if (!data.year) e.year = "Choose the model year.";
      if (!data.make) e.make = "Choose the make.";
      if (data.model.trim().length < 1) e.model = "Enter the model, for example Camry or F-150.";
    }
    if (i === 1 && data.services.length === 0 && data.notes.trim().length < 5) e.services = "Pick at least one service, or describe what's going on.";
    if (i === 3) {
      if (!data.date) e.date = "Choose a day.";
      else if (!data.time) e.time = "Choose a time.";
    }
    if (i === 4) {
      if (data.name.trim().length < 2) e.name = "Enter your name.";
      if (data.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone number so we can text your photos.";
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "That email doesn't look right.";
    }
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [data-err]")?.focus());
      return false;
    }
    return true;
  };

  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      const top = formRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) window.scrollTo({ top: window.scrollY + top - 120, behavior: "smooth" });
    });
  };

  const next = () => validate(step) && go(step + 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) return next();
    if (!validate(step)) return;
    // Demo: nothing is sent anywhere.
    setDone({ ref: `TT-${20417 + Number(data.phone.replace(/D/g, "").slice(-3))}` });
    requestAnimationFrame(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }));
  };

  const chosen = services.filter((s) => data.services.includes(s.slug));
  const dateLabel = data.date ? new Date(`${data.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "";
  const vehicle = [data.year, data.make, data.model].filter(Boolean).join(" ");

  /** The live work-order ticket on the right. */
  const ticket = (
    <div className={clsx("relative border border-line bg-surface p-6 font-mono text-sm", done && "border-signal")}>
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-line-strong pb-4">
        <div className="flex items-center gap-3">
          <LogoMark className="size-8" />
          <div className="leading-tight">
            <p className="text-[0.7rem] uppercase tracking-[0.16em]">Work order</p>
            <p className="text-[0.7rem] text-muted">{done ? done.ref : "Draft"}</p>
          </div>
        </div>
        <Gauge step={done ? STEPS.length : step} />
      </div>
      <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-3 text-[0.8rem]">
        {[
          ["Vehicle", vehicle || "—"],
          ["Mileage", data.mileage ? `${Number(data.mileage.replace(/\D/g, "")).toLocaleString("en-US")} mi` : "—"],
          ["Services", chosen.length ? chosen.map((c) => c.name).join(", ") : data.notes ? "Diagnosis" : "—"],
          ["Drop-off", MODES.find((m) => m.id === data.mode)?.title ?? "—"],
          ["When", data.date ? `${dateLabel}${data.time ? `, ${fmtTime(data.time)}` : ""}` : "—"],
          ["Customer", data.name || "—"],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="uppercase tracking-[0.1em] text-faint">{k}</dt>
            <dd className="break-words">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t border-dashed border-line-strong pt-4 text-[0.72rem] text-muted">
        Estimate sent by text with photos before any work. 24-month / 24,000-mile warranty.
      </div>
      {done && (
        <span className="stamp absolute right-5 top-24 rotate-[-12deg] border-[3px] border-signal px-3 py-1 font-display text-2xl font-black uppercase tracking-[0.06em] text-signal [--wdth:100]">
          Booked
        </span>
      )}
    </div>
  );

  if (done) {
    return (
      <div className="grid gap-10 lg:grid-cols-[1fr_26rem]">
        <div className="anim-fade flex flex-col gap-6" role="status" aria-live="polite">
          <span className="grid size-16 place-items-center bg-signal text-asphalt">
            <Check width={32} height={32} />
          </span>
          <h2 className="t-h2">You&apos;re on the board, {data.name.split(" ")[0]}.</h2>
          <p className="t-lead max-w-xl text-muted">
            {dateLabel} at {fmtTime(data.time)} for your {vehicle}. Dana will text {data.phone} to confirm within 15 minutes during business hours.
          </p>
          <ul className="flex flex-col gap-3 border-t border-line pt-6 text-sm">
            <li className="flex gap-3">
              <span className="font-mono text-signal">01</span> Bring the car and keys. Early drop-off? Use the key drop by the office door.
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-signal">02</span> We inspect it and text you photos with a price for each item.
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-signal">03</span> You approve what you want. Nothing else gets done.
            </li>
          </ul>
          <p className="text-xs text-faint">This is a concept site, so no booking was actually sent.</p>
          <div className="flex flex-wrap gap-3">
            <a href={telHref} className="btn btn-ghost">
              <Phone /> {site.phoneDisplay}
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => (setDone(null), setStep(0))}>
              Book another car
            </button>
          </div>
        </div>
        <div className="anim-fade" style={{ ["--d" as string]: "0.2s" }}>
          {ticket}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_24rem] lg:gap-16">
      <form ref={formRef} onSubmit={submit} noValidate aria-labelledby="book-step-title">
        {/* Progress */}
        <ol className="grid grid-cols-5 gap-1.5" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-col gap-2">
              <span className={clsx("h-1 transition-colors duration-500", i <= step ? "bg-signal" : "bg-line-strong")} />
              <button
                type="button"
                disabled={i > step}
                onClick={() => i < step && go(i)}
                aria-current={i === step ? "step" : undefined}
                className={clsx("text-left font-mono text-[0.62rem] uppercase tracking-[0.12em] sm:text-[0.68rem]", i === step ? "text-fg" : i < step ? "text-muted hover:text-fg" : "text-faint")}
              >
                <span className="hidden sm:inline">0{i + 1} · </span>
                {label}
              </button>
            </li>
          ))}
        </ol>

        <h2 id="book-step-title" ref={headingRef} tabIndex={-1} className="t-h2 mt-10 outline-none">
          {["What are we working on?", "What does it need?", "How do you want to drop it off?", "Pick a time.", "Where do we send the photos?"][step]}
        </h2>

        <div key={step} className="anim-fade mt-8 flex flex-col gap-6" style={{ ["--d" as string]: "-0.1s" }}>
          {step === 0 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Year" id="year" error={errors.year}>
                <select id="year" className={inputCls} value={data.year} onChange={(e) => set("year", e.target.value)} aria-invalid={!!errors.year} aria-describedby={errors.year ? "year-error" : undefined}>
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </Field>
              <Field label="Make" id="make" error={errors.make}>
                <select id="make" className={inputCls} value={data.make} onChange={(e) => set("make", e.target.value)} aria-invalid={!!errors.make} aria-describedby={errors.make ? "make-error" : undefined}>
                  <option value="">Select make</option>
                  {[...makes].sort().map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Model" id="model" error={errors.model}>
                <input id="model" className={inputCls} value={data.model} onChange={(e) => set("model", e.target.value)} placeholder="Camry" autoComplete="off" aria-invalid={!!errors.model} aria-describedby={errors.model ? "model-error" : undefined} />
              </Field>
              <Field label="Mileage (optional)" id="mileage" hint="Helps us check what maintenance is due.">
                <input id="mileage" inputMode="numeric" className={inputCls} value={data.mileage} onChange={(e) => set("mileage", e.target.value.replace(/[^\d,]/g, ""))} placeholder="84,000" />
              </Field>
            </div>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Choose one or more</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2" data-err={errors.services ? true : undefined} tabIndex={errors.services ? -1 : undefined}>
                  {services.map((s) => {
                    const on = data.services.includes(s.slug);
                    return (
                      <label key={s.slug} className={clsx("flex min-h-14 cursor-pointer items-center justify-between gap-3 border px-4 py-3 transition-colors", on ? "border-signal bg-signal/10" : "border-line-strong hover:border-fg")}>
                        <span className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="size-4 accent-[#ff5b1f]"
                            checked={on}
                            onChange={() => set("services", on ? data.services.filter((x) => x !== s.slug) : [...data.services, s.slug])}
                          />
                          {s.name}
                        </span>
                        <span className="font-mono text-xs text-muted">{s.priceFrom}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <Field label="Anything we should know?" id="notes" error={errors.services}>
                <textarea id="notes" rows={4} className={clsx(inputCls, "py-3")} value={data.notes} onChange={(e) => (set("notes", e.target.value), setErrors({}))} placeholder="Grinding from the front right when braking, started last week." />
              </Field>
            </>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="sr-only">Drop-off option</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {MODES.map((m) => (
                  <label key={m.id} className={clsx("flex cursor-pointer flex-col gap-2 border p-5 transition-colors", data.mode === m.id ? "border-signal bg-signal/10" : "border-line-strong hover:border-fg")}>
                    <span className="flex items-center gap-3">
                      <input type="radio" name="mode" value={m.id} checked={data.mode === m.id} onChange={() => set("mode", m.id)} className="size-4 accent-[#ff5b1f]" />
                      <span className="t-h3 text-lg">{m.title}</span>
                    </span>
                    <span className="pl-7 text-sm text-muted">{m.text}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <>
              <fieldset>
                <legend className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Day</legend>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1" data-err={errors.date ? true : undefined} tabIndex={errors.date ? -1 : undefined}>
                  {days.map((d) => {
                    const iso = isoDay(d);
                    const on = data.date === iso;
                    return (
                      <label key={iso} className={clsx("flex min-w-[4.5rem] shrink-0 cursor-pointer flex-col items-center gap-1 border px-3 py-3 transition-colors", on ? "border-signal bg-signal text-asphalt" : "border-line-strong hover:border-fg")}>
                        <input type="radio" name="date" value={iso} checked={on} onChange={() => (set("date", iso), set("time", ""))} className="sr-only" />
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span className="font-display text-2xl font-extrabold leading-none [--wdth:80]">{d.getDate()}</span>
                        <span className="font-mono text-[0.62rem] uppercase">{d.toLocaleDateString("en-US", { month: "short" })}</span>
                      </label>
                    );
                  })}
                </div>
                {errors.date && (
                  <p className="mt-2 text-sm text-signal" role="alert">
                    {errors.date}
                  </p>
                )}
              </fieldset>
              {data.date && (
                <fieldset className="anim-fade">
                  <legend className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">Drop-off time · {dateLabel}</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4" data-err={errors.time ? true : undefined} tabIndex={errors.time ? -1 : undefined}>
                    {slotsFor(new Date(`${data.date}T12:00:00`)).map((t) => {
                      const busy = taken(data.date, t);
                      const on = data.time === t;
                      return (
                        <label key={t} className={clsx("flex min-h-12 items-center justify-center border font-mono text-sm transition-colors", busy ? "cursor-not-allowed border-line text-faint line-through" : on ? "cursor-pointer border-signal bg-signal text-asphalt" : "cursor-pointer border-line-strong hover:border-fg")}>
                          <input type="radio" name="time" value={t} disabled={busy} checked={on} onChange={() => set("time", t)} className="sr-only" />
                          {fmtTime(t)}
                          {busy && <span className="sr-only"> (booked)</span>}
                        </label>
                      );
                    })}
                  </div>
                  {errors.time && (
                    <p className="mt-2 text-sm text-signal" role="alert">
                      {errors.time}
                    </p>
                  )}
                </fieldset>
              )}
            </>
          )}

          {step === 4 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" id="name" error={errors.name}>
                <input id="name" autoComplete="name" className={inputCls} value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              </Field>
              <Field label="Mobile phone" id="phone" error={errors.phone} hint="We text photos and quotes here.">
                <input id="phone" type="tel" autoComplete="tel" className={inputCls} value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(214) 555-0100" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
              </Field>
              <Field label="Email (optional)" id="email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" className={inputCls} value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              </Field>
              <label className="flex items-start gap-3 self-end pb-3 text-sm text-muted">
                <input type="checkbox" checked={data.texts} onChange={(e) => set("texts", e.target.checked)} className="mt-0.5 size-4 accent-[#ff5b1f]" />
                Text me photos, quotes and status updates.
              </label>
            </div>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <button type="button" onClick={() => go(step - 1)} className={clsx("btn btn-ghost", step === 0 && "invisible")}>
            Back
          </button>
          <button type="submit" className="btn btn-signal group">
            {step === STEPS.length - 1 ? "Book appointment" : "Continue"} <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>

      <aside aria-label="Your work order" className="lg:sticky lg:top-28 lg:self-start">
        {ticket}
        <p className="mt-4 text-sm text-muted">
          Rather talk to someone?{" "}
          <a href={telHref} className="heat-link text-fg">
            Call {site.phoneDisplay}
          </a>
        </p>
      </aside>
    </div>
  );
}
