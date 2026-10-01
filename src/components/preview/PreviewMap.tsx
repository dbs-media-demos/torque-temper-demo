import { Eyebrow, CallButton } from "@/components/ui/Bits";
import { ArrowRight } from "@/components/ui/Icons";
import { fmtTime } from "@/lib/hours";
import type { Biz } from "@/lib/biz";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * A preview's "where we are": the business's real address on a Google map, its hours and a
 * directions link, in place of the concept shop's stylized East Dallas map.
 */
export function PreviewMap({ biz }: { biz: Biz }) {
  const query = [biz.name, biz.address.full].filter(Boolean).join(", ");
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
  const week = biz.hours ? [...biz.hours.slice(1), biz.hours[0]] : [];

  return (
    <section aria-labelledby="area-title" className="theme-chalk py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <Eyebrow>Where we are</Eyebrow>
          <h2 id="area-title" className="t-h2 mt-5 max-w-[12ch]">
            Minutes from {biz.area} driveways.
          </h2>
          {biz.address.full && <p className="t-lead mt-6 max-w-md text-muted">{biz.address.full}</p>}
          {week.length > 0 && (
            <dl className="mt-10 grid grid-cols-[auto_1fr] gap-x-8 border-t border-line font-mono text-sm uppercase tracking-[0.1em]">
              {week.map((h) => (
                <div key={h.day} className="contents">
                  <dt className="border-b border-line py-3 text-muted">{DAY[h.day]}</dt>
                  <dd className="border-b border-line py-3 text-right">
                    {h.open === "00:00" && h.close === "23:59" ? "Open 24 hours" : h.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed"}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={directions} target="_blank" rel="noopener" className="btn btn-signal group">
              Get directions <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <CallButton />
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-line bg-graphite">
          <iframe
            src={embed}
            title={`Map: ${query}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0 grayscale-[0.35]"
          />
        </div>
      </div>
    </section>
  );
}
