"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, belowFold, loadSplitText } from "@/lib/gsap";

/*
 * Scroll-driven reveals.
 * Content is always visible in the HTML. `immediate` variants (top of page) animate
 * with CSS only so they paint instantly (LCP). Everything else is hidden by JS only
 * while it's still below the fold, using opacity (never visibility/display).
 */

const delayStyle = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

type SplitProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  immediate?: boolean;
  stagger?: number;
  id?: string;
};

/** Headline that rises line by line out of a mask as it scrolls into view. */
export function SplitReveal({ children, as: Tag = "h2", className, delay = 0, immediate, stagger = 0.09, id }: SplitProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || immediate || prefersReducedMotion() || !belowFold(el)) return;
      gsap.set(el, { opacity: 0 });
      let split: { revert: () => void } | null = null;
      let dead = false;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          loadSplitText().then((SplitText) => {
          if (dead) return;
          split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { opacity: 1 });
              return gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger, delay, ease: "expo.out" });
            },
          });
          });
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);
      return () => {
        dead = true;
        io.disconnect();
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={clsx(immediate && "anim-heading", className)} style={immediate ? delayStyle(delay) : undefined}>
      {children}
    </Tag>
  );
}

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  stagger?: number;
  immediate?: boolean;
};

/** Fade + rise when scrolled into view. `stagger` animates direct children. */
export function Reveal({ children, as: Tag = "div", className, delay = 0, y = 40, stagger, immediate }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || immediate || prefersReducedMotion() || !belowFold(el)) return;
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(targets, { opacity: 1, y: 0, duration: 1.2, delay, stagger: stagger ?? 0, ease: "expo.out", clearProps: "transform" }),
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={clsx(immediate && "anim-fade", className)} style={immediate ? delayStyle(delay) : undefined}>
      {children}
    </Tag>
  );
}

/** Paragraph whose words brighten one by one as you scroll through it. */
export function ScrubWords({ text, className, as: Tag = "p", highlight = [] }: { text: string; className?: string; as?: ElementType; highlight?: string[] }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const words = el.querySelectorAll<HTMLElement>("[data-w]:not(.text-signal)");
      gsap.fromTo(
        words,
        { opacity: 0.5 },
        { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 50%", scrub: 0.6 } },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className={clsx("inline", highlight.includes(w.replace(/[.,]/g, "")) && "text-signal")}>
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}

/** Image frame that unmasks on enter and drifts with scroll. */
export function Parallax({ children, className, amount = 12, reveal = true }: { children: ReactNode; className?: string; amount?: number; reveal?: boolean }) {
  const positioned = (className ?? "").split(/\s+/).some((c) => c === "absolute" || c === "fixed");
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild as HTMLElement | null;
      if (!el || !inner || prefersReducedMotion()) return;
      gsap.set(inner, { scale: 1 + amount / 100 });
      gsap.fromTo(inner, { yPercent: -amount / 2 }, { yPercent: amount / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      if (reveal && belowFold(el)) {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={clsx("overflow-hidden", !positioned && "relative", className)}>
      {children}
    </div>
  );
}

/**
 * Roll-up door reveal: the image opens from the bottom in slats, like a shop door.
 * Children should be a positioned image (fill).
 */
export function DoorReveal({ children, className, slats = 7 }: { children: ReactNode; className?: string; slats?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !belowFold(el)) return;
      const bars = el.querySelectorAll<HTMLElement>("[data-slat]");
      gsap.set(bars, { scaleY: 1 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => gsap.to(bars, { scaleY: 0, duration: 1.1, ease: "expo.inOut", stagger: { each: 0.06, from: "end" } }),
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={clsx("relative overflow-hidden", className)}>
      {children}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col">
        {Array.from({ length: slats }, (_, i) => (
          <span key={i} data-slat className="block flex-1 origin-top scale-y-0 border-b border-black/40 bg-graphite" />
        ))}
      </div>
    </div>
  );
}
