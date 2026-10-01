"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { dayInTheBays } from "@/content/general";
import { Eyebrow } from "@/components/ui/Bits";
import { useBiz } from "@/components/preview/BizContext";
import { scrub } from "@/lib/biz";

/** "07:30" → "7:30", "18:00" → "6:00" (the heading's style) */
const clock = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")}`;
};

/**
 * "A day in the bays": 7:30 am → 6:00 pm as a pinned horizontal film strip on desktop,
 * a native swipeable rail (scroll-snap) on touch.
 */
export function DayInBays() {
  const biz = useBiz();
  // A preview shows the business's own weekday hours
  const weekday = biz.hours?.slice(1, 6).find((h) => h.open && h.close);
  const allDay = weekday?.open === "00:00" && weekday?.close === "23:59";
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const t = track.current;
      if (!el || !t || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover)", () => {
        const distance = () => t.scrollWidth - window.innerWidth;
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true },
        });
        gsap.utils.toArray<HTMLElement>("[data-frame-img]", t).forEach((img) => {
          gsap.fromTo(img, { xPercent: -12 }, { xPercent: 12, ease: "none", scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        });
        gsap.fromTo("[data-clock-hand]", { rotate: -135 }, { rotate: 225, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distance()}`, scrub: 0.6 } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="day-title" className="theme-dark relative overflow-hidden py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
      <div className="wrap flex items-end justify-between gap-8">
        <div>
          <Eyebrow>A day in the bays</Eyebrow>
          <h2 id="day-title" className="t-h2 mt-5">
            {!biz.preview ? "7:30 to 6:00" : allDay ? "Day and night" : weekday ? `${clock(weekday.open!)} to ${clock(weekday.close!)}` : "Open to close"}
            <span className="text-signal">.</span>
            <br />
            Nothing hidden.
          </h2>
        </div>
        <svg viewBox="0 0 80 80" className="hidden size-20 shrink-0 text-muted lg:block" aria-hidden>
          <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="1.2" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="40" y1="7" x2="40" y2={i % 3 ? 11 : 14} stroke="currentColor" strokeWidth="1.2" transform={`rotate(${i * 30} 40 40)`} />
          ))}
          <line data-clock-hand x1="40" y1="40" x2="40" y2="14" stroke="#ff5b1f" strokeWidth="2" style={{ transformOrigin: "40px 40px" }} />
          <circle cx="40" cy="40" r="2.5" fill="#ff5b1f" />
        </svg>
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] lg:mt-14 lg:w-max lg:snap-none lg:gap-6 lg:overflow-visible"
      >
        {dayInTheBays.map((f, i) => (
          <figure key={f.time} className="relative w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[34vw] xl:w-[30vw]">
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite lg:aspect-[5/6]" data-cursor="Drag">
              <Image data-frame-img src={f.image} alt={f.alt} fill sizes="(min-width: 1024px) 34vw, 78vw" quality={60} className="scale-[1.25] object-cover" />
              <span className="absolute left-4 top-4 bg-asphalt/80 px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-chalk backdrop-blur">
                {f.time}
              </span>
            </div>
            <figcaption className="mt-5 flex gap-4">
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <span>
                <span className="t-h3 block">{f.title}</span>
                <span className="mt-2 block max-w-xs text-sm text-muted">{scrub(f.text, biz)}</span>
              </span>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="w-[var(--gutter)] shrink-0 lg:w-[10vw]" />
      </div>
    </section>
  );
}
