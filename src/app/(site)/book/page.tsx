import { Suspense } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/interactive/BookingForm";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import { site, telHref } from "@/lib/site";

const title = "Book an Auto Repair Appointment in East Dallas";
const description = "Book your repair online in about a minute. Pick your services, drop-off option and time. We text photos and a quote before any work.";

export const metadata = buildMetadata({ title, description, path: "/book", eyebrow: "Book online" });

export default function BookPage() {
  return (
    <PageShell>
      <JsonLd data={graph(webPageSchema({ path: "/book", name: title, description, type: "ContactPage" }))} />
      <PageHero
        compact
        crumbs={[{ name: "Book", path: "/book" }]}
        eyebrow="About 60 seconds"
        title={
          <>
            Book a repair<span className="text-signal">.</span>
          </>
        }
        lead="Five quick steps. You'll get a text to confirm, then photos and a price before we touch anything."
        aside={
          <div className="flex flex-col gap-3 border-l border-line pl-6 text-sm text-muted">
            <OpenBadge className="text-fg" />
            <p>Same-day and next-morning openings most days.</p>
            <a href={telHref} className="heat-link self-start text-fg">
              Prefer to call? {site.phoneDisplay}
            </a>
          </div>
        }
      />
      <section id="booking" aria-label="Booking form" className="theme-dark scroll-mt-24 pb-24 pt-6 lg:pb-32">
        <div className="wrap">
          <Suspense fallback={<div className="h-[40rem]" />}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </PageShell>
  );
}
