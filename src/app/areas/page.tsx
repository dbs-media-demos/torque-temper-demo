import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { AreaMap } from "@/components/sections/AreaMap";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { areas } from "@/content/areas";
import { buildMetadata } from "@/lib/seo";
import { graph, itemListSchema, webPageSchema } from "@/lib/schema";

const title = "Areas We Serve: East Dallas, Lakewood, Lake Highlands, Garland, Mesquite";
const description = "Auto repair for East Dallas and nearby: Lakewood, Lake Highlands, Garland and Mesquite. Free shuttle within 5 miles, pickup in Garland, loaners for longer repairs.";

export const metadata = buildMetadata({ title, description, path: "/areas", eyebrow: "Service area" });

export default function AreasPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(
          webPageSchema({ path: "/areas", name: title, description, type: "CollectionPage" }),
          itemListSchema(areas.map((a) => ({ name: a.name, path: `/areas/${a.slug}` }))),
        )}
      />
      <PageHero
        crumbs={[{ name: "Areas we serve", path: "/areas" }]}
        eyebrow="Service area"
        title={
          <>
            Your neighborhood mechanic<span className="text-signal">.</span>
          </>
        }
        lead="We're off Garland Road by White Rock Lake, minutes from Lakewood, Lake Highlands, Garland and Mesquite."
        image="/images/dallas-dusk.jpg"
        imageAlt="The Dallas skyline at dusk reflected in the Trinity River"
      />
      <section aria-labelledby="areas-list" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <AreaMap />
          <div>
            <h2 id="areas-list" className="t-h2">
              Drive times
            </h2>
            <Reveal as="ul" stagger={0.08} className="mt-10 grid gap-4">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/areas/${a.slug}`} className="group grid grid-cols-[6rem_1fr_auto] items-center gap-5 border border-line bg-chalk-2/50 p-3 transition-colors hover:border-fg">
                    <span className="relative aspect-square overflow-hidden">
                      <Image src={a.image} alt="" fill sizes="96px" quality={55} className="object-cover" />
                    </span>
                    <span>
                      <span className="t-h3 block">{a.name}</span>
                      <span className="mt-1 block text-sm text-muted">{a.perk}</span>
                    </span>
                    <span className="flex items-center gap-3 pr-2 font-mono text-sm">
                      {a.drive}
                      <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
