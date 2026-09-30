"use client";

import { useEffect, useState } from "react";
import { Close } from "@/components/ui/Icons";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/lib/site";

const KEY = "tt-demo-pill-dismissed";

/** Small, dismissible "concept site" credit linking to Scale by Noon. */
export function DemoPill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {}
    const id = window.setTimeout(() => setVisible(!dismissed), 1600);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{ viewTransitionName: "demo-pill" }}
      className="anim-fade fixed bottom-20 left-3 z-[105] flex items-center rounded-full border border-white/15 bg-asphalt/90 text-chalk shadow-2xl backdrop-blur-xl md:bottom-5 md:left-5"
    >
      <a href={site.agencyUrl} target="_blank" rel="noopener" className="flex min-h-11 items-center gap-2 py-2 pl-3 pr-1 font-mono text-[0.6rem] sm:text-[0.68rem] uppercase tracking-[0.12em]">
        <LogoMark className="size-4" />
        <span className="sm:hidden">Concept by {site.agencyName}</span><span className="hidden sm:inline">Concept site by {site.agencyName}</span> <span aria-hidden>↗</span>
      </a>
      <button
        type="button"
        aria-label="Dismiss concept site notice"
        className="grid size-11 place-items-center rounded-full text-chalk/70 hover:text-chalk"
        onClick={() => {
          setVisible(false);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
        }}
      >
        <Close width={14} height={14} />
      </button>
    </div>
  );
}
