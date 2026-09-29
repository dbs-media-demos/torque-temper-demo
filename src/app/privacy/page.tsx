import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Torque & Temper Auto Works collects, uses and protects your information.",
  path: "/privacy",
  eyebrow: "Privacy",
});

const sections = [
  {
    h: "What we collect",
    p: [
      "When you book or contact us, we collect your name, phone number, email address, vehicle details and anything you tell us about the problem.",
      "When you visit, we may collect basic analytics such as pages viewed and device type. We don't use advertising trackers on this site.",
    ],
  },
  {
    h: "How we use it",
    p: [
      "To schedule and perform service on your vehicle, text you photos and estimates, send reminders you've asked for, and keep a service history for warranty purposes.",
      "We never sell or rent your information. Text messages are only sent about your vehicle; reply STOP at any time to opt out.",
    ],
  },
  {
    h: "Who we share it with",
    p: [
      "Only service providers who help us run the shop (our shop-management software, payment processor and texting provider), under agreements that protect your data, and when the law requires it.",
    ],
  },
  {
    h: "How long we keep it",
    p: ["Service records are kept for seven years to support warranties and vehicle history. You can ask us to delete other information at any time."],
  },
  {
    h: "Your choices",
    p: [`Email ${site.email} or call ${site.phoneDisplay} to see, correct or delete your information.`],
  },
  {
    h: "About this site",
    p: [
      "Torque & Temper Auto Works is a fictional business on a concept website designed and built by DBS Media. Forms on this site validate your input but do not send or store anything.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHero compact crumbs={[{ name: "Privacy", path: "/privacy" }]} eyebrow="Updated September 2026" title="Privacy policy" />
      <section aria-label="Privacy policy" className="theme-dark pb-24 pt-8">
        <div className="wrap max-w-3xl">
          {sections.map((s) => (
            <div key={s.h} className="border-t border-line py-8">
              <h2 className="t-h3">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
