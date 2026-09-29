"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, isTouch, prefersReducedMotion } from "@/lib/gsap";

/**
 * Crosshair cursor (desktop only). Elements with data-cursor="Label" expand it into a
 * labelled ring. The native cursor stays visible for accessibility; this is a follower.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    // Enable after mount: desktop-only feature, decided client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.3 });
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[400] mix-blend-difference">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 text-white transition-[width,height,background-color] duration-500 ease-[var(--ease-out-expo)]"
        style={{ width: label ? 92 : 26, height: label ? 92 : 26, backgroundColor: label ? "rgba(255,255,255,1)" : "transparent" }}
      >
        {label ? (
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-black">{label}</span>
        ) : (
          <>
            <span className="absolute h-px w-2.5 bg-white" />
            <span className="absolute h-2.5 w-px bg-white" />
          </>
        )}
      </div>
    </div>
  );
}
