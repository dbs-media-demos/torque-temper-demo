import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { Star } from "./Icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/schema";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={clsx("t-eyebrow flex items-center gap-3 text-muted", className)}>
      <span className="stripe" aria-hidden />
      {children}
    </p>
  );
}

export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <span className={clsx("inline-flex gap-0.5 text-signal", className)} aria-label={`${value} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < Math.round(value)} />
      ))}
    </span>
  );
}

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail + BreadcrumbList JSON-LD. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={clsx("t-eyebrow text-muted", className)}>
      <JsonLd data={graph(breadcrumbSchema(all))} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < all.length - 1 ? (
              <>
                <Link href={c.path} className="heat-link transition-colors hover:text-fg">
                  {c.name}
                </Link>
                <span aria-hidden className="text-faint">/</span>
              </>
            ) : (
              <span aria-current="page" className="text-fg">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Client: its default label follows the page's language on previews
export { BookButton } from "./BookButton";

// Client: shows the previewed business's number on /for/<token>
export { CallButton } from "./CallButton";

/** Spec callout: mono label with a leader line, like a technical drawing annotation. */
export function Callout({ children, className, dir = "right" }: { children: ReactNode; className?: string; dir?: "left" | "right" }) {
  return (
    <span className={clsx("inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]", dir === "left" && "flex-row-reverse", className)}>
      <span className="size-1.5 rounded-full bg-signal" aria-hidden />
      <span className="anim-grow h-px w-10 bg-current opacity-60" aria-hidden />
      <span>{children}</span>
    </span>
  );
}
