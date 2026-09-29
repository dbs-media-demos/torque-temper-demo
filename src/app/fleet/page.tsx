import Image from "next/image";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/Faq";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { ContactForm } from "@/components/interactive/ContactForm";
import { CallButton } from "@/components/ui/Bits";
import { DoorReveal, Reveal } from "@/components/ui/Reveal";
import { Odometer } from "@/components/ui/Odometer";
import { JsonLd } from "@/components/seo/JsonLd";
import { reviews } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { graph, serviceSchema, webPageSchema } from "@/lib/schema";

const title = "Fleet & Business Accounts in Dallas";
const description =
  "Fleet maintenance for Dallas contractors and small businesses: priority bays, pickup and drop-off, one monthly invoice, net-30 terms and photos before any work.";

export const metadata = buildMetadata({ title, description, path: "/fleet", eyebrow: "Fleet accounts" });

const perks = [
  { t: "Priority bays", d: "Fleet vehicles jump the queue. Most maintenance is done the same day." },
  { t: "Pickup and drop-off", d: "We collect vans from your yard and bring them back, anywhere in East Dallas, Garland and Mesquite." },
  { t: "One monthly invoice", d: "Net-30 terms, PO numbers on every line and a spend report per vehicle." },
  { t: "Approval rules", d: "Set a limit per vehicle. Anything under it gets done; anything over it gets a call with photos." },
  { t: "Maintenance schedules", d: "We track mileage and service history, and tell you what's due before it becomes downtime." },
  { t: "Same warranty", d: "24 months / 24,000 miles on parts and labor, honored nationwide if a van breaks down out of town." },
];

const faqs = [
  { q: "How many vehicles do I need for a fleet account?", a: "Three or more. We work with plumbers, electricians, landscapers, caterers and delivery companies running anything from pickups to Sprinter vans." },
  { q: "Do you service diesel vans?", a: "Yes, light-duty diesels like Transits, Sprinters and ProMasters, plus gas trucks up to one-ton. We don't work on semis." },
  { q: "Can drivers drop off after hours?", a: "Yes. The secure key drop is available 24/7, and we text the fleet manager once each vehicle is checked in." },
];

export default function FleetPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/fleet", name: title, description, image: "/images/fleet-vans.jpg" }),
          serviceSchema({
            name: "Fleet maintenance",
            description,
            path: "/fleet",
            image: "/images/fleet-vans.jpg",
            offers: [
              { item: "Fleet preventive maintenance", price: "Quoted" },
              { item: "Fleet pickup and drop-off", price: "Free" },
            ],
          }),
        )}
      />
      <PageHero
        crumbs={[{ name: "Fleet accounts", path: "/fleet" }]}
        eyebrow="For contractors and small businesses"
        title={
          <>
            Vans back on the road by lunch<span className="text-signal">.</span>
          </>
        }
        lead="Downtime costs you jobs. Our fleet accounts get priority bays, pickup and drop-off, and one monthly invoice with photos for every line."
        image="/images/fleet-vans.jpg"
        imageAlt="A row of white work vans parked in a lot"
      >
        <a href="#fleet-form" className="btn btn-signal">
          Open an account
        </a>
        <CallButton />
      </PageHero>

      <section aria-labelledby="fleet-stats" className="theme-dark border-b border-line">
        <h2 id="fleet-stats" className="sr-only">
          Fleet numbers
        </h2>
        <div className="wrap grid grid-cols-3">
          {[
            ["41", "active fleet accounts"],
            ["50", "% less downtime, on average"],
            ["30", "day payment terms"],
          ].map(([v, l]) => (
            <div key={l} className="border-r border-line py-10 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4 md:[&:not(:first-child)]:pl-8">
              <Odometer value={v} className="font-display text-[clamp(2.6rem,6vw,5rem)] font-black leading-none [--wdth:70]" />
              <p className="mt-2 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="perks-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead id="perks-title" eyebrow="What you get" title="Built around your schedule, not ours." />
            <DoorReveal className="mt-12 aspect-[16/11]">
              <Image src="/images/lift-underside.jpg" alt="A work vehicle raised on a lift for inspection" fill sizes="(min-width: 1024px) 45vw, 100vw" quality={65} className="object-cover" />
            </DoorReveal>
          </div>
          <Reveal as="ul" stagger={0.06} className="grid gap-px self-start bg-line sm:grid-cols-2">
            {perks.map((p, i) => (
              <li key={p.t} className="bg-chalk p-6">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <p className="t-h3 mt-4 text-xl">{p.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="fleet-form-title" id="fleet-form" className="theme-dark scroll-mt-24 py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead id="fleet-form-title" eyebrow="Open an account" title="Tell us about your fleet." />
            <div className="mt-10">
              <ReviewCard review={reviews.find((r) => r.service === "fleet")!} />
            </div>
          </div>
          <ContactForm topics={["Fleet account", "Quote request", "Something else"]} defaultTopic="Fleet account" />
        </div>
      </section>

      <section aria-labelledby="fleet-faq" className="theme-graphite py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="fleet-faq" className="t-h2">
            Fleet FAQ
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBand title="Downtime is expensive." text="Call and we'll set up your account the same day." image="/images/shop-night.jpg" />
    </PageShell>
  );
}
