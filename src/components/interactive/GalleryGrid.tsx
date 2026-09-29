"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Close } from "@/components/ui/Icons";

export type Photo = { src: string; alt: string; tag: string; tall?: boolean };

/** Masonry grid with a keyboard-friendly <dialog> lightbox. */
export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const dialog = useRef<HTMLDialogElement>(null);
  const tags = ["All", ...Array.from(new Set(photos.map((p) => p.tag)))];
  const list = filter === "All" ? photos : photos.filter((p) => p.tag === filter);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) {
      d.showModal();
      window.__lenis?.stop();
    }
    if (open === null && d.open) d.close();
  }, [open]);

  const step = (dir: number) => setOpen((i) => (i === null ? i : (i + dir + list.length) % list.length));

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos">
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
            className={`min-h-11 border px-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${filter === t ? "border-signal bg-signal text-asphalt" : "border-line text-muted hover:text-fg"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((p, i) => (
          <li key={p.src} className="anim-fade mb-4 break-inside-avoid" style={{ ["--d" as string]: `${Math.min(i, 8) * 0.04}s` }}>
            <button type="button" onClick={() => setOpen(i)} data-cursor="View" className="group relative block w-full overflow-hidden bg-graphite text-left" aria-label={`Open photo: ${p.alt}`}>
              <span className={`relative block ${p.tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" quality={60} className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
              </span>
              <span className="absolute bottom-3 left-3 bg-asphalt/85 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-chalk opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                {p.tag}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => {
          setOpen(null);
          window.__lenis?.start();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => e.target === dialog.current && setOpen(null)}
        className="m-auto max-h-[92vh] w-[min(94vw,1200px)] bg-transparent p-0 text-chalk backdrop:bg-asphalt/92 backdrop:backdrop-blur"
        aria-label="Photo viewer"
      >
        {open !== null && list[open] && (
          <figure className="flex flex-col gap-4">
            <div className="relative aspect-[3/2] max-h-[78vh] w-full">
              <Image src={list[open].src} alt={list[open].alt} fill sizes="94vw" quality={85} className="object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-4">
              <span className="text-sm text-chalk/80">
                <span className="mr-3 font-mono text-xs text-signal">
                  {open + 1}/{list.length}
                </span>
                {list[open].alt}
              </span>
              <span className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid size-11 rotate-180 place-items-center border border-white/20 hover:border-signal">
                  <ArrowRight />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid size-11 place-items-center border border-white/20 hover:border-signal">
                  <ArrowRight />
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close photo viewer" className="grid size-11 place-items-center border border-white/20 hover:border-signal">
                  <Close />
                </button>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
