"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Check } from "@/components/ui/Icons";

const inputCls =
  "min-h-12 w-full border border-line-strong bg-transparent px-4 text-base text-fg outline-none transition-colors placeholder:text-faint focus:border-signal aria-[invalid=true]:border-signal";

/** Contact / fleet enquiry form. Validates fully, shows a success state, sends nothing (demo). */
export function ContactForm({ topics = ["Question about a repair", "Quote request", "Fleet account", "Something else"], defaultTopic }: { topics?: string[]; defaultTopic?: string }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef<HTMLFormElement>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const err: Record<string, string> = {};
    if (String(f.get("name") ?? "").trim().length < 2) err.name = "Enter your name.";
    const phone = String(f.get("phone") ?? "").replace(/\D/g, "");
    const email = String(f.get("email") ?? "").trim();
    if (phone.length < 10 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) err.phone = "Add a phone number or a valid email so we can reply.";
    if (String(f.get("message") ?? "").trim().length < 10) err.message = "Tell us a little more (at least 10 characters).";
    setErrors(err);
    if (Object.keys(err).length) {
      requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="anim-fade flex flex-col items-start gap-5 border border-line p-8">
        <span className="grid size-14 place-items-center bg-signal text-asphalt">
          <Check width={28} height={28} />
        </span>
        <p className="t-h3">Message received.</p>
        <p className="text-muted">A service advisor will reply within one business hour. This is a concept site, so nothing was actually sent.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  }

  const field = (id: string, label: string, input: React.ReactNode) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {input}
      {errors[id] && (
        <p id={`${id}-error`} className="text-sm text-signal" role="alert">
          {errors[id]}
        </p>
      )}
    </div>
  );

  const clear = (k: string) => errors[k] && setErrors((e) => ({ ...e, [k]: "" }));

  return (
    <form ref={ref} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      {field("name", "Name", <input id="name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} onChange={() => clear("name")} />)}
      {field("phone", "Phone", <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} onChange={() => clear("phone")} />)}
      {field("email", "Email", <input id="email" name="email" type="email" autoComplete="email" className={inputCls} onChange={() => clear("phone")} />)}
      {field(
        "topic",
        "Topic",
        <select id="topic" name="topic" defaultValue={defaultTopic ?? topics[0]} className={inputCls}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>,
      )}
      <div className="sm:col-span-2">
        {field(
          "message",
          "Message",
          <textarea id="message" name="message" rows={5} className={clsx(inputCls, "py-3")} placeholder="2016 Honda Accord, clicking noise when turning left." aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} onChange={() => clear("message")} />,
        )}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-signal group">
          Send message <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
