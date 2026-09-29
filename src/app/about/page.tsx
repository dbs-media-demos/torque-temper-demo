import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { DoorReveal, Parallax, Reveal, ScrubWords } from "@/components/ui/Reveal";
import { Odometer } from "@/components/ui/Odometer";
import { JsonLd } from "@/components/seo/JsonLd";
import { certifications, team, timeline } from "@/content/general";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = "About Us: Family-Owned Since 2009";
const description =
  "Torque & Temper is a family-owned, ASE-certified auto repair shop in East Dallas. Founded in 2009 by Ray Castillo on one promise: photos before any work.";

export const metadata = buildMetadata({ title, description, path: "/about", eyebrow: "About the shop" });

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/about", name: title, description, type: "AboutPage", image: "/images/team-ray.jpg" }),
          ...team.map((t) => ({ "@type": "Person", name: t.name, jobTitle: t.role, worksFor: { "@id": `${site.url}/#business` } })),
        )}
      />
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow={`East Dallas · since ${site.founded}`}
        title={
          <>
            Started with two bays and one promise<span className="text-signal">.</span>
          </>
        }
        lead="Ray Castillo opened the shop after twenty years of watching customers pay for work they never saw. His fix was simple: show them."
        image="/images/shop-clean.jpg"
        imageAlt="Two cars parked inside the shop under industrial lights"
      />

      <section aria-labelledby="story-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="t-eyebrow flex items-center gap-3 text-muted">
              <span className="stripe" aria-hidden />
              Our story
            </p>
            <h2 id="story-title" className="sr-only">
              Our story
            </h2>
            <ScrubWords
              className="mt-6 font-display text-[clamp(1.6rem,2.8vw,2.7rem)] font-bold leading-[1.12] [--wdth:90]"
              text="The name comes from the trade. Torque is doing the job to spec, every bolt, every time. Temper is what happens to steel under heat: it gets harder and it holds its shape. That's the shop we wanted to build."
              highlight={["Torque", "Temper"]}
            />
            <div className="mt-10 grid max-w-xl gap-5 leading-relaxed text-muted">
              <p>
                Ray started as an apprentice at a dealership on Northwest Highway in 1995. He got good fast, made master tech by thirty and spent the next decade
                watching service writers sell people work that could have waited. In 2009 he borrowed a lift, rented two bays off Garland Road and started texting
                customers photos of their cars from a flip phone.
              </p>
              <p>
                Word got around East Dallas. Eight bays, eleven people and more than {site.carsServiced.toLocaleString("en-US")} cars later, the promise hasn&apos;t
                changed: you see what we see, you approve what you want, and the invoice matches the quote.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 self-start">
            <DoorReveal className="col-span-2 aspect-[16/10]">
              <Parallax className="absolute inset-0" amount={10} reveal={false}>
                <div className="absolute inset-0">
                  <Image src="/images/tool-wall-warm.jpg" alt="The tool wall above a workbench in the shop" fill sizes="(min-width: 1024px) 45vw, 100vw" quality={65} className="object-cover" />
                </div>
              </Parallax>
            </DoorReveal>
            <DoorReveal className="aspect-[4/5]">
              <Image src="/images/hands-engine.jpg" alt="A technician tightening a bolt with a wrench" fill sizes="(min-width: 1024px) 22vw, 50vw" quality={60} className="object-cover" />
            </DoorReveal>
            <div className="flex flex-col justify-end border border-line p-5">
              <p className="font-display text-6xl font-black leading-none [--wdth:66]">
                <Odometer value={String(site.bays)} />
              </p>
              <p className="mt-2 text-sm text-muted">bays, one alignment rack and a lounge with a window into the shop.</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="team-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="team-title" eyebrow="The crew" title="The people who text you." text="Eleven people total. These are the four you'll hear from most." />
          <Reveal stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <figure key={t.name} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <Image src={t.image} alt={`${t.name}, ${t.role}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" quality={65} className="object-cover grayscale transition-[filter,transform] duration-1000 group-hover:scale-105 group-hover:grayscale-0" />
                  <span className="absolute bottom-3 left-3 bg-asphalt/85 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-chalk">{t.certs}</span>
                </div>
                <figcaption className="mt-5">
                  <p className="t-h3">{t.name}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-signal">{t.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{t.bio}</p>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="theme-graphite py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead id="timeline-title" eyebrow="Timeline" title="Seventeen years on Anvil Row." />
          <Reveal as="ol" stagger={0.08} className="border-l border-line-strong">
            {timeline.map((t) => (
              <li key={t.year} className="relative grid gap-2 pb-10 pl-8 last:pb-0 sm:grid-cols-[7rem_1fr]">
                <span className="absolute -left-[5px] top-2 size-2.5 rotate-45 bg-signal" aria-hidden />
                <span className="font-display text-3xl font-black leading-none [--wdth:72]">{t.year}</span>
                <span className="leading-relaxed text-muted">{t.text}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="certs-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="certs-title" eyebrow="Credentials" title="Certified, insured, on the record." />
          <Reveal stagger={0.06} className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <div key={c.name} className="flex items-start gap-5 bg-chalk p-6">
                <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden>
                  <polygon points="20,2 36,11 36,29 20,38 4,29 4,11" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="m13 20 5 5 9-10" fill="none" stroke="#a8340a" strokeWidth="2.5" />
                </svg>
                <div>
                  <p className="t-h3 text-xl">{c.name}</p>
                  <p className="mt-1 text-sm text-muted">{c.detail}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="how-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="how-title" eyebrow="How every job runs" title="Five steps. Every car." />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>
      <CtaBand title="Meet us in person." text="Stop by for a coffee and a free visual check. We're off Garland Road, two minutes from White Rock Lake." />
    </PageShell>
  );
}
