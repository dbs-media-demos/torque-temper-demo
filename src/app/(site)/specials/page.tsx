import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { specials } from "@/content/general";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { businessId, graph, webPageSchema } from "@/lib/schema";

const title = "Auto Repair Coupons & Specials in East Dallas";
const description = "Current coupons: $20 off synthetic oil changes, 15% off brakes, a free AC check and $50 off your first repair. Mention the code when you book.";

export const metadata = buildMetadata({ title, description, path: "/specials", eyebrow: "Specials" });

export default function SpecialsPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/specials", name: title, description }),
          ...specials.map((s) => ({
            "@type": "Offer",
            name: `${s.title}: ${s.subtitle}`,
            description: s.detail,
            url: absoluteUrl(`/services/${s.service}`),
            offeredBy: { "@id": businessId },
          })),
        )}
      />
      <PageHero
        compact
        crumbs={[{ name: "Specials", path: "/specials" }]}
        eyebrow="Coupons · this month"
        title={
          <>
            Fair prices, now a little fairer<span className="text-signal">.</span>
          </>
        }
        lead="Mention the code when you book online or show this page at the counter. One coupon per visit."
      />
      <section aria-label="Current specials" className="theme-dark pb-24 pt-8 lg:pb-32">
        <Reveal stagger={0.08} className="wrap grid gap-6 md:grid-cols-2">
          {specials.map((s) => (
            <article key={s.code} className="group relative grid grid-cols-[1fr_auto] overflow-hidden bg-chalk text-asphalt">
              <div className="p-7 md:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-signal-ink">Expires {s.expires}</p>
                <h2 className="mt-4 font-display text-[clamp(3.5rem,7vw,6rem)] font-black uppercase leading-[0.85] transition-[--wdth] duration-700 [--wdth:66] group-hover:[--wdth:90]">{s.title}</h2>
                <p className="mt-4 text-lg font-medium">{s.subtitle}</p>
                <p className="mt-2 text-sm text-[#4d4a45]">{s.detail}</p>
                <Link href={`/book?service=${s.service}`} className="btn btn-signal mt-7 !min-h-11">
                  Book with this code <ArrowRight />
                </Link>
              </div>
              {/* Tear-off stub */}
              <div className="relative flex w-20 flex-col items-center justify-center border-l-2 border-dashed border-asphalt/30 md:w-24">
                <span className="absolute -left-3 -top-3 size-6 rounded-full bg-asphalt" aria-hidden />
                <span className="absolute -bottom-3 -left-3 size-6 rounded-full bg-asphalt" aria-hidden />
                <span className="rotate-90 whitespace-nowrap font-mono text-sm font-medium tracking-[0.2em]">{s.code}</span>
              </div>
            </article>
          ))}
        </Reveal>
        <p className="wrap mt-8 text-sm text-muted">Can&apos;t be combined with other offers or fleet pricing. Valid at our East Dallas shop only.</p>
      </section>
      <CtaBand />
    </PageShell>
  );
}
