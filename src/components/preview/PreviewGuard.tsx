"use client";

import { useEffect, useState } from "react";
import { useBiz, useT } from "./BizContext";

/** The concept site's other pages, by first path segment, in each preview language */
const PAGES: Record<string, { en: string; sr: string }> = {
  services: { en: "services", sr: "Usluge" },
  book: { en: "online booking", sr: "Zakazivanje" },
  contact: { en: "contact", sr: "Kontakt" },
  about: { en: "about", sr: "O nama" },
  reviews: { en: "reviews", sr: "Utisci" },
  faq: { en: "FAQ", sr: "Česta pitanja" },
  gallery: { en: "gallery", sr: "Galerija" },
  fleet: { en: "fleet accounts", sr: "Vozni parkovi" },
  specials: { en: "specials", sr: "Akcije" },
  areas: { en: "service area", sr: "Gde radimo" },
  "whats-that-noise": { en: "symptom finder", sr: "Šta to lupa?" },
  privacy: { en: "privacy", sr: "Privatnost" },
};

/**
 * A preview is the homepage only. Links to the concept site's other pages stay where they are
 * and say "that page comes with the full site" instead of leaving the business's preview.
 */
export function PreviewGuard() {
  const biz = useBiz();
  const t = useT();
  const [note, setNote] = useState<string | null>(null);

  // The page's language for screen readers and the browser's translate offer
  useEffect(() => {
    document.documentElement.lang = biz.lang === "sr" ? "sr-Latn" : "en-US";
  }, [biz.lang]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/for/")) return;
      // Capture phase: runs before Next's <Link> handler, so the navigation never starts
      e.preventDefault();
      e.stopPropagation();
      if (url.pathname === "/") {
        if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const page = PAGES[url.pathname.split("/")[1]];
      setNote(page ? t("The {page} page comes with the full {name} site.", { page: page[biz.lang], name: biz.shortName }) : t("That page comes with the full {name} site.", { name: biz.shortName }));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [biz.shortName, biz.lang, t]);

  useEffect(() => {
    if (!note) return;
    const id = window.setTimeout(() => setNote(null), 3200);
    return () => window.clearTimeout(id);
  }, [note]);

  if (!note) return null;
  return (
    <div
      role="status"
      className="anim-fade fixed bottom-24 left-1/2 z-[130] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-white/15 bg-asphalt/95 px-5 py-3 text-center font-mono text-[0.72rem] uppercase tracking-[0.12em] text-chalk shadow-2xl backdrop-blur-xl md:bottom-8"
    >
      {note}
    </div>
  );
}
