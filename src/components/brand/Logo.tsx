"use client";

import clsx from "clsx";
import { useBiz } from "@/components/preview/BizContext";

/** Hex nut with a torque stripe: the paint mark a tech adds once a bolt is torqued to spec. */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <polygon points="32,4.5 55.8,18.25 55.8,45.75 32,59.5 8.2,45.75 8.2,18.25" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="10.5" fill="none" stroke="currentColor" strokeWidth="4.2" />
      <line x1="45" y1="5" x2="19" y2="59" stroke="#ff5b1f" strokeWidth="6" strokeLinecap="square" className="logo-stripe" />
    </svg>
  );
}

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  const biz = useBiz();
  if (biz.preview) {
    // Their name set in the demo's type; the mark stays as a stand-in until they have a logo
    const long = biz.shortName.length > 18;
    return (
      <span className={clsx("group inline-flex items-center gap-3", className)}>
        <LogoMark className="size-9 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[60deg]" />
        <span className="flex min-w-0 flex-col leading-none">
          <span className={clsx("block max-w-[13rem] truncate font-display font-extrabold uppercase tracking-[0.01em] sm:max-w-[18rem]", long ? "text-[0.9rem] [--wdth:85]" : "text-[1.02rem] [--wdth:125]")}>
            {biz.shortName}
          </span>
          {!compact && <span className="mt-1.5 block max-w-[13rem] truncate font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted sm:max-w-[18rem]">{[biz.area, biz.address.region].filter(Boolean).join(", ")}</span>}
        </span>
      </span>
    );
  }
  return (
    <span className={clsx("group inline-flex items-center gap-3", className)}>
      <LogoMark className="size-9 shrink-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[60deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.02rem] font-extrabold uppercase tracking-[0.01em] [--wdth:125]">
          Torque <span className="text-signal">&amp;</span> Temper
        </span>
        {!compact && <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted">Auto Works · East Dallas</span>}
      </span>
    </span>
  );
}
