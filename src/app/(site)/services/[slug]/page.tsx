import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/Faq";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { BookButton, CallButton } from "@/components/ui/Bits";
import { DoorReveal, Reveal, ScrubWords } from "@/components/ui/Reveal";
import { Check, ArrowUpRight, Clock, Shield } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { services, serviceBySlug } from "@/content/services";
import { reviews } from "@/content/reviews";
import { symptoms } from "@/content/symptoms";
import { buildMetadata } from "@/lib/seo";
import { graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, eyebrow: s.name });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;
  const related = reviews.filter((r) => r.service === s.slug).slice(0, 2);
  const shownReviews = related.length ? related : reviews.slice(0, 2);
  const relatedSymptoms = symptoms.filter((x) => x.service === s.slug);
  const others = services.filter((x) => x.slug !== s.slug);
  const lower = s.word === "AC" ? "AC repair" : s.word.toLowerCase();

  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: s.metaTitle, description: s.metaDescription, image: s.image }),
          serviceSchema({ name: s.name, description: s.metaDescription, path, image: s.image, offers: s.prices }),
        )}
      />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.name, path },
        ]}
        eyebrow={s.eyebrow}
        title={
          <>
            <span className="sr-only">{s.name} in East Dallas: </span>
            {s.headline}
          </>
        }
        lead={s.tagline}
        image={s.image}
        imageAlt={s.imageAlt}
        aside={
          <div className="border border-white/15 bg-asphalt/70 p-6 backdrop-blur-xl">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-chalk/70">From</p>
            <p className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-6xl font-black leading-none [--wdth:72]">{s.priceFrom}</span>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-chalk/70">{s.priceUnit}</span>
            </p>
            <ul className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-chalk/85">
              <li className="flex items-center gap-3">
                <Clock className="text-signal" /> {s.duration}
              </li>
              <li className="flex items-center gap-3">
                <Shield className="text-signal" /> 24 months / 24,000 miles
              </li>
              <li className="flex items-center gap-3">
                <Check className="text-signal" /> Photos and price before any work
              </li>
            </ul>
            <div className="mt-6 grid gap-2">
              <BookButton href={`/book?service=${s.slug}`} className="w-full">
                Book {lower}
              </BookButton>
            </div>
          </div>
        }
      />

      {/* Intro + signs */}
      <section aria-labelledby="signs-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <ScrubWords text={s.intro} className="font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-bold leading-[1.12] [--wdth:92]" />
          <div>
            <h2 id="signs-title" className="t-eyebrow flex items-center gap-3 text-muted">
              <span className="stripe" aria-hidden />
              Signs you need it
            </h2>
            <Reveal as="ul" stagger={0.06} className="mt-6 border-t border-line">
              {s.signs.map((x, i) => (
                <li key={x} className="flex items-baseline gap-5 border-b border-line py-4 text-lg">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  {x}
                </li>
              ))}
            </Reveal>
            {relatedSymptoms.length > 0 && (
              <Link href="/whats-that-noise" className="t-eyebrow heat-link mt-6 inline-flex items-center gap-2 pb-1 text-muted hover:text-fg">
                Try the symptom finder <ArrowUpRight />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Included + imagery */}
      <section aria-labelledby="included-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            {s.gallery.map((g, i) => (
              <DoorReveal key={g.src} className={i === 0 ? "col-span-2 aspect-[16/10]" : "col-span-1 aspect-[4/5]"}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" quality={65} className="object-cover" />
              </DoorReveal>
            ))}
            <div className="col-span-1 flex flex-col justify-end border border-line p-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-signal">{s.spec}</p>
              <p className="mt-3 text-sm text-muted">Every measurement above lands on your phone before we quote.</p>
            </div>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <SectionHead id="included-title" eyebrow="What's included" title="Done properly, every time." />
            <Reveal as="ul" stagger={0.06} className="mt-10 flex flex-col gap-4">
              {s.included.map((x) => (
                <li key={x} className="flex items-start gap-4 border-b border-line pb-4">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center bg-signal text-asphalt">
                    <Check width={16} height={16} />
                  </span>
                  {x}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section aria-labelledby="prices-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead id="prices-title" eyebrow="Upfront prices" title={`${s.word} prices.`} text="Typical ranges for most cars and light trucks. Your exact price arrives with photos before any work." />
          <div>
            <Reveal as="ul" stagger={0.05} className="border-t border-fg">
              {s.prices.map((p) => (
                <li key={p.item} className="flex items-baseline gap-4 border-b border-line py-5">
                  <span className="text-lg">{p.item}</span>
                  <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-line-strong" />
                  <span className="text-right">
                    <span className="block font-mono text-lg">{p.price}</span>
                    {p.note && <span className="block font-mono text-xs uppercase tracking-[0.1em] text-muted">{p.note}</span>}
                  </span>
                </li>
              ))}
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton href={`/book?service=${s.slug}`} />
              <CallButton />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="process-title" eyebrow="How the job runs" title="Five steps. No surprises." />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Reviews + FAQ */}
      <section aria-labelledby="svc-faq" className="theme-graphite py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <p className="t-eyebrow flex items-center gap-3 text-muted">
              <span className="stripe" aria-hidden />
              From customers
            </p>
            <div className="mt-8 grid gap-4">
              {shownReviews.map((r) => (
                <ReviewCard key={r.name} review={r} />
              ))}
            </div>
          </div>
          <div>
            <h2 id="svc-faq" className="t-h2">
              {s.word} FAQ
            </h2>
            <div className="mt-8">
              <FaqList items={s.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section aria-labelledby="more-title" className="theme-dark border-t border-line py-20">
        <div className="wrap">
          <h2 id="more-title" className="t-eyebrow flex items-center gap-3 text-muted">
            <span className="stripe" aria-hidden />
            More services
          </h2>
          <ul className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2">
            {others.map((o) => (
              <li key={o.slug} className="w-64 shrink-0">
                <Link href={`/services/${o.slug}`} className="group block">
                  <span className="relative block aspect-[4/3] overflow-hidden bg-graphite">
                    <Image src={o.image} alt="" fill sizes="256px" quality={55} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="mt-3 flex items-center justify-between">
                    <span className="t-h3 text-lg transition-colors group-hover:text-signal">{o.name}</span>
                    <span className="font-mono text-xs text-muted">{o.priceFrom}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={`Book ${lower}.`} text={`${s.tagline} Same-day appointments most days.`} />
    </PageShell>
  );
}
