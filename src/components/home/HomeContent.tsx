import Link from "next/link";
import type { ReactNode } from "react";
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
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { generalFaqs } from "@/content/general";
import { defaultBiz, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";
import { localFaqs, localServices } from "@/i18n/content";
import { PreviewMap } from "@/components/preview/PreviewMap";

const homeFaqs = [generalFaqs[0].items[0], generalFaqs[1].items[0], generalFaqs[2].items[0], generalFaqs[2].items[2]];

/**
 * The homepage sections. The concept site renders them as is; a personalised preview
 * (/for/<token>) passes the real business, and the service-area block becomes their map.
 */
export function HomeContent({ biz = defaultBiz, children }: { biz?: Biz; children?: ReactNode }) {
  const t = tOf(biz);
  return (
    <PageShell>
      {children}
      <Hero />
      <TrustStrip biz={biz} />
      <PhotoApproval />

      {/* What we fix */}
      <section aria-labelledby="fix-title" className="theme-dark overflow-hidden py-24 lg:py-32">
        <div className="wrap">
          <Eyebrow>{t("Services")}</Eyebrow>
          <StretchHeading id="fix-title" className="mt-6 text-[clamp(3.6rem,15vw,15rem)]">
            {t("What we fix")}
          </StretchHeading>
          <div className="mt-14">
            <ServiceRows items={localServices(t, services)} />
          </div>
        </div>
      </section>

      {/* X-ray car */}
      <section aria-labelledby="xray-title" className="theme-graphite blueprint relative overflow-hidden py-24 lg:py-32">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{t("Inside your car")}</Eyebrow>
              <h2 id="xray-title" className="t-h2 mt-5 max-w-[16ch]">
                {t("Point at the problem. We'll take it from there.")}
              </h2>
            </div>
            <p className="max-w-sm text-muted">{t("Hover or tap a system to see what it does, what to watch for and what it usually costs.")}</p>
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
              <Eyebrow>{t("Symptom finder")}</Eyebrow>
              <StretchHeading id="noise-title" className="mt-6 text-[clamp(3rem,9vw,9rem)]" from={64} to={100}>
                {t("What's that noise?")}
              </StretchHeading>
            </div>
            <p className="max-w-sm text-muted">
              {t("Pick what your car is doing. You'll get the likely causes in plain English, a typical price and time, and a one-tap booking.")}
            </p>
          </div>
          <div className="mt-14">
            <SymptomFinder />
          </div>
        </div>
      </section>

      <DayInBays />
      <PriceWall biz={biz} />
      <ReviewsMarquee biz={biz} />

      {biz.preview ? (
        <PreviewMap biz={biz} />
      ) : (
        <>
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
        </>
      )}

      <Amenities biz={biz} />

      <section aria-labelledby="faq-title" className="theme-dark border-t border-line py-24 lg:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>{t("FAQ")}</Eyebrow>
            <h2 id="faq-title" className="t-h2 mt-5 max-w-[10ch]">
              {t("Straight answers.")}
            </h2>
            <Link href="/faq" className="t-eyebrow heat-link mt-8 inline-flex items-center gap-2 pb-1 text-muted hover:text-fg">
              {t("All questions")} <ArrowRight />
            </Link>
          </div>
          <FaqList items={localFaqs(t, homeFaqs)} />
        </div>
      </section>

      <CtaBand biz={biz} />
    </PageShell>
  );
}
