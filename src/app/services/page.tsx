import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { CarDiagram } from "@/components/home/CarDiagram";
import { BookButton, CallButton } from "@/components/ui/Bits";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";
import { graph, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Auto Repair Services in East Dallas";
const description =
  "Brakes, check-engine diagnostics, maintenance, AC, transmission, alignment, tires and Texas inspections. Upfront prices, photos before any work, 24-month warranty.";

export const metadata = buildMetadata({ title, description, path: "/services", eyebrow: "Services" });

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/services", name: title, description, type: "CollectionPage" }),
          itemListSchema(services.map((s) => ({ name: s.name, path: `/services/${s.slug}` }))),
        )}
      />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Eight bays · every make"
        title={
          <>
            Everything your car needs<span className="text-signal">.</span>
          </>
        }
        lead="From a $79 oil change to a transmission rebuild. Every job starts with an inspection, photos and a price you approve."
        image="/images/shop-bay-overhead.jpg"
        imageAlt="Two technicians working on a car in one of the shop's bays"
      >
        <BookButton />
        <CallButton />
      </PageHero>

      <section aria-labelledby="all-services" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <h2 id="all-services" className="sr-only">
            All services
          </h2>
          <Reveal stagger={0.07} className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} data-cursor="Open" className="group relative flex min-h-[30rem] flex-col justify-end overflow-hidden bg-asphalt p-6">
                <Image src={s.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" quality={60} className="object-cover opacity-55 transition-[transform,opacity] duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent" />
                <span className="absolute left-6 top-6 font-mono text-xs text-chalk/70">0{i + 1}</span>
                <span className="absolute right-6 top-6 grid size-11 place-items-center rounded-full border border-white/20 text-chalk transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-asphalt">
                  <ArrowUpRight />
                </span>
                <div className="relative">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-signal">{s.spec}</p>
                  <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[0.95] text-chalk transition-[--wdth] duration-700 [--wdth:82] group-hover:[--wdth:100]">{s.name}</h3>
                  <p className="mt-3 text-sm text-chalk/80">{s.tagline}</p>
                  <p className="mt-5 border-t border-white/15 pt-4 font-mono text-sm text-chalk">
                    from {s.priceFrom} <span className="text-chalk/60">{s.priceUnit}</span>
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="xray-services" className="theme-graphite blueprint py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="xray-services" eyebrow="Not sure what you need?" title="Find it on the car." text="Tap a system to see what it does, what to watch for and where to start." />
          <div className="mt-12">
            <CarDiagram />
          </div>
        </div>
      </section>

      <CtaBand title="Not sure? Ask us." text="Describe the noise, the light or the feeling, and a technician will tell you what it probably is. Free, no appointment needed." />
    </PageShell>
  );
}
