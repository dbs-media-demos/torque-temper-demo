import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/sections/PageHero";
import { AreaMap } from "@/components/sections/AreaMap";
import { ContactForm } from "@/components/interactive/ContactForm";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { CallButton, BookButton } from "@/components/ui/Bits";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import { fmtTime } from "@/lib/hours";
import { fullAddress, site, telHref } from "@/lib/site";

const title = "Contact & Directions";
const description = `Call ${site.phoneDisplay}, text or visit us at ${fullAddress}, off Garland Road near White Rock Lake. Open Mon–Fri 7:30–6, Sat 8–2.`;

export const metadata = buildMetadata({ title, description, path: "/contact", eyebrow: "Contact" });

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={graph(webPageSchema({ path: "/contact", name: title, description, type: "ContactPage" }))} />
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="East Dallas · White Rock"
        title={
          <>
            Come by. Or just call<span className="text-signal">.</span>
          </>
        }
        lead="A real service advisor answers the phone. Describe what's going on and we'll tell you honestly whether it can wait."
        image="/images/shop-night.jpg"
        imageAlt="The shop at night with a technician working between two cars"
      >
        <CallButton />
        <BookButton />
      </PageHero>

      <section aria-labelledby="visit-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <div>
              <h2 id="visit-title" className="t-h2">
                Visit
              </h2>
              <address className="mt-6 text-lg not-italic leading-relaxed">
                {site.name}
                <br />
                {fullAddress}
                <br />
                <span className="text-muted">Off Garland Road, two minutes from White Rock Lake.</span>
              </address>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-line">
              {[
                ["Phone", <a key="p" href={telHref} className="heat-link">{site.phoneDisplay}</a>],
                ["Text", <a key="t" href={`sms:${site.sms}`} className="heat-link">{site.phoneDisplay}</a>],
                ["Email", <a key="e" href={`mailto:${site.email}`} className="heat-link break-all">{site.email}</a>],
                ["Status", <OpenBadge key="o" />],
              ].map(([k, v]) => (
                <div key={k as string} className="bg-bg p-5">
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-faint">{k}</dt>
                  <dd className="mt-2">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <p className="t-eyebrow text-faint">Hours</p>
              <table className="mt-4 w-full text-left">
                <caption className="sr-only">Opening hours</caption>
                <tbody>
                  {[...site.hours.slice(1), site.hours[0]].map((h) => (
                    <tr key={h.day} className="border-b border-line">
                      <th scope="row" className="py-3 font-normal text-muted">
                        {h.label}
                      </th>
                      <td className="py-3 text-right font-mono">{h.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-muted">After hours? Use the secure key drop by the office door and text us your name.</p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="theme-chalk p-4 md:p-6">
              <AreaMap />
            </div>
            <div>
              <h2 className="t-h3">Send a message</h2>
              <p className="mt-2 text-muted">We reply within one business hour.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
