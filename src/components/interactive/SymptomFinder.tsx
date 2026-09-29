"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { symptoms, type Wave } from "@/content/symptoms";
import { prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight, Phone } from "@/components/ui/Icons";
import { telHref } from "@/lib/site";

/** Waveform generator per symptom: y(x, t) in [-1, 1]. */
const waves: Record<Wave, (x: number, t: number) => number> = {
  grind: (x, t) => (Math.sin(x * 38 + t * 9) * 0.5 + (Math.sin(x * 211 + t * 31) * 0.5) * (0.6 + 0.4 * Math.sin(t * 3))) * (0.55 + 0.45 * Math.abs(Math.sin(x * 4 + t))),
  pulse: (x, t) => {
    const p = (x * 3 + t * 0.5) % 1;
    return p < 0.08 ? Math.sin((p / 0.08) * Math.PI * 2) * 0.95 : Math.sin(x * 60 + t * 4) * 0.06;
  },
  hiss: (x, t) => (Math.sin(x * 400 + t * 50) * Math.sin(x * 173 - t * 22)) * 0.45 + Math.sin(x * 6 + t) * 0.12,
  drift: (x, t) => Math.sin(x * 9 + t * 1.6) * 0.35 + (x - 0.5) * 0.9 * Math.sin(t * 0.7),
  surge: (x, t) => Math.sin(x * 14 - t * 3) * (0.25 + 0.7 * Math.pow(Math.sin(t * 0.9) * 0.5 + 0.5, 2)) * (0.4 + x),
  smell: (x, t) => Math.sin(x * 7 + t * 0.8) * 0.3 + Math.sin(x * 19 - t * 1.3) * 0.18 + Math.sin(x * 3.3 + t * 0.4) * 0.2,
};

function Waveform({ wave }: { wave: Wave }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = prefersReducedMotion();
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let raf = 0;
    let visible = true;
    let last = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(c);
    const fn = waves[wave];
    function draw(now: number) {
      if (!c || !ctx) return;
      if (coarse && now - last < 33) {
        if (visible && !reduce) raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      const t = reduce ? 1 : now / 1000;
      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      // grid
      ctx.strokeStyle = "rgba(239,236,230,0.07)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 24 * dpr) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();
      // trace
      ctx.beginPath();
      const n = 320;
      for (let i = 0; i <= n; i++) {
        const x = i / n;
        const y = h / 2 - fn(x, t) * h * 0.4;
        if (i === 0) ctx.moveTo(0, y);
        else ctx.lineTo(x * w, y);
      }
      ctx.strokeStyle = "#ff5b1f";
      ctx.lineWidth = 1.6 * dpr;
      ctx.shadowColor = "rgba(255,91,31,0.6)";
      ctx.shadowBlur = 8 * dpr;
      ctx.stroke();
      ctx.shadowBlur = 0;
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [wave]);

  return <canvas ref={canvas} aria-hidden className="h-28 w-full md:h-36" />;
}

/** Types text out character by character (static when reduced motion). */
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = prefersReducedMotion();
    let i = 0;
    const id = window.setInterval(() => {
      i = reduce ? text.length : i + 2;
      setN(Math.min(i, text.length));
      if (i >= text.length) window.clearInterval(id);
    }, 14);
    return () => window.clearInterval(id);
  }, [text]);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className={clsx(n < text.length && "caret")}>
        {text.slice(0, n)}
      </span>
    </>
  );
}

/**
 * "What's that noise?" A diagnostic-scanner console: pick a symptom, see likely causes,
 * a typical price and time, and book that diagnosis with the symptom pre-filled.
 */
export function SymptomFinder({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [idx, setIdx] = useState(0);
  const s = symptoms[idx];
  const H = headingLevel;
  const groupId = useId();

  return (
    <div className="overflow-hidden border border-line bg-[#0b0c0e] text-chalk shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-chalk/70 md:px-6">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#3ddc84]" aria-hidden /> T&amp;T scan tool · connected
        </span>
        <span className="hidden sm:inline">VIN ••••••••••4417 · 12.6 V</span>
      </div>

      <div className="grid md:grid-cols-[18rem_1fr]">
        {/* Symptom list */}
        <div role="radiogroup" aria-labelledby={groupId} className="flex gap-2 overflow-x-auto border-b border-white/10 p-3 no-scrollbar md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-4">
          <p id={groupId} className="sr-only">
            Choose a symptom
          </p>
          {symptoms.map((sym, i) => (
            <button
              key={sym.id}
              type="button"
              role="radio"
              aria-checked={i === idx}
              onClick={() => setIdx(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                  e.preventDefault();
                  setIdx((idx + 1) % symptoms.length);
                  (e.currentTarget.parentElement?.children[((idx + 1) % symptoms.length) + 1] as HTMLElement)?.focus();
                }
                if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const n = (idx - 1 + symptoms.length) % symptoms.length;
                  setIdx(n);
                  (e.currentTarget.parentElement?.children[n + 1] as HTMLElement)?.focus();
                }
              }}
              tabIndex={i === idx ? 0 : -1}
              className={clsx(
                "group flex min-h-12 shrink-0 items-center justify-between gap-3 border px-4 py-3 text-left text-sm transition-colors md:w-full",
                i === idx ? "border-signal bg-signal/10 text-chalk" : "border-white/10 text-chalk/70 hover:border-white/25 hover:text-chalk",
              )}
            >
              <span className="whitespace-nowrap md:whitespace-normal">{sym.label}</span>
              <span className={clsx("font-mono text-[0.62rem] tracking-[0.1em]", i === idx ? "text-signal" : "text-chalk/40")}>{sym.code}</span>
            </button>
          ))}
        </div>

        {/* Readout */}
        <div className="flex flex-col gap-6 p-5 md:p-8" aria-live="polite">
          <div className="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.16em] text-chalk/70">
            <span>
              Code <span className="text-signal">{s.code}</span>
            </span>
            <span>Live trace</span>
          </div>
          <Waveform wave={s.wave} />
          <div>
            <H className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold uppercase leading-[0.92] [--wdth:84]">{s.short}</H>
            <p className="mt-4 min-h-[5.5rem] max-w-2xl leading-relaxed text-chalk/85">
              <Typed key={s.id} text={s.summary} />
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-chalk/60">Likely causes</p>
              <ul className="mt-4 flex flex-col gap-4">
                {s.causes.map((c) => (
                  <li key={s.id + c.name}>
                    <div className="flex justify-between gap-4 text-sm">
                      <span>{c.name}</span>
                      <span className="font-mono text-chalk/70">{c.likelihood}%</span>
                    </div>
                    <div className="mt-2 h-1 bg-white/10">
                      <div className="anim-grow h-full bg-signal" style={{ width: `${c.likelihood}%`, ["--d" as string]: "0.15s" }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="grid grid-cols-2 gap-px self-start bg-white/10 text-sm">
              {[
                ["Typical price", s.price],
                ["Typical time", s.time],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#0b0c0e] p-4">
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk/60">{k}</dt>
                  <dd className="mt-2 leading-snug">{v}</dd>
                </div>
              ))}
              <div className="col-span-2 bg-[#0b0c0e] p-4">
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-chalk/60">Our advice</dt>
                <dd className={clsx("mt-2 font-medium", s.urgency.startsWith("Stop") ? "text-signal" : "text-chalk")}>{s.urgency}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
            <Link href={`/book?service=${s.service}&symptom=${s.id}`} className="btn btn-signal group">
              Book this diagnosis <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={telHref} className="btn btn-ghost [--fg:var(--chalk)] [--line-strong:rgba(239,236,230,0.24)]">
              <Phone /> Describe it to a tech
            </a>
          </div>
          <p className="text-xs text-chalk/60">Estimates are typical ranges for common cars. We confirm the cause and price with photos before any work.</p>
        </div>
      </div>
    </div>
  );
}
