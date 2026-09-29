"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { openState, type OpenState } from "@/lib/hours";
import { site } from "@/lib/site";

/** Live "Open now · closes 6 pm" badge, computed in Dallas time. SSR shows the static hours. */
export function OpenBadge({ className }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(openState());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={clsx("inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em]", className)}>
      <span
        aria-hidden
        className={clsx(
          "size-2 rounded-full",
          state === null ? "bg-concrete" : state.open ? "pulse-dot bg-[#3ddc84] text-[#3ddc84]" : "bg-signal text-signal",
        )}
      />
      <span aria-live="polite">{state ? state.label : site.hoursSummary}</span>
    </span>
  );
}
