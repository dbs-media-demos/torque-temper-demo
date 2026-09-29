/** Fictional, realistic reviews for the demo. */
export type Review = {
  name: string;
  car: string;
  area: string;
  service: string;
  rating: number;
  date: string;
  /** ISO date for structured data. */
  iso: string;
  text: string;
};

export const reviews: Review[] = [
  {
    name: "Marisol R.",
    car: "2017 Honda CR-V",
    area: "Lakewood",
    service: "brakes",
    rating: 5,
    date: "2 weeks ago",
    iso: "2026-09-14",
    text: "They texted me a photo of my brake pads with a ruler next to them. 2 mm left. Quote was exactly what I paid, done before lunch. I've never trusted a mechanic this fast.",
  },
  {
    name: "Derek T.",
    car: "2014 Ford F-150",
    area: "Lake Highlands",
    service: "check-engine-diagnostics",
    rating: 5,
    date: "3 weeks ago",
    iso: "2026-09-07",
    text: "Dealer wanted $2,100 for a catalytic converter. Torque & Temper smoke-tested it, found a cracked exhaust gasket upstream, $240 total. Light's been off for a month.",
  },
  {
    name: "Priya S.",
    car: "2019 Toyota Camry",
    area: "East Dallas",
    service: "ac-repair",
    rating: 5,
    date: "1 month ago",
    iso: "2026-08-24",
    text: "AC died in the middle of August. They found the leak with dye, showed me the glowing spot on the condenser, fixed it same day and gave me a loaner. Ice cold since.",
  },
  {
    name: "James W.",
    car: "2012 Subaru Outback",
    area: "Garland",
    service: "transmission",
    rating: 5,
    date: "1 month ago",
    iso: "2026-08-19",
    text: "Two shops told me my CVT needed replacing. Ray's team did a fluid service and a software update first. $329 and it drives like new. That's the definition of honest.",
  },
  {
    name: "Angela M.",
    car: "2021 Kia Telluride",
    area: "Mesquite",
    service: "oil-maintenance",
    rating: 5,
    date: "2 months ago",
    iso: "2026-07-30",
    text: "In and out in 40 minutes for the 30k service. Coffee in the lounge is actually good, Wi-Fi works, and they didn't try to sell me a single thing I didn't need.",
  },
  {
    name: "Luis G.",
    car: "2016 Chevrolet Silverado",
    area: "Casa Linda",
    service: "suspension-alignment",
    rating: 5,
    date: "2 months ago",
    iso: "2026-07-22",
    text: "Clunk over every bump for months. They put it on the lift and showed me a video of the loose sway bar link. Fixed and aligned the same afternoon, with the printout.",
  },
  {
    name: "Hannah K.",
    car: "2018 Mazda CX-5",
    area: "Lakewood",
    service: "tires",
    rating: 5,
    date: "3 months ago",
    iso: "2026-06-28",
    text: "Gave me three tire options with the real pros and cons of each and let me pick the middle one. Road-force balanced, no vibration. Fair price and zero pressure.",
  },
  {
    name: "Tom B.",
    car: "2010 Lexus RX 350",
    area: "White Rock",
    service: "texas-state-inspection",
    rating: 5,
    date: "3 months ago",
    iso: "2026-06-17",
    text: "Pulled in for the emissions test without an appointment and was out in 18 minutes. They even told me my monitors were ready before running it. Easy.",
  },
  {
    name: "Keisha D.",
    car: "2015 Nissan Altima",
    area: "Garland",
    service: "brakes",
    rating: 5,
    date: "4 months ago",
    iso: "2026-05-29",
    text: "I'm a single mom and I get nervous at shops. Dana walked me through every photo and the price didn't change once. They also didn't replace rotors that didn't need it.",
  },
  {
    name: "Carlos V.",
    car: "2013 Jeep Wrangler",
    area: "Mesquite",
    service: "suspension-alignment",
    rating: 4,
    date: "4 months ago",
    iso: "2026-05-18",
    text: "Great alignment on my lifted Jeep and they explained why caster couldn't go fully to spec with my kit. Only wish Saturday hours ran later. Still my shop.",
  },
  {
    name: "Rebecca L.",
    car: "2020 Tesla Model 3",
    area: "Lake Highlands",
    service: "tires",
    rating: 5,
    date: "5 months ago",
    iso: "2026-04-26",
    text: "Not every shop wants to touch a Tesla. They had the right lift pads, rotated and balanced everything and reset the TPMS without drama.",
  },
  {
    name: "Mike O.",
    car: "Fleet of 9 Ford Transits",
    area: "Garland",
    service: "fleet",
    rating: 5,
    date: "5 months ago",
    iso: "2026-04-09",
    text: "We moved our plumbing vans here last year. One invoice a month, pickup and drop-off, and our downtime dropped by half. They call before they spend a dollar.",
  },
];

export const averageRating = () => reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
