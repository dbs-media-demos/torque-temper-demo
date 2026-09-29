"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/brand/Logo";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Phone, Close, ArrowRight } from "@/components/ui/Icons";
import { services } from "@/content/services";
import { mainNav } from "./nav";
import { site, telHref } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 400) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={clsx(
          "theme-dark fixed inset-x-0 top-0 z-[120] !bg-transparent transition-transform duration-500 ease-[var(--ease-out-expo)]",
          hidden && !menuOpen && !megaOpen && "-translate-y-full",
        )}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div
          className={clsx(
            "absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
            scrolled || megaOpen ? "border-line bg-asphalt/85 backdrop-blur-xl" : "border-transparent bg-gradient-to-b from-black/50 to-transparent",
          )}
        />
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name}, home`} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <div key={item.href} className="relative" onMouseEnter={() => setMegaOpen(true)}>
                  <Link
                    href={item.href}
                    aria-expanded={megaOpen}
                    aria-controls="mega-services"
                    onFocus={() => setMegaOpen(true)}
                    className={clsx("t-eyebrow block whitespace-nowrap px-3 py-2 transition-colors hover:text-fg", isActive(item.href) ? "text-fg" : "text-muted")}
                  >
                    {item.label}
                    <span aria-hidden className={clsx("ml-1.5 inline-block transition-transform", megaOpen && "rotate-180")}>
                      ▾
                    </span>
                  </Link>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setMegaOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={clsx("t-eyebrow whitespace-nowrap px-3 py-2 transition-colors hover:text-fg", isActive(item.href) ? "text-fg" : "text-muted")}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden min-[1680px]:inline-flex">
              <OpenBadge className="whitespace-nowrap text-muted" />
            </span>
            <a href={telHref} className="t-eyebrow hidden items-center gap-2 whitespace-nowrap px-2 py-2 text-fg transition-colors hover:text-signal xl:inline-flex">
              <Phone className="text-signal" />
              {site.phoneDisplay}
            </a>
            <Link href="/book" className="btn btn-signal hidden !min-h-11 sm:inline-flex">
              Book now
            </Link>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center lg:hidden"
            >
              <span className={clsx("absolute h-0.5 w-6 bg-current transition-transform duration-500", menuOpen ? "rotate-45" : "-translate-y-1.5")} />
              <span className={clsx("absolute h-0.5 w-6 bg-current transition-transform duration-500", menuOpen ? "-rotate-45" : "translate-y-1.5")} />
            </button>
          </div>
        </div>

        {/* Services mega panel (desktop) */}
        <div
          id="mega-services"
          className={clsx(
            "absolute inset-x-0 top-full hidden overflow-hidden border-b border-line bg-asphalt/95 backdrop-blur-xl transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:block",
            megaOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
          )}
          inert={!megaOpen}
        >
          <div className="wrap grid grid-cols-[1fr_1.1fr_0.9fr] gap-10 py-10">
            <ul className="grid grid-cols-1 content-start gap-px">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    className="group flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                  >
                    <span className={clsx("font-display text-2xl font-bold uppercase transition-colors [--wdth:88]", preview === i ? "text-fg" : "text-muted")}>
                      {s.name}
                    </span>
                    <span className="font-mono text-xs text-signal">from {s.priceFrom}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
              {services.map((s, i) => (
                <Image
                  key={s.slug}
                  src={s.image}
                  alt=""
                  fill
                  sizes="40vw"
                  quality={60}
                  className={clsx("object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]", preview === i ? "scale-100 opacity-100" : "scale-110 opacity-0")}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-chalk">{services[preview].spec}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="t-eyebrow text-signal">{services[preview].eyebrow}</p>
                <p className="mt-4 text-lg leading-snug text-fg">{services[preview].tagline}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/services" className="t-eyebrow inline-flex items-center gap-2 text-muted hover:text-fg">
                  All services <ArrowRight />
                </Link>
                <Link href="/whats-that-noise" className="t-eyebrow inline-flex items-center gap-2 text-muted hover:text-fg">
                  Not sure what it is? Try the symptom finder <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "theme-dark fixed inset-0 z-[110] flex flex-col overflow-y-auto pt-[var(--header-h)] transition-[clip-path] duration-700 ease-[var(--ease-in-out-quart)] lg:hidden",
          menuOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
        )}
        inert={!menuOpen}
        aria-label="Menu"
        role="dialog"
        aria-modal="true"
      >
        <nav aria-label="Mobile" className="wrap flex flex-1 flex-col gap-1 py-8">
          {[{ label: "Home", href: "/" }, ...mainNav, { label: "Fleet accounts", href: "/fleet" }, { label: "Contact", href: "/contact" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-baseline justify-between border-b border-line py-3"
              style={{ transitionDelay: menuOpen ? `${120 + i * 45}ms` : "0ms" }}
            >
              <span className="font-display text-4xl font-extrabold uppercase [--wdth:70]">{item.label}</span>
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
            </Link>
          ))}
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <OpenBadge className="text-muted" />
            <a href={telHref} className="btn btn-ghost w-full">
              <Phone /> Call {site.phoneDisplay}
            </a>
            <Link href="/book" className="btn btn-signal w-full">
              Book an appointment
            </Link>
          </div>
        </nav>
        <button type="button" onClick={() => setMenuOpen(false)} className="sr-only focus:not-sr-only" aria-label="Close menu">
          <Close />
        </button>
      </div>
    </>
  );
}
