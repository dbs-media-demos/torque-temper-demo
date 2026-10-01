import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { footerNav } from "./nav";
import { DAY_NAMES, fmtTime } from "@/lib/hours";
import { site } from "@/lib/site";
import { defaultBiz, telOf, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";

export function Footer({ biz = defaultBiz }: { biz?: Biz }) {
  const telHref = telOf(biz);
  const t = tOf(biz);
  const f = (time: string) => fmtTime(time, biz.lang);
  return (
    <footer className="theme-dark relative overflow-hidden border-t border-line pb-28 md:pb-10">
      <div className="wrap grid gap-12 pt-20 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <LogoMark className="size-14 text-chalk" />
          <p className="max-w-sm text-lg leading-snug text-fg">
            {biz.preview ? t("{name}: auto repair in {area}.", { name: biz.name, area: biz.area }) : `Family-owned auto repair in East Dallas since ${site.founded}.`}{" "}
            {t("Photos before any work, prices that match the invoice.")}
          </p>
          <address className="not-italic text-muted">
            {biz.address.full}
            {biz.phone && (
              <>
                <br />
                <a href={telHref} className="heat-link text-fg">
                  {biz.phoneDisplay}
                </a>
              </>
            )}
            {!biz.preview && (
              <>
                <br />
                <a href={`mailto:${site.email}`} className="heat-link">
                  {site.email}
                </a>
              </>
            )}
          </address>
          <OpenBadge className="text-muted" />
        </div>

        <div>
          <p className="t-eyebrow text-faint">{t("Services")}</p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="heat-link text-muted transition-colors hover:text-fg">
                  {t(s.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <p className="t-eyebrow text-faint">{t(col.title)}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="heat-link text-muted transition-colors hover:text-fg">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
            {col.title === "Help" && !biz.preview && (
              <>
                <p className="t-eyebrow mt-10 text-faint">Areas we serve</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {areas.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/areas/${a.slug}`} className="heat-link text-muted transition-colors hover:text-fg">
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="wrap mt-16 grid gap-6 border-t border-line pt-8 md:grid-cols-3">
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-muted md:col-span-2 md:grid-cols-[auto_1fr_auto_1fr]">
          {(biz.hours ?? [])
            .slice(1)
            .concat(biz.hours ? biz.hours[0] : [])
            .map((h) => (
              <div key={h.day} className="contents">
                <dt className="text-faint">{DAY_NAMES[biz.lang][h.day].slice(0, 3)}</dt>
                <dd>{h.open && h.close ? `${f(h.open)} – ${f(h.close)}` : t("Closed")}</dd>
              </div>
            ))}
        </dl>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted md:text-right">
          {t("24-month / 24,000-mile warranty")}
          <br />
          {t("ASE-certified technicians")}
        </p>
      </div>

      {/* Decorative wordmark as SVG text: stretched edge to edge, ignored by contrast checks. */}
      <svg aria-hidden viewBox="0 0 1000 150" className="wrap mt-16 block w-full text-graphite-2">
        <text
          x="0"
          y="128"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          className="font-display fill-current font-black uppercase [--wdth:62]"
          style={{ fontSize: 160 }}
        >
          {biz.preview ? biz.shortName : "Torque&Temper"}
        </text>
      </svg>

      <div className="wrap mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm text-faint md:flex-row md:items-center md:justify-between">
        <p>
          {biz.preview
            ? `© ${new Date().getFullYear()} ${biz.name}. ${t("A preview homepage made for {name}.", { name: biz.name })}`
            : `© ${new Date().getFullYear()} ${site.name}. A concept site: the business is fictional.`}
        </p>
        <p>
          {t("Design & development:")}{" "}
          <a href={site.agencyUrl} className="heat-link text-muted hover:text-fg">
            {site.agencyName}
          </a>
        </p>
      </div>
    </footer>
  );
}
