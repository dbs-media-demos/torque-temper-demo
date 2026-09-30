/**
 * Business facts for Torque & Temper Auto Works (a fictional shop: Scale by Noon concept site).
 * Everything that appears in copy, structured data and share images reads from here.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://torque-temper-demo.vercel.app").replace(/\/$/, "");

/** Demos stay out of search engines unless NEXT_PUBLIC_NOINDEX is explicitly "false". */
export const noindex = process.env.NEXT_PUBLIC_NOINDEX !== "false";

export const site = {
  name: "Torque & Temper Auto Works",
  shortName: "Torque & Temper",
  tagline: "The honest shop in East Dallas.",
  description:
    "Family-owned, ASE-certified auto repair in East Dallas since 2009. Brakes, check-engine diagnostics, AC, transmission, alignment, tires and Texas state inspections. We text you photos before any work.",
  url: siteUrl,
  phone: "+12145550147",
  phoneDisplay: "(214) 555-0147",
  sms: "+12145550147",
  email: "hello@torqueandtemper.com",
  founded: 2009,
  bays: 8,
  address: {
    street: "6120 Anvil Row",
    city: "Dallas",
    region: "TX",
    postal: "75218",
    country: "US",
    neighborhood: "East Dallas, by White Rock Lake",
  },
  geo: { lat: 32.8261, lng: -96.7079 },
  timezone: "America/Chicago",
  rating: { value: 4.9, count: 612 },
  carsServiced: 38400,
  warranty: { months: 24, miles: 24000 },
  areaServed: ["East Dallas", "Lakewood", "Lake Highlands", "Garland", "Mesquite", "White Rock", "Casa Linda", "Forest Hills"],
  /** 0 = Sunday. Times are 24h "HH:MM" in the shop's timezone. */
  hours: [
    { day: 0, label: "Sunday", open: null, close: null },
    { day: 1, label: "Monday", open: "07:30", close: "18:00" },
    { day: 2, label: "Tuesday", open: "07:30", close: "18:00" },
    { day: 3, label: "Wednesday", open: "07:30", close: "18:00" },
    { day: 4, label: "Thursday", open: "07:30", close: "18:00" },
    { day: 5, label: "Friday", open: "07:30", close: "18:00" },
    { day: 6, label: "Saturday", open: "08:00", close: "14:00" },
  ] as { day: number; label: string; open: string | null; close: string | null }[],
  hoursSummary: "Mon–Fri 7:30–6 · Sat 8–2",
  agencyName: "Scale by Noon",
  /** Agency site: the single source for the credit link (swap here when the custom domain lands). */
  agencyUrl: "https://scale-by-noon.vercel.app",
} as const;

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

export const telHref = `tel:${site.phone}`;
export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;
