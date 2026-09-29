"use client";

import { useRef } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Odometer-style counter: each digit is a vertical 0–9 reel that rolls into place.
 * The final value is always in the DOM (sr-only) and visible without JS.
 */
export function Odometer({ value, className, delay = 0 }: { value: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const reels = el.querySelectorAll<HTMLElement>("[data-reel]");
      reels.forEach((r) => gsap.set(r, { y: 0, yPercent: 0 }));
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () =>
          reels.forEach((r, i) => {
            const target = Number(r.dataset.reel);
            // Two full spins plus the target digit, staggered right-to-left like a real odometer.
            gsap.fromTo(
              r,
              { y: 0, yPercent: 0 },
              { yPercent: -((20 + target) / 30) * 100, duration: 2.2 + (reels.length - i) * 0.12, delay, ease: "power4.out" },
            );
          }),
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={clsx("inline-flex items-baseline", className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {value.split("").map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden leading-none" style={{ width: "0.62em" }}>
              <span data-reel={ch} className="absolute left-0 top-0 flex flex-col" style={{ transform: `translateY(-${((20 + Number(ch)) / 30) * 100}%)` }}>
                {Array.from({ length: 30 }, (_, n) => (
                  <span key={n} className="block h-[1em] text-center leading-none">
                    {n % 10}
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i} className="inline-block leading-none">
              {ch}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
