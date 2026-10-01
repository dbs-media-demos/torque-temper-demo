"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Bits";
import { Camera, Check, Shield } from "@/components/ui/Icons";
import { useBiz } from "@/components/preview/BizContext";
import { initialsOf } from "@/lib/biz";

const steps = [
  { icon: Camera, title: "Measured and photographed", text: "Pad thickness, tread depth, leak location. You see what the tech sees." },
  { icon: Check, title: "Approved by you", text: "A clear price for each item. Nothing happens until you tap approve." },
  { icon: Shield, title: "Invoice = quote", text: "The number you approved is the number you pay. Backed by 24 months / 24,000 miles." },
];

/**
 * "Photos before any work": the promise told as a text thread that plays out as you scroll.
 * Desktop pins the phone and scrubs the messages in; phones reveal them on enter.
 */
export function PhotoApproval() {
  const biz = useBiz();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const msgs = gsap.utils.toArray<HTMLElement>("[data-msg]", el);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.set(msgs, { opacity: 0, y: 24, scale: 0.96 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-pin]", start: "top top+=90", end: "+=900", scrub: 0.6, pin: true },
        });
        msgs.forEach((m, i) => {
          tl.to(m, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, i * 0.8);
          if (m.dataset.typing) tl.to(m.querySelector("[data-dots]"), { opacity: 0, duration: 0.1 }, i * 0.8 + 0.5);
        });
        tl.fromTo("[data-stamp]", { opacity: 0, scale: 1.6, rotate: -18 }, { opacity: 1, scale: 1, rotate: -8, duration: 0.3, ease: "back.out(2)" }, "-=0.4");
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.set(msgs, { opacity: 0, y: 20 });
        ScrollTrigger.batch(msgs, { start: "top 90%", onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.18, duration: 0.8 }) });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="photos-title" className="theme-chalk relative overflow-hidden py-24 lg:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <div className="flex flex-col">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="photos-title" className="t-h1 mt-6 max-w-[12ch]">
            Photos before <span className="text-signal">any</span> work.
          </h2>
          <p className="t-lead mt-8 max-w-xl text-muted">
            Most people dread the call from the mechanic because they can&apos;t see what&apos;s wrong. So we show you. Every recommendation arrives by text with photos,
            measurements and a price, and nothing gets done until you tap approve.
          </p>
          <ol className="mt-12 grid gap-px bg-line sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-3 bg-chalk p-6 lg:py-7 xl:p-6">
                <span className="flex items-center justify-between">
                  <s.icon className="text-signal" width={22} height={22} />
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </span>
                <h3 className="t-h3 text-[1.25rem]">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Phone */}
        <div data-pin className="flex justify-center lg:items-start">
          <div className="relative w-full max-w-[360px] rounded-[2.6rem] bg-asphalt p-2.5 shadow-[0_40px_90px_-30px_rgba(14,15,17,0.55)]">
            <div className="flex h-[700px] flex-col overflow-hidden rounded-[2.1rem] bg-[#141518] text-chalk">
              <div className="flex items-center gap-3 border-b border-white/10 px-5 pb-3 pt-5">
                <span className="grid size-9 place-items-center rounded-full bg-signal font-display text-sm font-extrabold text-asphalt [--wdth:110]">{biz.preview ? initialsOf(biz.shortName) : "T&T"}</span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{biz.preview ? biz.shortName : "Torque & Temper"}</span>
                  <span className="text-[0.7rem] text-chalk/70">{biz.preview ? "Service advisor" : "Dana · Service advisor"}</span>
                </span>
                <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk/70">9:42 am</span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3.5 py-4 text-[0.84rem] leading-snug">
                <div data-msg className="shrink-0 max-w-[85%] self-start rounded-2xl rounded-bl-md bg-graphite-2 px-3.5 py-2.5">
                  {biz.preview
                    ? `Hi Marisol, it's ${biz.shortName}. Your CR-V is on the lift. Here's what we found:`
                    : "Hi Marisol, it's Dana at Torque & Temper. Diego has your CR-V on the lift. Here's what he found:"}
                </div>
                <figure data-msg className="shrink-0 relative w-[78%] self-start overflow-hidden rounded-2xl rounded-bl-md">
                  <Image src="/images/brake-rotor-red.jpg" alt="Photo sent to the customer: a worn front brake pad and rotor" width={400} height={300} sizes="280px" className="h-36 w-full object-cover" quality={60} />
                  <figcaption className="absolute bottom-2 left-2 rounded bg-asphalt/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]">
                    Front pad · <span className="text-signal">2.1 mm</span> / new 10 mm
                  </figcaption>
                </figure>
                <div data-msg className="shrink-0 max-w-[85%] self-start rounded-2xl rounded-bl-md bg-graphite-2 px-3.5 py-2.5">
                  Front pads are at 2 mm. Rotors are still in spec, so no need to replace them.
                </div>
                <div data-msg className="shrink-0 w-[85%] self-start rounded-2xl rounded-bl-md border border-white/10 bg-asphalt p-3">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-chalk/70">Estimate #20417</p>
                  <p className="mt-1.5 flex justify-between">
                    <span>Front pads + hardware</span>
                    <span className="font-mono">$189.00</span>
                  </p>
                  <p className="mt-0.5 text-[0.72rem] text-chalk/70">Ready by 12:30 pm · 24/24 warranty</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.12em]">
                    <span className="rounded-lg bg-signal py-2 text-asphalt">Approve</span>
                    <span className="rounded-lg border border-white/15 py-2">Call me</span>
                  </div>
                </div>
                <div data-msg className="shrink-0 max-w-[75%] self-end rounded-2xl rounded-br-md bg-[#2f5d9b] px-3.5 py-2.5">
                  Approved. Thank you for the photo!
                </div>
                <div data-msg className="shrink-0 relative max-w-[85%] self-start rounded-2xl rounded-bl-md bg-graphite-2 px-3.5 py-2.5">
                  Done ✓ Test-drove 4 miles, quiet and smooth. Invoice $189.00, same as the quote.
                  <span
                    data-stamp
                    className="absolute -right-3 -top-4 rotate-[-8deg] border-2 border-signal px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-[0.16em] text-signal"
                  >
                    Invoice = quote
                  </span>
                </div>
              </div>
              <div className="mx-3.5 mb-4 flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[0.78rem] text-chalk/60">
                Text message
                <span className="ml-auto size-6 rounded-full bg-signal/90" aria-hidden />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
