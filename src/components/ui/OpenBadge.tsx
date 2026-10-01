"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { openState, type OpenState } from "@/lib/hours";
import { useBiz } from "@/components/preview/BizContext";

/** Live "Open now · closes 6 pm" badge, computed in the shop's timezone. SSR shows the static hours. */
export function OpenBadge({ className }: { className?: string }) {
  const biz = useBiz();
  const [state, setState] = useState<OpenState | null>(null);
  const { hours, timezone } = biz;

  useEffect(() => {
    if (!hours) return;
    const tick = () => setState(openState(new Date(), hours, timezone));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [hours, timezone]);

  // A preview of a business whose hours we don't know: no badge rather than a made-up one
  if (!hours) return null;

  return (
    <span className={clsx("inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.14em]", className)}>
      <span
        aria-hidden
        className={clsx(
          "size-2 rounded-full",
          state === null ? "bg-concrete" : state.open ? "pulse-dot bg-[#3ddc84] text-[#3ddc84]" : "bg-signal text-signal",
        )}
      />
      <span aria-live="polite">{state ? state.label : biz.hoursSummary}</span>
    </span>
  );
}
