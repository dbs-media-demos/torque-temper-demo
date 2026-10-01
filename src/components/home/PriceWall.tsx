import Link from "next/link";
import { Eyebrow } from "@/components/ui/Bits";
import { Odometer } from "@/components/ui/Odometer";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { defaultBiz, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";

const popular = [
  { job: "Full-synthetic oil change", price: "$79", slug: "oil-maintenance" },
  { job: "Brake pads, per axle", price: "from $189", slug: "brakes" },
  { job: "Check-engine diagnosis", price: "$129*", slug: "check-engine-diagnostics" },
  { job: "Four-wheel alignment", price: "$119", slug: "suspension-alignment" },
  { job: "AC recharge (R-134a)", price: "from $179", slug: "ac-repair" },
  { job: "Transmission fluid service", price: "from $189", slug: "transmission" },
  { job: "Mount & balance", price: "$25 / tire", slug: "tires" },
  { job: "Dallas County emissions test", price: "$18.50", slug: "texas-state-inspection" },
];

/** Transparent pricing: the price board from the shop wall, plus the 24/24 warranty seal. */
export function PriceWall({ biz = defaultBiz }: { biz?: Biz }) {
  const t = tOf(biz);
  return (
    <section aria-labelledby="prices-title" className="theme-chalk py-24 lg:py-32">
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
        <div className="flex flex-col">
          <Eyebrow>{t("Upfront prices")}</Eyebrow>
          <h2 id="prices-title" className="t-h2 mt-5 max-w-[12ch]">
            {t("The price on the wall is the price you pay.")}
          </h2>
          <p className="t-lead mt-8 max-w-lg text-muted">
            {t("Prices for the jobs we do every day, posted where you can see them. Anything bigger gets a written quote with photos before we start.")}
          </p>

          {/* Warranty seal */}
          <div className="relative mt-14 grid size-64 place-items-center self-start rounded-full md:size-72">
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-[spin_40s_linear_infinite]" aria-hidden>
              <defs>
                <path id="seal" d="M100 100 m-82 0 a82 82 0 1 1 164 0 a82 82 0 1 1 -164 0" />
                <linearGradient id="heat" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#d9b25f" />
                  <stop offset=".35" stopColor="#b46a3c" />
                  <stop offset=".68" stopColor="#6b4c8a" />
                  <stop offset="1" stopColor="#2f5d9b" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="url(#heat)" strokeWidth="2.5" />
              <text className="fill-current font-mono text-[10.5px] uppercase tracking-[0.3em]">
                <textPath href="#seal">{t("Parts and labor · nationwide · 24 months · 24,000 miles · ")}</textPath>
              </text>
            </svg>
            <div className="text-center">
              <p className="flex items-baseline justify-center font-display text-7xl font-black leading-none [--wdth:70]">
                <Odometer value="24" />
                <span className="text-signal">/</span>
                <Odometer value="24" delay={0.2} />
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">{t("Warranty")}</p>
            </div>
          </div>
        </div>

        <div>
          <Reveal stagger={0.05} as="ul" className="border-t border-fg">
            {popular.map((p) => (
              <li key={p.job} className="border-b border-line">
                <Link href={`/services/${p.slug}`} className="group flex items-baseline gap-4 py-5">
                  <span className="text-lg transition-colors group-hover:text-signal">{t(p.job)}</span>
                  <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-line-strong" />
                  <span className="font-mono text-lg">{t(p.price)}</span>
                  <ArrowUpRight className="self-center text-faint transition-colors group-hover:text-signal" />
                </Link>
              </li>
            ))}
          </Reveal>
          <p className="mt-6 text-sm text-muted">
            {t("*Diagnosis credited toward the repair. Prices for most cars and light trucks; European and heavy-duty vehicles may vary. Financing: 0% for 6 months on repairs over $500, with approved credit.")}
          </p>
        </div>
      </div>
    </section>
  );
}
