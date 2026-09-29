import type { Metadata } from "next";
import { noindex, site } from "./site";

type BuildMetadataInput = {
  /** Page title without the brand suffix (the root template appends it). */
  title: string;
  description: string;
  path: string;
  /** Short label above the title on the generated share image. */
  eyebrow?: string;
  /** Use the title as-is (home page). */
  absoluteTitle?: boolean;
  keywords?: string[];
};

export const ogImageUrl = (title: string, eyebrow?: string) => {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `/api/og?${params.toString()}`;
};

export function buildMetadata({ title, description, path, eyebrow, absoluteTitle, keywords }: BuildMetadataInput): Metadata {
  const og = ogImageUrl(absoluteTitle ? site.tagline : title, eyebrow);
  const fullTitle = absoluteTitle ? title : `${title} | ${site.shortName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [og],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}
