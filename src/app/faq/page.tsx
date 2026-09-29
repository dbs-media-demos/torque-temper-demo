import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqList } from "@/components/sections/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/content/general";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, graph, webPageSchema } from "@/lib/schema";

const title = "Auto Repair FAQ: Pricing, Warranty, Appointments";
const description = "Answers about approvals, estimates, our 24-month warranty, parts, financing, loaners and appointments at Torque & Temper in East Dallas.";

export const metadata = buildMetadata({ title, description, path: "/faq", eyebrow: "FAQ" });

export default function FaqPage() {
  const all = generalFaqs.flatMap((g) => g.items);
  return (
    <PageShell>
      <JsonLd data={graph(webPageSchema({ path: "/faq", name: title, description }), faqSchema(all))} />
      <PageHero
        compact
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="Straight answers"
        title={
          <>
            Questions, answered plainly<span className="text-signal">.</span>
          </>
        }
        lead="If yours isn't here, call or text. A person answers."
      />
      <section aria-label="Frequently asked questions" className="theme-dark pb-24 pt-8 lg:pb-32">
        <div className="wrap flex flex-col gap-16">
          {generalFaqs.map((g) => (
            <div key={g.group} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <h2 className="t-h3 text-3xl">{g.group}</h2>
              <FaqList items={g.items} schema={false} />
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
