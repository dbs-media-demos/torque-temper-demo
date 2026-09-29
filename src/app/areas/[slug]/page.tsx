import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { AreaMap } from "@/components/sections/AreaMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/Faq";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { BookButton, CallButton } from "@/components/ui/Bits";
import { Reveal, ScrubWords } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { areas, areaBySlug } from "@/content/areas";
import { services } from "@/content/services";
import { reviews } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { graph, serviceSchema, webPageSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) return {};
  return buildMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/areas/${a.slug}`, eyebrow: `Serving ${a.name}` });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (!a) notFound();
  const path = `/areas/${a.slug}`;
  const local = reviews.filter((r) => r.area === a.name);
  const shown = (local.length >= 2 ? local : [...local, ...reviews.filter((r) => r.area !== a.name)]).slice(0, 3);

  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: a.metaTitle, description: a.metaDescription, image: a.image }),
          serviceSchema({
            name: `Auto repair in ${a.name}`,
            description: a.metaDescription,
            path,
            image: a.image,
            offers: services.map((s) => ({ item: s.name, price: s.priceFrom })),
            areas: [a.name],
          }),
        )}
      />
      <PageHero
        crumbs={[
          { name: "Areas we serve", path: "/areas" },
          { name: a.name, path },
        ]}
        eyebrow={`${a.name} · ${a.drive} away · ZIP ${a.zips.join(", ")}`}
        title={a.heading}
        lead={a.intro}
        image={a.image}
        imageAlt={a.imageAlt}
      >
        <BookButton />
        <CallButton />
      </PageHero>

      <section aria-labelledby="local-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="t-eyebrow flex items-center gap-3 text-muted">
              <span className="stripe" aria-hidden />
              Driving in {a.name}
            </p>
            <h2 id="local-title" className="sr-only">
              Auto repair for {a.name} drivers
            </h2>
            <ScrubWords text={a.local} className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-bold leading-[1.15] [--wdth:92]" />
            <dl className="mt-10 grid grid-cols-3 gap-px bg-line">
              {[
                ["Drive", a.drive],
                ["Distance", `${a.miles} mi`],
                ["Via", a.roads[0]],
              ].map(([k, v]) => (
                <div key={k} className="bg-chalk p-4">
                  <dt className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-faint">{k}</dt>
                  <dd className="mt-2 font-display text-2xl font-extrabold [--wdth:80]">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex items-center gap-3 text-sm">
              <span className="stripe" aria-hidden />
              {a.perk}
            </p>
            <p className="mt-3 text-sm text-muted">Roads we see every day: {a.roads.join(", ")}.</p>
          </div>
          <AreaMap highlight={a.slug} />
        </div>
      </section>

      <section aria-labelledby="area-services" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="area-services" eyebrow={`For ${a.name} drivers`} title="Everything, under one roof." />
          <Reveal as="ul" stagger={0.05} className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug} className="bg-bg">
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-surface">
                  <span className="flex items-start justify-between">
                    <span className="t-h3 text-xl">{s.name}</span>
                    <ArrowUpRight className="text-faint transition-colors group-hover:text-signal" />
                  </span>
                  <span className="font-mono text-sm text-muted">from {s.priceFrom}</span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="area-reviews" className="theme-graphite py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="area-reviews" eyebrow="Neighbors" title={`What ${a.name} says.`} />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {shown.map((r) => (
              <ReviewCard key={r.name} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="area-faq" className="theme-dark py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="area-faq" className="t-h2">
            {a.name} FAQ
          </h2>
          <FaqList items={a.faqs} />
        </div>
      </section>

      <nav aria-label="Other areas" className="theme-dark border-t border-line">
        <ul className="wrap grid grid-cols-2 md:grid-cols-4">
          {areas.map((o) => (
            <li key={o.slug}>
              <Link href={`/areas/${o.slug}`} aria-current={o.slug === a.slug ? "page" : undefined} className={o.slug === a.slug ? "block py-6 text-signal" : "block py-6 text-muted hover:text-fg"}>
                <span className="t-h3 text-lg">{o.name}</span>
                <span className="mt-1 block font-mono text-xs">{o.drive}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <CtaBand title={`${a.name}? We're close.`} />
    </PageShell>
  );
}
