import { absoluteUrl, site } from "./site";
import { reviews } from "@/content/reviews";
import type { Faq } from "@/content/services";

/** schema.org builders. Everything links back to one AutoRepair node via @id. */

export const businessId = `${site.url}/#business`;
export const websiteId = `${site.url}/#website`;

type Json = Record<string, unknown>;

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function businessSchema(): Json {
  const grouped = new Map<string, string[]>();
  for (const h of site.hours) {
    if (!h.open || !h.close) continue;
    const key = `${h.open}-${h.close}`;
    grouped.set(key, [...(grouped.get(key) ?? []), dayNames[h.day]]);
  }
  return {
    "@type": "AutoRepair",
    "@id": businessId,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    image: [absoluteUrl("/images/shop-night.jpg"), absoluteUrl("/images/lift-red-car.jpg")],
    logo: absoluteUrl("/icon.svg"),
    priceRange: "$$",
    foundingDate: String(site.founded),
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Financing",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postal,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("East Dallas, TX 75218")}`,
    areaServed: site.areaServed.map((name) => ({ "@type": "Place", name: `${name}, TX` })),
    openingHoursSpecification: [...grouped.entries()].map(([k, days]) => {
      const [opens, closes] = k.split("-");
      return { "@type": "OpeningHoursSpecification", dayOfWeek: days, opens, closes };
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 6).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.iso,
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
    knowsAbout: ["Brake repair", "Check-engine diagnostics", "Auto AC repair", "Transmission repair", "Wheel alignment", "Tires", "Texas emissions inspection"],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": businessId },
    inLanguage: "en-US",
  };
}

export function webPageSchema(opts: { path: string; name: string; description: string; image?: string; type?: string }): Json {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
    ...(opts.image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(opts.image) } } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  image: string;
  offers: { item: string; price: string }[];
  areas?: string[];
}): Json {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    image: absoluteUrl(opts.image),
    provider: { "@id": businessId },
    areaServed: (opts.areas ?? site.areaServed).map((name) => ({ "@type": "Place", name: `${name}, TX` })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.offers.map((o) => {
        const nums = o.price.replace(/,/g, "").match(/\d+(\.\d+)?/g)?.map(Number) ?? [];
        return {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: o.item },
          ...(nums.length
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  ...(nums.length > 1 ? { minPrice: nums[0], maxPrice: nums[1] } : { price: nums[0] }),
                },
              }
            : {}),
        };
      }),
    },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListSchema(items: { name: string; path: string }[]): Json {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/** Wrap nodes in one @graph document. */
export const graph = (...nodes: Json[]) => ({ "@context": "https://schema.org", "@graph": nodes });
