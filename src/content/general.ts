import type { Faq } from "./services";

export const team = [
  {
    name: "Ray Castillo",
    role: "Founder · Master technician",
    bio: "Opened the shop in 2009 with two bays and a borrowed lift. ASE Master certified, 31 years on the tools, still road-tests every transmission job himself.",
    image: "/images/team-ray.jpg",
    certs: "ASE Master · L1 Advanced Engine",
  },
  {
    name: "Dana Whitfield",
    role: "Service advisor",
    bio: "The voice on the phone and the person who texts you the photos. Dana turns tech notes into plain English and has never once used the word 'while we're in there'.",
    image: "/images/team-dana.jpg",
    certs: "ASE C1 Service Consultant",
  },
  {
    name: "Marcus Oyelaran",
    role: "Lead technician · Drivetrain",
    bio: "Transmission and diagnostics specialist. Former dealer tech who got tired of recommending rebuilds that weren't needed.",
    image: "/images/team-marcus.jpg",
    certs: "ASE A2 · A6 · A8",
  },
  {
    name: "Diego Paredes",
    role: "Technician · Brakes & suspension",
    bio: "Runs the alignment rack and the brake bays. If your car pulls, clunks or squeals, Diego is the one who makes it stop.",
    image: "/images/team-diego.jpg",
    certs: "ASE A4 · A5 · A7",
  },
];

export const timeline = [
  { year: "2009", text: "Ray opens two bays off Garland Road with a used lift and a promise: photos before any work." },
  { year: "2012", text: "Moves into the current building on Anvil Row. Eight bays, a real lounge and an alignment rack." },
  { year: "2016", text: "Becomes a certified Texas inspection station and adds the first fleet accounts." },
  { year: "2020", text: "Launches digital inspections: every quote now arrives by text with photos and video." },
  { year: "2024", text: "Crosses 35,000 cars serviced and adds EV and hybrid tooling for Teslas, Priuses and Bolts." },
  { year: "Today", text: "Eight bays, eleven people, 612 Google reviews averaging 4.9, and the same promise." },
];

export const certifications = [
  { name: "ASE certified", detail: "Every technician, renewed every five years" },
  { name: "ASE Master", detail: "Held by our founder and lead tech" },
  { name: "Texas inspection station", detail: "Certified by the Texas DPS" },
  { name: "EPA Section 609", detail: "Certified for AC refrigerant handling" },
  { name: "24/24 warranty", detail: "24 months or 24,000 miles, nationwide" },
  { name: "Financing", detail: "0% for 6 months on repairs over $500, with approved credit" },
];

export const amenities = [
  { title: "Photos before any work", text: "Every recommendation arrives by text with photos, measurements and a price. Nothing happens until you tap approve." },
  { title: "Loaner cars and shuttle", text: "Free shuttle within 5 miles, and loaner cars for repairs that take longer than a day." },
  { title: "A lounge you'd work from", text: "Fast Wi-Fi, desks with power, real coffee and a window into the shop." },
  { title: "Financing available", text: "0% interest for 6 months on repairs over $500, with approved credit. Apply in two minutes at the counter." },
];

export const specials = [
  {
    code: "TT-SYNTH",
    title: "$20 off",
    subtitle: "Full-synthetic oil change + 27-point inspection",
    detail: "Regularly $79. Includes free tire rotation.",
    expires: "Oct 31, 2026",
    service: "oil-maintenance",
  },
  {
    code: "TT-BRAKE",
    title: "15% off",
    subtitle: "Any brake job, pads and rotors",
    detail: "Max discount $100. Includes free brake-fluid test.",
    expires: "Oct 31, 2026",
    service: "brakes",
  },
  {
    code: "TT-COLD",
    title: "Free",
    subtitle: "AC performance check with any service",
    detail: "A $89 value. Vent temperature, pressures and leak check.",
    expires: "Oct 15, 2026",
    service: "ac-repair",
  },
  {
    code: "TT-FIRST",
    title: "$50 off",
    subtitle: "Your first repair over $300",
    detail: "New customers only. Mention it when you book.",
    expires: "Dec 31, 2026",
    service: "check-engine-diagnostics",
  },
];

export const generalFaqs: { group: string; items: Faq[] }[] = [
  {
    group: "Pricing and approval",
    items: [
      {
        q: "Will you do work I didn't approve?",
        a: "Never. We text you photos, measurements and a price for every recommendation. Nothing is done until you tap approve, and the final invoice matches the quote.",
      },
      {
        q: "Do you charge for estimates?",
        a: "Visual inspections and quotes for things we can see (brakes, tires, leaks, suspension) are free. Diagnostics that need testing, like a check-engine light, are $129 and credited toward the repair.",
      },
      {
        q: "Do you offer financing?",
        a: "Yes. 0% interest for 6 months on repairs over $500, with approved credit. The application takes about two minutes at the counter or by text.",
      },
    ],
  },
  {
    group: "Warranty and parts",
    items: [
      {
        q: "What warranty do you offer?",
        a: "24 months or 24,000 miles on parts and labor, whichever comes first. It's honored at more than 30,000 partner shops across the US if you're traveling.",
      },
      {
        q: "What parts do you use?",
        a: "OEM or OEM-equivalent parts from suppliers we trust. If a cheaper option is genuinely fine for your car, we'll offer it and explain the trade-off.",
      },
      {
        q: "Can I bring my own parts?",
        a: "In most cases, yes. We can't warranty parts we didn't supply, but we'll warranty our labor for 90 days.",
      },
    ],
  },
  {
    group: "Appointments and waiting",
    items: [
      {
        q: "How soon can you see my car?",
        a: "Most days we have same-day or next-morning openings. If your car isn't safe to drive, call us and we'll make room.",
      },
      {
        q: "Can I wait at the shop?",
        a: "Yes. The lounge has fast Wi-Fi, desks, coffee and a window into the bays. Oil changes, inspections and most brake jobs are done while you wait.",
      },
      {
        q: "Do you offer rides or loaners?",
        a: "Our free shuttle covers 5 miles around the shop from 7:30 am to 5 pm. Loaner cars are available for repairs that take more than a day.",
      },
      {
        q: "What makes and models do you work on?",
        a: "Nearly all cars and light trucks: domestic, Japanese, Korean and European, plus hybrids and EVs. We don't work on diesel semis or motorcycles.",
      },
    ],
  },
];

export const dayInTheBays = [
  { time: "7:30 am", title: "Doors up", text: "Coffee's on, first cars roll in and the key drop gets emptied.", image: "/images/shop-night.jpg", alt: "The shop at opening, lit by overhead lights" },
  { time: "8:10 am", title: "Digital inspection", text: "Every car gets photographed and measured before a single quote goes out.", image: "/images/diag-scanner.jpg", alt: "Technician scanning a car's computer" },
  { time: "9:45 am", title: "Photos sent", text: "Dana texts findings with photos. Customers approve from their desk.", image: "/images/brake-rotor-red.jpg", alt: "A worn brake rotor photographed for the customer" },
  { time: "11:30 am", title: "On the lift", text: "Approved work starts. Eight bays, eight cars, no rushing.", image: "/images/lift-red-car.jpg", alt: "A classic car raised on a lift in the shop" },
  { time: "2:15 pm", title: "Torqued to spec", text: "Every bolt that matters gets a torque wrench and a paint mark.", image: "/images/impact-wrench.jpg", alt: "Wheel being fitted with a torque wrench" },
  { time: "4:40 pm", title: "Road test", text: "No car leaves until a tech has driven it and signed the ticket.", image: "/images/driver.jpg", alt: "Technician road-testing a customer's car" },
  { time: "6:00 pm", title: "Keys back", text: "Invoice matches the quote. Every time.", image: "/images/headlights-dark.jpg", alt: "Headlights glowing in the dark as a car leaves the shop" },
];

export const makes = ["Toyota", "Ford", "Honda", "Chevrolet", "Nissan", "Hyundai", "Kia", "Subaru", "Jeep", "Ram", "GMC", "Lexus", "BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Mazda", "Tesla", "Acura", "Dodge"];
