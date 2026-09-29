import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { services } from "@/content/services";
import { areas } from "@/content/areas";

// Bump when page content changes meaningfully.
const UPDATED = new Date("2026-09-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/services", 0.9],
    ["/book", 0.9],
    ["/whats-that-noise", 0.8],
    ["/specials", 0.8],
    ["/reviews", 0.7],
    ["/about", 0.7],
    ["/fleet", 0.7],
    ["/gallery", 0.6],
    ["/faq", 0.6],
    ["/contact", 0.8],
    ["/areas", 0.7],
    ["/privacy", 0.2],
  ];
  return [
    ...pages.map(([p, priority]) => ({ url: absoluteUrl(p), lastModified: UPDATED, changeFrequency: "monthly" as const, priority })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: UPDATED, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...areas.map((a) => ({ url: absoluteUrl(`/areas/${a.slug}`), lastModified: UPDATED, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
