"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, belowFold } from "@/lib/gsap";
import { areas } from "@/content/areas";

const SHOP = { x: 52, y: 50 };

/** Stylized East Dallas map: freeways, White Rock Lake, neighborhoods and drive times. Not a real street map. */
export function AreaMap({ highlight }: { highlight?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(highlight ?? null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion() || !belowFold(el)) return;
      const lines = el.querySelectorAll("[data-road]");
      gsap.set(lines, { strokeDashoffset: 1 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => gsap.to(lines, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.15 }),
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <svg viewBox="0 0 100 80" className="w-full" role="img" aria-labelledby="map-title">
        <title id="map-title">Stylized map of East Dallas showing the shop near White Rock Lake and drive times to Lakewood, Lake Highlands, Garland and Mesquite</title>
        <defs>
          <pattern id="dots" width="2.5" height="2.5" patternUnits="userSpaceOnUse">
            <circle cx="0.4" cy="0.4" r="0.18" className="fill-current text-line-strong" />
          </pattern>
          <radialGradient id="glow">
            <stop offset="0" stopColor="#ff5b1f" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ff5b1f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="80" fill="url(#dots)" />
        {/* service radius */}
        <circle cx={SHOP.x} cy={SHOP.y} r="30" fill="url(#glow)" />
        <circle cx={SHOP.x} cy={SHOP.y} r="30" fill="none" stroke="#ff5b1f" strokeOpacity=".4" strokeWidth=".2" strokeDasharray="1 1" />
        <circle cx={SHOP.x} cy={SHOP.y} r="15" fill="none" stroke="#ff5b1f" strokeOpacity=".35" strokeWidth=".2" strokeDasharray="1 1" />
        <text x={SHOP.x - 13} y={SHOP.y + 20} className="fill-current font-mono text-[1.6px] uppercase tracking-[0.2em] text-faint">
          Free shuttle · 5 mi
        </text>

        {/* White Rock Lake */}
        <path d="M44 36 C49 34 51 39 49 43 C48 47 50 51 46 53 C42 55 40 50 41 46 C42 42 39 38 44 36 Z" fill="#2f5d9b" fillOpacity=".35" stroke="#2f5d9b" strokeOpacity=".7" strokeWidth=".25" />
        <text x="37.5" y="45" textAnchor="end" className="fill-current font-mono text-[1.5px] uppercase tracking-[0.18em] text-faint">
          White Rock Lake
        </text>

        {/* Freeways */}
        <g fill="none" stroke="currentColor" className="text-fg" strokeOpacity=".55" strokeLinecap="round">
          <path data-road pathLength={1} strokeDasharray="1" d="M-2 66 C20 64 40 62 58 64 C72 65 86 70 102 74" strokeWidth=".7" />
          <path data-road pathLength={1} strokeDasharray="1" d="M30 -2 C40 8 54 12 68 14 C82 18 90 34 88 50 C87 62 90 72 94 82" strokeWidth=".7" />
          <path data-road pathLength={1} strokeDasharray="1" d="M18 -2 C19 20 16 44 14 82" strokeWidth=".7" />
          <path data-road pathLength={1} strokeDasharray="1" d="M20 70 C32 62 44 56 52 50 C62 42 70 34 80 26" strokeWidth=".45" strokeOpacity=".4" />
        </g>
        <g className="fill-current font-mono text-[1.6px] uppercase tracking-[0.12em] text-muted">
          <text x="4" y="63">I-30</text>
          <text x="80" y="12">I-635</text>
          <text x="19.5" y="8">US-75</text>
        </g>
        <g>
          <rect x="7" y="70" width="6" height="6" fill="none" stroke="currentColor" strokeWidth=".2" className="text-muted" />
          <text x="10" y="79" textAnchor="middle" className="fill-current font-mono text-[1.5px] uppercase tracking-[0.14em] text-muted">
            Downtown
          </text>
        </g>

        {/* Neighborhoods */}
        {areas.map((a) => {
          const on = hover === a.slug;
          return (
            <Link key={a.slug} href={`/areas/${a.slug}`} aria-label={`${a.name}: ${a.drive} drive`} onMouseEnter={() => setHover(a.slug)} onMouseLeave={() => setHover(highlight ?? null)} onFocus={() => setHover(a.slug)}>
              <line x1={SHOP.x} y1={SHOP.y} x2={a.map.x} y2={a.map.y} stroke="#ff5b1f" strokeWidth=".3" strokeDasharray="0.8 0.8" className={clsx("transition-opacity duration-500", on ? "opacity-100" : "opacity-0")} />
              <circle cx={a.map.x} cy={a.map.y} r={on ? 1.6 : 1.1} className={clsx("transition-all duration-500", on ? "fill-[#ff5b1f]" : "fill-current text-fg")} />
              <circle cx={a.map.x} cy={a.map.y} r="5" fill="transparent" />
              <text x={a.map.x} y={a.map.y - 3} textAnchor="middle" className={clsx("font-display text-[3px] font-extrabold uppercase transition-colors [--wdth:90]", on ? "fill-[#ff5b1f]" : "fill-current text-fg")}>
                {a.name}
              </text>
              <text x={a.map.x} y={a.map.y + 4.4} textAnchor="middle" className="fill-current font-mono text-[1.7px] uppercase tracking-[0.14em] text-muted">
                {a.drive} · {a.miles} mi
              </text>
            </Link>
          );
        })}

        {/* Shop */}
        <circle cx={SHOP.x} cy={SHOP.y} r="3" fill="#ff5b1f" fillOpacity=".25" className="origin-center animate-ping [transform-box:fill-box]" />
        <g transform={`translate(${SHOP.x - 2.4} ${SHOP.y - 2.4}) scale(0.075)`}>
          <polygon points="32,4.5 55.8,18.25 55.8,45.75 32,59.5 8.2,45.75 8.2,18.25" fill="#0e0f11" stroke="#efece6" strokeWidth="5" />
          <line x1="45" y1="5" x2="19" y2="59" stroke="#ff5b1f" strokeWidth="7" />
        </g>
        <text x={SHOP.x} y={SHOP.y + 5.2} textAnchor="middle" className="fill-current font-mono text-[1.7px] font-medium uppercase tracking-[0.16em] text-signal">
          Torque &amp; Temper
        </text>
      </svg>
    </div>
  );
}
