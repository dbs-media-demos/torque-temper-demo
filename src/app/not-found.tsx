import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { services } from "@/content/services";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <SiteChrome>
      <PageShell>
        <section className="theme-dark blueprint relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]">
          <div className="wrap relative">
            <p className="t-eyebrow flex items-center gap-3 text-signal">
              <span className="stripe" aria-hidden />
              Code P0404 · page not found
            </p>
            <h1 className="t-display anim-wdth mt-6">
              Wrong
              <br />
              turn<span className="text-signal">.</span>
            </h1>
            <p className="t-lead mt-8 max-w-lg text-muted">That page doesn&apos;t exist, or it moved. No charge for the diagnosis.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-signal">
                Back to home <ArrowRight />
              </Link>
              <Link href="/whats-that-noise" className="btn btn-ghost">
                Symptom finder
              </Link>
            </div>
            <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="heat-link hover:text-fg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <svg aria-hidden viewBox="0 0 64 64" className="pointer-events-none absolute -right-24 top-1/2 hidden size-[36rem] -translate-y-1/2 text-graphite-2 lg:block">
            <polygon points="32,4.5 55.8,18.25 55.8,45.75 32,59.5 8.2,45.75 8.2,18.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </section>
      </PageShell>
    </SiteChrome>
  );
}
