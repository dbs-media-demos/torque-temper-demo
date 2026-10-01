import Link from "next/link";
import { reviews } from "@/content/reviews";
import { ReviewCard } from "@/components/sections/ReviewCard";
import { Eyebrow, Stars } from "@/components/ui/Bits";
import { Google, ArrowRight } from "@/components/ui/Icons";
import { defaultBiz, scrub, type Biz } from "@/lib/biz";
import { num, tOf } from "@/lib/i18n";
import { localReviews } from "@/i18n/content";

/** Google-style rating header + two counter-scrolling rows of review cards (pause on hover). */
export function ReviewsMarquee({ biz = defaultBiz }: { biz?: Biz }) {
  // A preview's cards are samples: the brand and staff names in them come out
  const t = tOf(biz);
  const all = localReviews(t, reviews).map((r) => ({ ...r, text: scrub(r.text, biz), area: biz.preview ? biz.area : r.area }));
  const rowA = all.slice(0, 6);
  const rowB = all.slice(6);
  return (
    <section aria-labelledby="reviews-title" className="theme-graphite overflow-hidden py-24 lg:py-32">
      <div className="wrap grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Eyebrow>{t("Reviews")}</Eyebrow>
          <h2 id="reviews-title" className="t-h2 mt-5 max-w-[14ch]">
            {biz.preview ? t("{city} drivers say it better than we can.", { city: biz.address.city || biz.area }) : "Dallas drivers say it better than we can."}
          </h2>
        </div>
        {biz.rating && (
        <div className="flex items-center gap-5">
          <Google width={40} height={40} />
          <div>
            <p className="flex items-center gap-3">
              <span className="font-display text-6xl font-extrabold leading-none [--wdth:80]">{num(biz, biz.rating.value)}</span>
              <Stars value={biz.rating.value} />
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">{t("{count} reviews on Google", { count: biz.rating.count })}</p>
          </div>
        </div>
        )}
      </div>
      {biz.preview && (
        <p className="wrap mt-6 max-w-2xl text-sm text-muted">
          {t("Sample reviews. On your live site this shows your latest Google reviews, updated automatically.")}
        </p>
      )}

      <div className="mt-14 flex flex-col gap-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {[rowA, rowB].map((row, r) => (
          <div key={r} className="flex w-max gap-4 hover:[animation-play-state:paused]" style={{ animation: `marquee ${r ? 70 : 60}s linear infinite ${r ? "reverse" : ""}` }}>
            {[...row, ...row].map((rev, i) => (
              <div key={i} aria-hidden={i >= row.length || undefined} className="flex w-[min(84vw,24rem)] shrink-0">
                <ReviewCard review={rev} className="w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="wrap mt-12">
        <Link href="/reviews" className="t-eyebrow heat-link inline-flex items-center gap-2 pb-1">
          {t("Read all reviews")} <ArrowRight />
        </Link>
      </div>
    </section>
  );
}
