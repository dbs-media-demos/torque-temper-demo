import { site, fullAddress } from "./site";

/**
 * The business a page shows. On the concept site it's the fictional shop in `site.ts`; on a
 * personalised preview (/for/<token>, made from a lead in the Scale by Noon CRM) it's a real
 * business: its name, phone, address, hours and Google rating, nothing else.
 */
export type Lang = "en" | "sr";

export type Biz = {
  /** The language the page is in: Serbian for Serbian businesses (the CRM decides) */
  lang: Lang;
  name: string;
  shortName: string;
  /** Hero headline override (CRM); null = the demo's own */
  tagline: string | null;
  /** "East Dallas" / the lead's city: used in headlines like "auto repair in …" */
  area: string;
  /** E.164 for tel: links ("" = no phone) */
  phone: string;
  phoneDisplay: string;
  address: { street: string; city: string; region: string; postal: string; full: string };
  timezone: string;
  /** 0 = Sunday; null = hours unknown (the open badge hides) */
  hours: { day: number; open: string | null; close: string | null }[] | null;
  hoursSummary: string;
  rating: { value: number; count: number } | null;
  /** A personalised preview: links to the other pages say "comes with the full site" */
  preview: boolean;
};

export const defaultBiz: Biz = {
  lang: "en",
  name: site.name,
  shortName: site.shortName,
  tagline: null,
  area: "East Dallas",
  phone: site.phone,
  phoneDisplay: site.phoneDisplay,
  address: { street: site.address.street, city: site.address.city, region: site.address.region, postal: site.address.postal, full: fullAddress },
  timezone: site.timezone,
  hours: site.hours.map(({ day, open, close }) => ({ day, open, close })),
  hoursSummary: site.hoursSummary,
  rating: { ...site.rating },
  preview: false,
};

/** "Expertech Automotive" → "EA", "Torque & Temper" → "T&T" (avatar badges). */
export const initialsOf = (name: string) => {
  const words = name.split(/\s+/).filter((w) => /^[A-Za-z0-9]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase());
  return name.includes("&") ? words.join("&") : words.join("");
};

export const telOf = (biz: Biz) => (biz.phone ? `tel:${biz.phone}` : undefined);

/** Days a week it's open (for the trust strip on previews). */
export const openDays = (biz: Biz) => biz.hours?.filter((h) => h.open).length ?? 0;

/**
 * The concept site's copy names its fictional people and brand. On a preview those lines are
 * about the real business, so the names come out ("Dana walked me…" → "They walked me…").
 */
export function scrub(text: string, biz: Biz) {
  if (!biz.preview) return text;
  return text
    .replace(/Torque (&|&amp;|and) Temper( Auto Works)?/g, biz.shortName)
    .replace(/Ray's team/g, "The team")
    .replace(/Eight bays, eight cars, no rushing\./g, "No rushing.")
    .replace(/Dana walked me/g, "They walked me")
    .replace(/Dana texts/g, "We text")
    .replace(/\bDana\b/g, "the service advisor")
    .replace(/\bRay\b/g, "the owner")
    .replace(/\b(Diego|Marcus)\b/g, "the tech");
}

/** What the CRM sends for a preview (GET /api/demos/public/<token>). */
type CrmBusiness = {
  lang?: string;
  name: string;
  shortName: string;
  tagline: string | null;
  area: string;
  phone: string;
  phoneDisplay: string;
  address: { street: string; city: string; region: string; postal: string; full: string };
  timezone: string | null;
  hours: Biz["hours"];
  hoursSummary: string;
  rating: Biz["rating"];
};

export function bizFromCrm(b: CrmBusiness): Biz {
  return {
    lang: b.lang === "sr" ? "sr" : "en",
    name: b.name,
    shortName: b.shortName || b.name,
    tagline: b.tagline || null,
    area: b.area || b.address?.city || "",
    phone: b.phone || "",
    phoneDisplay: b.phoneDisplay || "",
    address: b.address,
    timezone: b.timezone || site.timezone,
    hours: b.hours?.length === 7 ? b.hours : null,
    hoursSummary: b.hoursSummary || "",
    rating: b.rating,
    preview: true,
  };
}
