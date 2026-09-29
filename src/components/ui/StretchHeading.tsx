"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Signature type move: a heading whose Archivo width axis stretches from condensed (62)
 * to expanded as it travels through the viewport. Text is always fully visible.
 */
export function StretchHeading({
  children,
  as: Tag = "h2",
  className,
  from = 62,
  to = 125,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  from?: number;
  to?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { "--wdth": from },
        { "--wdth": to, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "bottom 35%", scrub: 0.5 } },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={clsx("font-display font-black uppercase leading-[0.82]", className)} style={{ ["--wdth" as string]: to }}>
      {children}
    </Tag>
  );
}
