"use client";

import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { BookButton, CallButton, Stars } from "@/components/ui/Bits";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Google } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { useBiz, useT } from "@/components/preview/BizContext";
import { num } from "@/lib/i18n";

const DESKTOP_MQ = "(min-width: 640px)";

/** Art-directed poster: landscape frame on tablets/desktop, portrait frame on phones. Both preloaded by media query. */
function HeroPicture({ alt }: { alt: string }) {
  const common = { alt, sizes: "100vw" };
  const { props: desk } = getImageProps({ ...common, width: 1280, height: 720, quality: 75, src: "/images/hero-poster.jpg" });
  const { props: mob } = getImageProps({ ...common, width: 720, height: 1280, quality: 75, src: "/images/hero-poster-portrait.jpg" });
  preload(desk.src, { as: "image", imageSrcSet: desk.srcSet, imageSizes: "100vw", media: DESKTOP_MQ, fetchPriority: "high" });
  preload(mob.src, { as: "image", imageSrcSet: mob.srcSet, imageSizes: "100vw", media: "(max-width: 639px)", fetchPriority: "high" });
  const { srcSet: mobSrcSet, ...rest } = mob;
  return (
    <picture>
      <source media={DESKTOP_MQ} srcSet={desk.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...rest} srcSet={mobSrcSet} loading="eager" fetchPriority="high" className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}

/**
 * Lift-bay hero. The poster paints first (LCP); the graded video fades in once playing.
 * On desktop the section pins and "takes a photo": the frame shrinks into a viewfinder,
 * a shutter flash fires and a "photo sent" receipt appears. That's the shop's whole promise.
 */
export function Hero() {
  const biz = useBiz();
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion() || conn?.saveData) return;
    const start = () => setVideoOn(true);
    // Phones: start the film on the first touch/scroll (or after 6 s) so it never competes with LCP.
    if (window.matchMedia("(pointer: coarse)").matches) {
      const events = ["touchstart", "scroll", "pointerdown"] as const;
      const go = () => {
        cleanup();
        start();
      };
      const t = window.setTimeout(go, 6000);
      const cleanup = () => {
        window.clearTimeout(t);
        events.forEach((e) => window.removeEventListener(e, go));
      };
      events.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
      return cleanup;
    }
    // Desktop: defer the video until the page is idle.
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2000 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 1200);
    return () => window.clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (hover: hover)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "+=110%", scrub: 0.8, pin: true, anticipatePin: 1 },
        });
        tl.fromTo("[data-frame]", { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(9% 7% 17% 38%)", duration: 1 }, 0)
          .fromTo("[data-media]", { scale: 1.08 }, { scale: 1, duration: 1 }, 0)
          .fromTo("[data-copy]", { y: 0 }, { y: -40, duration: 1 }, 0)
          .fromTo("[data-lead]", { opacity: 1 }, { opacity: 0, duration: 0.35 }, 0)
          .fromTo("[data-callouts]", { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0)
          .fromTo("[data-brackets]", { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.62)
          .fromTo("[data-flash]", { opacity: 0 }, { opacity: 0.85, duration: 0.04 }, 0.86)
          .to("[data-flash]", { opacity: 0, duration: 0.12 }, 0.9)
          .fromTo("[data-receipt]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.14 }, 0.9);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="theme-dark relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Media frame */}
      <div data-frame className="absolute inset-0 overflow-hidden">
        <div data-media className="absolute inset-0 [animation:hero-zoom_2.4s_var(--ease-out-expo)_both]">
          <HeroPicture alt={t("Inside the {shop} shop: a car in the bay while a technician works at the bench", { shop: biz.preview ? biz.shortName : "Torque & Temper" })} />
          {videoOn && (
            <video
              className="absolute inset-0 size-full object-cover transition-opacity duration-1000"
              style={{ opacity: playing ? 1 : 0 }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              onPlaying={() => setPlaying(true)}
            >
              <source src="/video/hero-portrait.mp4" type="video/mp4" media="(max-width: 639px)" />
              <source src="/video/hero.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/35 to-asphalt/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt/70 via-transparent to-transparent" />

        {/* Blueprint callouts */}
        <div data-callouts aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          <svg className="absolute inset-0 size-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path pathLength={1} className="anim-draw" style={{ ["--d" as string]: "0.9s" }} d="M58 34 L66 26 L80 26" fill="none" stroke="#ff5b1f" strokeWidth="0.12" vectorEffect="non-scaling-stroke" />
            <path pathLength={1} className="anim-draw" style={{ ["--d" as string]: "1.2s" }} d="M73 58 L79 50 L91 50" fill="none" stroke="#efece6" strokeOpacity=".6" strokeWidth="0.1" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="anim-fade absolute left-[58%] top-[34%] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal" style={{ ["--d" as string]: "0.8s" }} />
          <span className="anim-fade absolute left-[80.5%] top-[26%] -translate-y-1/2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-chalk" style={{ ["--d" as string]: "1.5s" }}>
            {t("Bay 03 · lift up · 7:42 am")}
          </span>
          <span className="anim-fade absolute left-[73%] top-[58%] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chalk/80" style={{ ["--d" as string]: "1.1s" }} />
          <span className="anim-fade absolute left-[91.5%] top-[50%] -translate-y-1/2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-chalk/80" style={{ ["--d" as string]: "1.8s" }}>
            {t("Lug M12 · 110 N·m")}
          </span>
        </div>

        {/* Viewfinder brackets + shutter flash (desktop scroll scene) */}
        <div data-brackets aria-hidden className="pointer-events-none absolute inset-[9%_7%_17%_38%] opacity-0">
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} className={`absolute size-10 border-signal ${c}`} />
          ))}
          <span className="absolute left-4 top-3 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-chalk">
            <span className="size-2 rounded-full bg-signal" /> {t("Photo 01 / 12 · front pads")}
          </span>
        </div>
      </div>
      <div data-flash aria-hidden className="pointer-events-none absolute inset-0 bg-white opacity-0" />

      {/* Copy */}
      <div data-copy className="wrap relative flex h-full flex-col justify-end pb-24 pt-[calc(var(--header-h)+2rem)] md:pb-14">
        <p className="anim-fade t-eyebrow mb-6 flex items-center gap-3 text-chalk/80" style={{ ["--d" as string]: "0.1s" }}>
          <span className="stripe" aria-hidden />
          {biz.preview ? (
            <span className="min-w-0 truncate">{[biz.name, [biz.address.city, biz.address.region].filter(Boolean).join(", ")].filter(Boolean).join(" · ")}</span>
          ) : (
            <>Family-owned · ASE certified · Since {site.founded}</>
          )}
        </p>
        {biz.tagline ? (
          <h1 id="hero-title" className="t-display anim-wdth max-w-[16ch] text-chalk !text-[clamp(2.8rem,7vw,8rem)]">
            {biz.tagline}
            <span className="text-signal">.</span>
          </h1>
        ) : (
          <h1 id="hero-title" className="t-display anim-wdth text-chalk !text-[clamp(3.1rem,8.2vw,9.5rem)]">
            <span className="block">{t("Honest")}</span>
            <span className="block">{t("auto repair")}</span>
            <span className="block">
              {t("in {area}", { area: biz.area })}<span className="text-signal">.</span>
            </span>
          </h1>
        )}

        <div data-lead className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
          <div className="anim-fade" style={{ ["--d" as string]: "0.35s" }}>
            <p className="t-lead max-w-xl text-chalk/85">
              {t("We text you photos of the problem before we touch a wrench. You approve every dollar, and the invoice matches the quote.")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <BookButton />
              <CallButton className="hidden sm:inline-flex" />
            </div>
          </div>
          <div className="anim-fade flex flex-col gap-3 md:items-end" style={{ ["--d" as string]: "0.55s" }}>
            {biz.rating && (
              <>
                <div className="flex items-center gap-3">
                  <Google />
                  <span className="font-display text-3xl font-extrabold [--wdth:90]">{num(biz, biz.rating.value)}</span>
                  <Stars value={biz.rating.value} />
                </div>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-chalk/70">{t("{count} Google reviews", { count: biz.rating.count })}</p>
              </>
            )}
            <OpenBadge className="text-chalk/80" />
          </div>
        </div>
      </div>

      {/* "Photo sent" receipt (desktop scroll scene) */}
      <div
        data-receipt
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] right-[7%] hidden w-[20rem] rounded-2xl border border-white/10 bg-asphalt/90 p-4 opacity-0 backdrop-blur-xl lg:block"
      >
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-chalk/60">{t("Text message · now")}</p>
        <p className="mt-2 text-sm leading-snug text-chalk">
          {biz.preview ? t("Hi Marisol, it's {name}. Photo attached: front pads at 2 mm.", { name: biz.shortName }) : "Hi Marisol, Dana at Torque & Temper. Photo attached: front pads at 2 mm."}{" "}
          <span className="text-signal">{t("$189, approve?")}</span>
        </p>
      </div>

      <div aria-hidden className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="scroll-hint h-10 w-px bg-chalk/50" />
      </div>
    </section>
  );
}
