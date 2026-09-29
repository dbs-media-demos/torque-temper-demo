import type { Faq } from "./services";

export type Area = {
  slug: string;
  name: string;
  drive: string;
  miles: number;
  heading: string;
  intro: string;
  roads: string[];
  zips: string[];
  local: string;
  perk: string;
  image: string;
  imageAlt: string;
  /** Position on the stylized service-area map (0–100). */
  map: { x: number; y: number };
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
};

export const areas: Area[] = [
  {
    slug: "lakewood",
    name: "Lakewood",
    drive: "8 min",
    miles: 3.1,
    heading: "Auto repair for Lakewood, three miles from your driveway.",
    intro:
      "Lakewood families have trusted us with everything from first cars to classic restorations since 2009. We're a straight shot east on Gaston or Garland Road, and our free shuttle covers every Lakewood street.",
    roads: ["Gaston Ave", "Abrams Rd", "Lakewood Blvd", "Garland Rd"],
    zips: ["75214", "75218"],
    local:
      "Lakewood's older homes mean a lot of street parking and tight driveways, which is hard on bumpers, tires and alignment. We see plenty of curb-rash wheels and pulled alignments from Swiss Avenue's speed humps.",
    perk: "Free shuttle to and from anywhere in Lakewood",
    image: "/images/dallas-bridge.jpg",
    imageAlt: "Dallas skyline and bridge on a clear day",
    map: { x: 34, y: 56 },
    faqs: [
      {
        q: "Do you pick up from Lakewood?",
        a: "Yes. Our shuttle runs throughout Lakewood from 7:30 am to 5 pm. Drop the car off and we'll drive you home or to work.",
      },
      {
        q: "Do you work on older and classic cars?",
        a: "We do. Half of Lakewood seems to have a project car in the garage, and our techs enjoy carbureted engines as much as modern ones.",
      },
    ],
    metaTitle: "Auto Repair in Lakewood, Dallas: 8 Minutes Away, Free Shuttle",
    metaDescription:
      "Honest auto repair for Lakewood, Dallas: brakes, diagnostics, AC, alignment and inspections. Free shuttle, 24-month warranty, photos before any work.",
  },
  {
    slug: "lake-highlands",
    name: "Lake Highlands",
    drive: "10 min",
    miles: 4.4,
    heading: "The Lake Highlands mechanic your neighbors already use.",
    intro:
      "From Skillman to Audelia, Lake Highlands drivers make up a quarter of our customers. We're ten minutes down Northwest Highway, with same-day appointments and a lounge that works as a remote office.",
    roads: ["Skillman St", "Northwest Hwy", "Audelia Rd", "Plano Rd"],
    zips: ["75238", "75243", "75218"],
    local:
      "Lake Highlands commutes mean a lot of stop-and-go on 635 and 75, which wears brakes and transmissions faster than the odometer suggests. We track your driving with each visit and adjust service intervals to match.",
    perk: "Free shuttle within 5 miles, which covers most of Lake Highlands",
    image: "/images/dallas-freeway.jpg",
    imageAlt: "Light trails on a Dallas freeway at night",
    map: { x: 40, y: 24 },
    faqs: [
      {
        q: "Can I wait while you work?",
        a: "Yes. The lounge has fast Wi-Fi, desks with power and proper coffee. Most maintenance and brake jobs are done in under two hours.",
      },
      {
        q: "Do you service the school-run SUVs and minivans?",
        a: "Every day. Siennas, Odysseys, Highlanders, Tahoes: we stock the common parts, so most jobs are same-day.",
      },
    ],
    metaTitle: "Auto Repair in Lake Highlands, Dallas: Same-Day Service",
    metaDescription:
      "Trusted mechanic for Lake Highlands: brakes, check-engine diagnostics, AC, tires and alignment. Ten minutes from Skillman, free shuttle, photos before any work.",
  },
  {
    slug: "garland",
    name: "Garland",
    drive: "15 min",
    miles: 7.2,
    heading: "Worth the 15-minute drive from Garland.",
    intro:
      "Garland drivers skip the chain shops on Broadway and come to us for honest quotes and work that's done right the first time. We're just off Garland Road, and we pick up from anywhere in Garland on repairs over $250.",
    roads: ["Garland Rd", "I-635", "Shiloh Rd", "Broadway Blvd"],
    zips: ["75040", "75041", "75042", "75043"],
    local:
      "A lot of our Garland customers run work trucks and vans. We keep fleet accounts for local contractors, with one monthly invoice and priority bays so vehicles are back on the road fast.",
    perk: "Free pickup and drop-off in Garland on repairs over $250",
    image: "/images/fleet-vans.jpg",
    imageAlt: "A row of white work vans parked in a lot",
    map: { x: 74, y: 28 },
    faqs: [
      {
        q: "Is it worth driving from Garland?",
        a: "Customers tell us so. We text photos and quotes before any work, so you're never guessing, and the warranty is honored at 30,000+ shops nationwide.",
      },
      {
        q: "Do you handle work trucks?",
        a: "Yes, light and medium-duty trucks and vans. Ask about a fleet account if you run more than three vehicles.",
      },
    ],
    metaTitle: "Auto Repair Near Garland, TX: Free Pickup on Repairs Over $250",
    metaDescription:
      "Garland drivers trust Torque & Temper for brakes, diagnostics, AC and fleet service. 15 minutes away, free pickup on repairs over $250, 24-month warranty.",
  },
  {
    slug: "mesquite",
    name: "Mesquite",
    drive: "15 min",
    miles: 8.0,
    heading: "Mesquite's shortcut to an honest mechanic.",
    intro:
      "From Town East to the rodeo grounds, Mesquite drivers are 15 minutes away via I-30 or 635. Book online, drop off before work, and we'll text photos, the quote and a pickup time.",
    roads: ["I-30", "I-635", "Town East Blvd", "Gus Thomasson Rd"],
    zips: ["75149", "75150", "75181"],
    local:
      "Long I-30 and 635 commutes rack up highway miles, heat-soaked brakes and tired AC compressors. Our summer AC check is the most-booked service in Mesquite from May to September.",
    perk: "Loaner cars available for Mesquite drivers on longer repairs",
    image: "/images/dallas-night.jpg",
    imageAlt: "Dallas at night seen from a high-rise",
    map: { x: 80, y: 70 },
    faqs: [
      {
        q: "Can I drop off before work?",
        a: "Yes. We open at 7:30, and there's a secure key drop for early birds. We'll text you once the car is checked in.",
      },
      {
        q: "Do you offer loaners?",
        a: "We keep a small fleet of loaner cars for repairs that take longer than a day. Ask when you book and we'll reserve one.",
      },
    ],
    metaTitle: "Auto Repair Near Mesquite, TX: Loaners, 24-Month Warranty",
    metaDescription:
      "Mesquite's honest mechanic, 15 minutes away. Brakes, AC, transmission, diagnostics and tires with photos before any work, loaner cars and a 24-month warranty.",
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);
