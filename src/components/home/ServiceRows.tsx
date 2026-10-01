"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import clsx from "clsx";
import { gsap, useGSAP, isTouch, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight } from "@/components/ui/Icons";
import type { Service } from "@/content/services";
import { useT } from "@/components/preview/BizContext";

/**
 * Service index as big typographic rows. On desktop a photo follows the cursor and
 * swaps per row; on touch each row carries its own thumbnail.
 */
export function ServiceRows({ items }: { items: Service[] }) {
  const t = useT();
  const root = useRef<HTMLDivElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      const f = float.current;
      if (!el || !f || isTouch() || prefersReducedMotion()) return;
      const xTo = gsap.quickTo(f, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(f, "y", { duration: 0.7, ease: "power3.out" });
      const rTo = gsap.quickTo(f, "rotate", { duration: 0.9, ease: "power3.out" });
      let lastX = 0;
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
        rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative" onPointerLeave={() => setActive(null)}>
      <ul className="border-t border-line">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={`/services/${s.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              data-cursor="Open"
              className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[4rem_1fr_14rem_12rem_auto] md:gap-8 md:py-7"
            >
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <span className="flex items-center gap-4">
                <span className="relative size-14 shrink-0 overflow-hidden md:hidden">
                  <Image src={s.image} alt="" fill sizes="56px" className="object-cover" quality={60} />
                </span>
                <span
                  className={clsx(
                    "font-display text-[clamp(1.9rem,4.6vw,4.4rem)] font-extrabold uppercase leading-[0.9] transition-[color,--wdth] duration-700 ease-[var(--ease-out-expo)]",
                    active === i ? "text-signal [--wdth:118]" : "[--wdth:74]",
                    active !== null && active !== i && "md:text-faint",
                  )}
                >
                  {s.word}
                </span>
              </span>
              <span className="hidden text-sm text-muted md:block">{s.eyebrow}</span>
              <span className="hidden font-mono text-sm md:block">
                <span className="text-faint">{t("from")} </span>
                {s.priceFrom} <span className="text-faint">{s.priceUnit}</span>
              </span>
              <span className="grid size-11 place-items-center rounded-full border border-line transition-colors duration-500 group-hover:border-signal group-hover:bg-signal group-hover:text-asphalt">
                <ArrowUpRight />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div ref={float} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block">
        <div
          className={clsx(
            "relative -translate-x-1/2 -translate-y-1/2 overflow-hidden transition-[opacity,clip-path] duration-500 ease-[var(--ease-out-expo)]",
            active === null ? "opacity-0 [clip-path:inset(50%_50%_50%_50%)]" : "opacity-100 [clip-path:inset(0_0_0_0)]",
          )}
          style={{ width: "min(26vw, 380px)", aspectRatio: "4 / 5" }}
        >
          {items.map((s, i) => (
            <Image
              key={s.slug}
              src={s.image}
              alt=""
              fill
              sizes="380px"
              quality={60}
              className={clsx("object-cover transition-[opacity,transform] duration-700", active === i ? "scale-100 opacity-100" : "scale-125 opacity-0")}
            />
          ))}
          <span className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk">{active !== null && items[active].spec}</span>
        </div>
      </div>
    </div>
  );
}
