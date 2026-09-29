import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { Stars } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { Google } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviews } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { businessId, graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = `Reviews: ${site.rating.value} Stars from ${site.rating.count} Customers`;
const description = `Read what East Dallas, Lakewood, Garland and Mesquite drivers say about Torque & Temper. ${site.rating.value}-star average from ${site.rating.count} Google reviews.`;

export const metadata = buildMetadata({ title, description, path: "/reviews", eyebrow: "Reviews" });

const breakdown = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0.5 },
  { stars: 1, pct: 0.5 },
];

export default function ReviewsPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(webPageSchema({ path: "/reviews", name: title, description }), {
          "@type": "AutoRepair",
          "@id": businessId,
          review: reviews.map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.name },
            datePublished: r.iso,
            reviewBody: r.text,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
          })),
        })}
      />
      <PageHero
        compact
        crumbs={[{ name: "Reviews", path: "/reviews" }]}
        eyebrow="Google reviews"
        title={
          <>
            Don&apos;t take our word for it<span className="text-signal">.</span>
          </>
        }
        lead="Real words from people who were nervous walking in and relieved driving out. (Concept site: reviews are illustrative.)"
        aside={
          <div className="border border-line p-6">
            <div className="flex items-center gap-4">
              <Google width={36} height={36} />
              <span className="font-display text-7xl font-black leading-none [--wdth:74]">{site.rating.value}</span>
            </div>
            <Stars className="mt-3" />
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">{site.rating.count} reviews</p>
            <ul className="mt-6 flex flex-col gap-2" aria-label="Rating breakdown">
              {breakdown.map((b) => (
                <li key={b.stars} className="grid grid-cols-[1.5rem_1fr_2.5rem] items-center gap-3 font-mono text-xs">
                  <span>{b.stars}★</span>
                  <span className="h-1.5 bg-line">
                    <span className="anim-grow block h-full bg-signal" style={{ width: `${b.pct}%` }} />
                  </span>
                  <span className="text-right text-muted">{b.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <section aria-label="All reviews" className="theme-dark pb-24 pt-8 lg:pb-32">
        <div className="wrap">
          <Reveal stagger={0.06} className="columns-1 gap-4 md:columns-2 xl:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
            {reviews.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </Reveal>
        </div>
      </section>
      <CtaBand title="Be the next review." />
    </PageShell>
  );
}
