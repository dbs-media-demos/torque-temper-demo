import { Odometer } from "@/components/ui/Odometer";
import { makes } from "@/content/general";
import { site } from "@/lib/site";
import { defaultBiz, openDays, type Biz } from "@/lib/biz";
import { num, tOf, type T } from "@/lib/i18n";

const warranty = (t: T) => ({ value: "24", unit: t("months"), label: t("or 24,000 miles warranty, parts and labor") });

const conceptStats = [
  warranty((x) => x),
  { value: String(2026 - site.founded), unit: "years", label: "fixing cars off Garland Road" },
  { value: site.carsServiced.toLocaleString("en-US"), unit: "cars", label: "serviced and road-tested" },
  { value: String(site.rating.value), unit: "stars", label: `average from ${site.rating.count} Google reviews` },
];

/** A preview only states what's true of the real business (its Google rating and hours). */
function previewStats(biz: Biz, t: T) {
  const days = openDays(biz);
  return [
    ...(biz.rating
      ? [
          { value: num(biz, biz.rating.value), unit: t("stars"), label: t("average rating on Google") },
          { value: String(biz.rating.count), unit: t("reviews"), label: t("from drivers in {area}", { area: biz.area }) },
        ]
      : []),
    ...(days ? [{ value: String(days), unit: t("days"), label: t("a week, open for walk-ins and bookings") }] : []),
    { value: "60", unit: t("seconds"), label: t("to book a repair online, day or night") },
    warranty(t),
  ].slice(0, 4);
}

/** Makes Serbian drivers actually own */
const makesSr = ["Škoda", "Volkswagen", "Opel", "Fiat", "Renault", "Peugeot", "Toyota", "Ford", "Dacia", "Citroën", "Hyundai", "Kia", "Audi", "BMW", "Mercedes-Benz", "Mazda", "Seat", "Suzuki", "Nissan", "Honda"];

/** Warranty + proof counters rolling like odometer digits, then a marquee of makes we service. */
export function TrustStrip({ biz = defaultBiz }: { biz?: Biz }) {
  const t = tOf(biz);
  const stats = biz.preview ? previewStats(biz, t) : conceptStats;
  const list = biz.lang === "sr" ? makesSr : makes;
  return (
    <section aria-label={t("Warranty and track record")} className="theme-dark border-y border-line">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.unit} className="flex flex-col gap-3 border-line py-10 pr-4 odd:border-r lg:border-r lg:py-14 lg:pl-8 lg:first:pl-0 lg:last:border-r-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 max-lg:[&:nth-child(even)]:pl-5">
            <p className="flex items-baseline gap-2">
              <Odometer value={s.value} delay={i * 0.12} className="font-display text-[clamp(3rem,6vw,5.5rem)] font-extrabold leading-none [--wdth:70]" />
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-signal">{s.unit}</span>
            </p>
            <p className="max-w-[16rem] text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden border-t border-line py-5" aria-label={t("Makes we service")}>
        <div className="flex w-max animate-[marquee_48s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
          {[...list, ...list].map((m, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-xl font-bold uppercase text-faint [--wdth:110]" aria-hidden={i >= list.length}>
              {m}
              <span className="size-1.5 rotate-45 bg-signal/70" aria-hidden />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
