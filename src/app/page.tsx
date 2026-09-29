import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PhotoApproval } from "@/components/home/PhotoApproval";
import { ServiceRows } from "@/components/home/ServiceRows";
import { CarDiagram } from "@/components/home/CarDiagram";
import { DayInBays } from "@/components/home/DayInBays";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";
import { PriceWall } from "@/components/home/PriceWall";
import { SymptomFinder } from "@/components/interactive/SymptomFinder";
import { AreaMap } from "@/components/sections/AreaMap";
import { Amenities } from "@/components/sections/Amenities";
import { FaqList } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { StretchHeading } from "@/components/ui/StretchHeading";
import { Eyebrow } from "@/components/ui/Bits";
import { ArrowRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { generalFaqs } from "@/content/general";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = `${site.name} | Honest Auto Repair in East Dallas, TX`;
const description =
  "Family-owned, ASE-certified auto repair in East Dallas since 2009. Photos before any work, upfront prices, 24-month/24,000-mile warranty. Serving Lakewood, Lake Highlands, Garland and Mesquite.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true, eyebrow: "East Dallas · since 2009" });

const homeFaqs = [generalFaqs[0].items[0], generalFaqs[1].items[0], generalFaqs[2].items[0], generalFaqs[2].items[2]];

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd data={graph(webPageSchema({ path: "/", name: title, description, image: "/images/hero-poster.jpg" }))} />
      <Hero />
      <TrustStrip />
      <PhotoApproval />

      {/* What we fix */}
      <section aria-labelledby="fix-title" className="theme-dark overflow-hidden py-24 lg:py-32">
        <div className="wrap">
          <Eyebrow>Services</Eyebrow>
          <StretchHeading id="fix-title" className="mt-6 text-[clamp(3.6rem,15vw,15rem)]">
            What we fix
          </StretchHeading>
          <div className="mt-14">
            <ServiceRows items={services} />
          </div>
        </div>
      </section>

      {/* X-ray car */}
      <section aria-labelledby="xray-title" className="theme-graphite blueprint relative overflow-hidden py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Inside your car</Eyebrow>
              <h2 id="xray-title" className="t-h2 mt-5 max-w-[16ch]">
                Point at the problem. We&apos;ll take it from there.
              </h2>
            </div>
            <p className="max-w-sm text-muted">Hover or tap a system to see what it does, what to watch for and what it usually costs.</p>
          </div>
          <div className="mt-14">
            <CarDiagram />
          </div>
        </div>
      </section>

      {/* Symptom finder */}
      <section aria-labelledby="noise-title" className="theme-dark py-24 lg:py-32">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow>Symptom finder</Eyebrow>
              <StretchHeading id="noise-title" className="mt-6 text-[clamp(3rem,9vw,9rem)]" from={64} to={100}>
                What&apos;s that noise?
              </StretchHeading>
            </div>
            <p className="max-w-sm text-muted">
              Pick what your car is doing. You&apos;ll get the likely causes in plain English, a typical price and time, and a one-tap booking.
            </p>
          </div>
          <div className="mt-14">
            <SymptomFinder />
          </div>
        </div>
      </section>

      <DayInBays />
      <PriceWall />
      <ReviewsMarquee />

      {/* Service area */}
      <section aria-labelledby="area-title" className="theme-chalk py-24 lg:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Where we are</Eyebrow>
            <h2 id="area-title" className="t-h2 mt-5 max-w-[12ch]">
              Minutes from East Dallas driveways.
            </h2>
            <p className="t-lead mt-6 max-w-md text-muted">
              Off Garland Road by White Rock Lake. Free shuttle within 5 miles, free pickup in Garland on repairs over $250.
            </p>
            <ul className="mt-10 border-t border-line">
              {areas.map((a) => (
                <li key={a.slug} className="border-b border-line">
                  <Link href={`/areas/${a.slug}`} className="group flex items-center justify-between gap-4 py-4">
                    <span className="t-h3 transition-colors group-hover:text-signal">{a.name}</span>
                    <span className="flex items-center gap-4 font-mono text-sm text-muted">
                      {a.drive}
                      <ArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <AreaMap />
        </div>
      </section>

      <Amenities />

      <section aria-labelledby="faq-title" className="theme-dark border-t border-line py-24 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="faq-title" className="t-h2 mt-5 max-w-[10ch]">
              Straight answers.
            </h2>
            <Link href="/faq" className="t-eyebrow heat-link mt-8 inline-flex items-center gap-2 pb-1 text-muted hover:text-fg">
              All questions <ArrowRight />
            </Link>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand />
    </PageShell>
  );
}
