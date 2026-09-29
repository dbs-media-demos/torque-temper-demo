"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import clsx from "clsx";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, belowFold } from "@/lib/gsap";
import { systems } from "@/content/systems";
import type { SystemId } from "@/content/services";
import { ArrowRight } from "@/components/ui/Icons";

const spring = (x: number, y1: number, y2: number, turns = 7, w = 11) => {
  const step = (y2 - y1) / (turns * 2);
  let d = `M${x} ${y1}`;
  for (let i = 1; i <= turns * 2; i++) d += ` L${x + (i % 2 ? w : -w)} ${y1 + step * i}`;
  return `${d} L${x} ${y2}`;
};

const caliper = (cx: number, cy: number, r = 36) => {
  const a1 = (-150 * Math.PI) / 180;
  const a2 = (-95 * Math.PI) / 180;
  return `M${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a2)} ${cy + r * Math.sin(a2)}`;
};

/** Paths per system. Every path uses pathLength=1 so it can be line-drawn. */
const PARTS: Record<SystemId, { d: string; w?: number; dash?: boolean }[]> = {
  engine: [
    { d: "M770 222 H866 V238 H876 V274 H866 V288 H770 Z" },
    { d: "M780 222 V208 H858 V222" },
    { d: "M790 208 V200 M808 208 V200 M826 208 V200 M844 208 V200" },
    { d: "M782 288 H852 L844 302 H790 Z" },
    { d: "M870 262 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" },
    { d: "M786 236 H852 M786 250 H852 M786 264 H852" },
  ],
  transmission: [
    { d: "M766 232 L700 238 L662 248 V276 L700 284 L766 290" },
    { d: "M700 238 V284" },
    { d: "M662 262 L300 306", w: 2.2 },
    { d: "M246 318 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0" },
  ],
  brakes: [
    { d: "M775 318 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" },
    { d: "M775 318 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0", dash: true },
    { d: caliper(775, 318), w: 7 },
    { d: "M246 318 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" },
    { d: caliper(246, 318), w: 7 },
  ],
  suspension: [
    { d: spring(742, 228, 296) },
    { d: "M742 296 L775 318 M742 228 V214" },
    { d: spring(276, 222, 290) },
    { d: "M276 290 L246 318 M276 222 V208" },
    { d: "M700 330 L760 322 M330 330 L262 322" },
  ],
  ac: [
    { d: "M922 248 H936 V304 H922 Z" },
    { d: "M922 258 H936 M922 268 H936 M922 278 H936 M922 288 H936 M922 298 H936" },
    { d: "M884 300 m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0" },
    { d: "M895 300 C905 300 912 290 922 288 M873 300 C840 312 720 214 640 212", dash: true },
    { d: "M600 202 H640 V224 H600 Z" },
  ],
  electrical: [
    { d: "M712 204 H750 V228 H712 Z" },
    { d: "M720 204 V198 M742 204 V198" },
    { d: "M750 216 C820 200 880 214 912 244", dash: true },
    { d: "M712 216 C600 204 320 212 128 250", dash: true },
    { d: "M600 206 L560 196" },
  ],
  tires: [
    { d: "M775 318 m-56 0 a56 56 0 1 0 112 0 a56 56 0 1 0 -112 0", w: 3 },
    { d: "M775 318 m-49 0 a49 49 0 1 0 98 0 a49 49 0 1 0 -98 0", dash: true },
    { d: "M246 318 m-56 0 a56 56 0 1 0 112 0 a56 56 0 1 0 -112 0", w: 3 },
    { d: "M246 318 m-49 0 a49 49 0 1 0 98 0 a49 49 0 1 0 -98 0", dash: true },
  ],
  exhaust: [
    { d: "M810 302 C790 332 740 338 690 338" },
    { d: "M640 330 H690 V346 H640 Z" },
    { d: "M640 338 H450" },
    { d: "M390 328 H450 V350 H390 Z" },
    { d: "M390 340 H330" },
  ],
};

const BODY = [
  "M118 330 L96 322 C84 300 84 262 96 246 L112 236 L205 222 C240 214 270 205 300 186 L372 138 C395 124 430 118 470 116 L590 116 C625 118 650 128 672 146 L730 196 C790 204 860 214 905 228 C930 236 944 250 946 268 L948 300 C946 316 936 326 920 330 L847 330 A72 72 0 0 0 703 330 L318 330 A72 72 0 0 0 174 330 Z",
  "M328 196 L385 146 C400 136 430 130 468 129 L588 129 C615 131 636 140 652 154 L700 196 Z",
  "M520 129 V322",
  "M345 196 C340 250 338 290 342 324",
  "M700 196 C712 240 712 290 706 324",
  "M300 200 H736",
  "M470 222 H496 M650 222 H676",
  "M900 236 C918 240 932 248 940 258 L912 256 Z",
  "M100 250 L140 240 L138 256 L102 262 Z",
  "M688 184 L706 178 L712 190 L696 194 Z",
];

const RIMS = [
  "M775 318 m-38 0 a38 38 0 1 0 76 0 a38 38 0 1 0 -76 0",
  "M246 318 m-38 0 a38 38 0 1 0 76 0 a38 38 0 1 0 -76 0",
];

/**
 * Interactive X-ray car. Lines draw themselves on scroll and the car separates into a
 * gentle exploded view. Hover or tap a system to trace it in signal orange.
 */
export function CarDiagram() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SystemId>("brakes");
  const current = systems.find((s) => s.id === active)!;

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const lines = el.querySelectorAll<SVGPathElement>("[data-line]");
      if (belowFold(el)) {
        gsap.set(lines, { strokeDashoffset: 1 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 75%",
          once: true,
          onEnter: () => gsap.to(lines, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", stagger: 0.012 }),
        });
      }
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 30%", scrub: 0.8 } });
        tl.to("[data-g='body']", { y: -22, ease: "sine.inOut" }, 0)
          .to("[data-g='wheels']", { y: 12, ease: "sine.inOut" }, 0)
          .to("[data-g='engine'], [data-g='transmission'], [data-g='ac'], [data-g='electrical']", { y: -8, ease: "sine.inOut" }, 0)
          .to("[data-g='exhaust']", { y: 14, ease: "sine.inOut" }, 0)
          .to("[data-dim]", { opacity: 1, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const select = (id: SystemId) => {
    if (id === active) return;
    setActive(id);
    if (prefersReducedMotion()) return;
    const paths = root.current?.querySelectorAll<SVGPathElement>(`[data-g='${id}'] [data-line]`);
    if (paths?.length) gsap.fromTo(paths, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power3.out", stagger: 0.05 });
  };

  return (
    <div ref={root} className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <div className="relative">
        <svg viewBox="0 0 1000 440" className="w-full overflow-visible" role="group" aria-labelledby="car-diagram-title">
          <title id="car-diagram-title">{`X-ray diagram of a car showing its main systems. The ${current.label.toLowerCase()} system is highlighted.`}</title>
          {/* ground + dimension line */}
          <g data-dim opacity="0.35" className="text-muted">
            <path d="M40 374 H960" stroke="currentColor" strokeDasharray="4 6" fill="none" />
            <path d="M246 412 H775 M246 404 V420 M775 404 V420" stroke="currentColor" fill="none" />
            <text x="510" y="432" textAnchor="middle" className="fill-current font-mono text-[11px] uppercase tracking-[0.2em]">
              Wheelbase 2,830 mm
            </text>
          </g>

          <g data-g="body" className="text-fg">
            {BODY.map((d, i) => (
              <path key={i} d={d} data-line pathLength={1} strokeDasharray="1" fill="none" stroke="currentColor" strokeWidth={i === 0 ? 2.2 : 1.3} strokeOpacity={i === 0 ? 0.9 : 0.55} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            ))}
          </g>

          <g data-g="wheels" className="text-fg">
            {RIMS.map((d, i) => (
              <path key={i} d={d} data-line pathLength={1} strokeDasharray="1" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            ))}
            <g data-g="tires" className={clsx("transition-[color,opacity] duration-500", active === "tires" ? "text-signal" : "text-fg", active !== "tires" && "opacity-60")}>
              {PARTS.tires.map((p, i) => (
                <path key={i} d={p.d} data-line pathLength={1} strokeDasharray="1" fill="none" stroke="currentColor" strokeWidth={p.w ?? 1.5} vectorEffect="non-scaling-stroke" style={p.dash ? { strokeDasharray: "0.012 0.012" } : undefined} />
              ))}
            </g>
          </g>

          {(Object.keys(PARTS) as SystemId[])
            .filter((id) => id !== "tires")
            .map((id) => (
              <g key={id} data-g={id} className={clsx("transition-[color,opacity] duration-500", active === id ? "text-signal" : "text-fg opacity-35")}>
                {PARTS[id].map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    data-line={p.dash ? undefined : true}
                    pathLength={1}
                    strokeDasharray={p.dash ? "0.01 0.012" : "1"}
                    fill={active === id && !p.dash && p.d.endsWith("Z") ? "color-mix(in oklab, currentColor 14%, transparent)" : "none"}
                    stroke="currentColor"
                    strokeWidth={p.w ?? 1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
            ))}

          {/* Hotspots */}
          {systems.map((s, i) => (
            <g
              key={s.id}
              role="button"
              tabIndex={0}
              aria-label={`Show ${s.label}`}
              aria-pressed={active === s.id}
              className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-signal"
              onPointerEnter={() => select(s.id)}
              onClick={() => select(s.id)}
              onFocus={() => select(s.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), select(s.id))}
            >
              <circle cx={s.x} cy={s.y} r="22" fill="transparent" stroke="transparent" strokeWidth="2" />
              {active === s.id && <circle cx={s.x} cy={s.y} r="14" fill="none" stroke="#ff5b1f" strokeOpacity="0.5" className="origin-center animate-ping [transform-box:fill-box]" />}
              <circle cx={s.x} cy={s.y} r="9" fill={active === s.id ? "#ff5b1f" : "#0e0f11"} stroke={active === s.id ? "#ff5b1f" : "#efece6"} strokeWidth="1.5" />
              <text x={s.x} y={s.y + 3.5} textAnchor="middle" className={clsx("pointer-events-none font-mono text-[10px] font-medium", active === s.id ? "fill-asphalt" : "fill-chalk")}>
                {i + 1}
              </text>
            </g>
          ))}
        </svg>

        {/* System chips (touch-friendly + keyboard) */}
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Car systems">
          {systems.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => select(s.id)}
              aria-pressed={active === s.id}
              className={clsx(
                "min-h-11 border px-3.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] transition-colors",
                active === s.id ? "border-signal bg-signal text-asphalt" : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {i + 1}. {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="relative flex flex-col justify-between gap-8 border border-line bg-bg/60 p-6 backdrop-blur lg:p-8" aria-live="polite">
        <div key={current.id} className="anim-fade" style={{ ["--d" as string]: "-0.1s" }}>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal">System {systems.indexOf(current) + 1} / {systems.length}</p>
          <h3 className="t-h3 mt-4 text-[2rem]">{current.label}</h3>
          <p className="mt-4 leading-relaxed text-muted">{current.blurb}</p>
          <p className="t-eyebrow mt-8 text-faint">Watch for</p>
          <ul className="mt-3 flex flex-col gap-2">
            {current.watch.map((w) => (
              <li key={w} className="flex items-center gap-3 text-sm">
                <span className="stripe !w-3" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-end justify-between gap-4 border-t border-line pt-6">
          <p>
            <span className="block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">From</span>
            <span className="font-display text-4xl font-extrabold [--wdth:80]">{current.from}</span>
          </p>
          <Link href={`/services/${current.service}`} className="btn btn-signal group !min-h-11 !px-4">
            Details <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
