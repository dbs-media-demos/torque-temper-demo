import Image from "next/image";
import type { ReactNode } from "react";
import clsx from "clsx";
import { Breadcrumbs, type Crumb } from "@/components/ui/Bits";

/**
 * Inner-page hero: photo behind a dark grade, breadcrumb trail, CSS-only intro (LCP safe).
 * The image slowly settles from a slight zoom; the headline condenses into place.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
  aside,
  compact,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={clsx("theme-dark relative overflow-hidden", compact ? "pt-[calc(var(--header-h)+3rem)]" : "flex min-h-[78svh] items-end pt-[calc(var(--header-h)+3rem)]")}>
      {image && (
        <>
          <div className="absolute inset-0 [animation:hero-zoom_2.4s_var(--ease-out-expo)_both]">
            <Image src={image} alt={imageAlt ?? ""} fill loading="eager" fetchPriority="high" sizes="100vw" quality={70} className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-asphalt/80 via-asphalt/20 to-transparent" />
        </>
      )}
      <div className="wrap relative w-full pb-14 md:pb-20">
        <Breadcrumbs items={crumbs} className="anim-fade" />
        <div className={clsx("mt-10 grid gap-10", aside && "lg:grid-cols-[1fr_24rem] lg:items-end")}>
          <div>
            <p className="t-eyebrow anim-fade flex items-center gap-3 text-chalk/80" style={{ ["--d" as string]: "0.05s" }}>
              <span className="stripe" aria-hidden />
              {eyebrow}
            </p>
            <h1 className="t-h1 anim-wdth mt-6 max-w-[16ch] text-chalk">{title}</h1>
            {lead && (
              <p className="t-lead anim-fade mt-7 max-w-2xl text-chalk/85" style={{ ["--d" as string]: "0.25s" }}>
                {lead}
              </p>
            )}
            {children && (
              <div className="anim-fade mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "0.4s" }}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="anim-fade" style={{ ["--d" as string]: "0.5s" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Standard section heading block. */
export function SectionHead({ eyebrow, title, id, text, className }: { eyebrow: string; title: ReactNode; id?: string; text?: ReactNode; className?: string }) {
  return (
    <div className={clsx("flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <p className="t-eyebrow flex items-center gap-3 text-muted">
          <span className="stripe" aria-hidden />
          {eyebrow}
        </p>
        <h2 id={id} className="t-h2 mt-5 max-w-[16ch]">
          {title}
        </h2>
      </div>
      {text && <div className="max-w-md text-muted">{text}</div>}
    </div>
  );
}
