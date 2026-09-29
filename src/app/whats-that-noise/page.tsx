import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { SymptomFinder } from "@/components/interactive/SymptomFinder";
import { FaqList } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";

const title = "What's That Noise? Car Symptom Finder";
const description =
  "Grinding brakes, check-engine light, warm AC, pulling, overheating or a strange smell? See likely causes, typical Dallas prices and repair times, then book the diagnosis.";

export const metadata = buildMetadata({ title, description, path: "/whats-that-noise", eyebrow: "Symptom finder" });

const senses = [
  { k: "Hear", items: ["Squeal when braking: pad wear indicators", "Grinding: pads worn through", "Clunk over bumps: sway bar links or bushings", "Whine that rises with speed: wheel bearing or differential"] },
  { k: "See", items: ["Flashing check-engine light: active misfire, stop soon", "Red puddle: transmission or power-steering fluid", "Green or orange puddle: coolant", "Blue smoke: burning oil"] },
  { k: "Smell", items: ["Sweet syrup: coolant leak", "Burnt oil: leak onto the exhaust", "Rotten eggs: catalytic converter", "Musty vents: AC evaporator"] },
  { k: "Feel", items: ["Steering shakes when braking: warped rotors", "Car drifts on straight roads: alignment", "Soft brake pedal: air or fluid leak", "Shudder at 40–50 mph: torque converter"] },
];

const faqs = [
  {
    q: "Is the symptom finder a diagnosis?",
    a: "No. It shows the most common causes we see in our bays for each symptom. A technician confirms the actual cause with tests and photos before any repair.",
  },
  {
    q: "What if my symptom isn't listed?",
    a: "Call or text us and describe it. Our advisors hear dozens of noises a day and can usually tell you whether it's urgent in a two-minute conversation.",
  },
  {
    q: "How much does a diagnosis cost?",
    a: "Visual checks are free. Diagnostics that need test equipment are $129, credited toward the repair if you have us fix it.",
  },
];

export default function NoisePage() {
  return (
    <PageShell>
      <JsonLd data={graph(webPageSchema({ path: "/whats-that-noise", name: title, description }))} />
      <PageHero
        compact
        crumbs={[{ name: "What's that noise?", path: "/whats-that-noise" }]}
        eyebrow="Symptom finder"
        title={
          <>
            What&apos;s that noise<span className="text-signal">?</span>
          </>
        }
        lead="Pick what your car is doing. You'll get the likely causes in plain English, a typical price and time, and a one-tap booking with the symptom already filled in."
      />
      <section aria-label="Symptom finder" className="theme-dark pb-20 pt-4 lg:pb-28">
        <div className="wrap">
          <SymptomFinder headingLevel="h2" />
        </div>
      </section>

      <section aria-labelledby="senses-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap">
          <SectionHead id="senses-title" eyebrow="Field guide" title="Hear it, see it, smell it, feel it." text="A cheat sheet from our technicians. Keep it in mind next time something feels off." />
          <Reveal stagger={0.08} className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {senses.map((s) => (
              <div key={s.k} className="bg-chalk p-6">
                <h3 className="font-display text-5xl font-black uppercase [--wdth:66]">{s.k}</h3>
                <ul className="mt-6 flex flex-col gap-3 text-sm">
                  {s.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <span className="stripe mt-2 !w-3" aria-hidden />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
          <p className="mt-8 text-sm text-muted">
            Not sure? <Link href="/contact" className="heat-link text-fg">Call or text a technician</Link>. It&apos;s free.
          </p>
        </div>
      </section>

      <section aria-labelledby="noise-faq" className="theme-dark py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 id="noise-faq" className="t-h2">
            Good to know
          </h2>
          <FaqList items={faqs} />
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
