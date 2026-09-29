"use client";

import Image from "next/image";
import { useState } from "react";

/** Drag / keyboard comparison slider: what came off the car vs what went on. */
export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  labels = ["Came off", "Went on"],
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  labels?: [string, string];
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[16/10] select-none overflow-hidden bg-graphite" data-cursor="Drag">
      <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" quality={70} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" quality={70} className="object-cover" />
      </div>
      <span className="absolute left-4 top-4 bg-asphalt/85 px-2.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-chalk">{labels[0]}</span>
      <span className="absolute right-4 top-4 bg-signal px-2.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-asphalt">{labels[1]}</span>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-chalk" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-chalk font-mono text-sm text-asphalt">⟷</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare: ${labels[0]} versus ${labels[1]}`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
