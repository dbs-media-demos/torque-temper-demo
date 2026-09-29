import clsx from "clsx";
import type { Review } from "@/content/reviews";
import { Stars } from "@/components/ui/Bits";
import { Google } from "@/components/ui/Icons";

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  const initials = review.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <figure className={clsx("flex flex-col gap-5 border border-line bg-surface p-6", className)}>
      <div className="flex items-center justify-between">
        <Stars value={review.rating} />
        <Google width={16} height={16} />
      </div>
      <blockquote className="flex-1 leading-relaxed">&ldquo;{review.text}&rdquo;</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-line pt-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-2 font-mono text-xs">{initials}</span>
        <span className="flex flex-col text-sm leading-tight">
          <span className="font-medium">{review.name}</span>
          <span className="text-muted">
            {review.car} · {review.area}
          </span>
        </span>
        <span className="ml-auto font-mono text-[0.66rem] uppercase tracking-[0.1em] text-faint">{review.date}</span>
      </figcaption>
    </figure>
  );
}
