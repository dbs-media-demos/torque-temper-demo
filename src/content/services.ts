export type Price = { item: string; price: string; note?: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  /** Word used in big display type. */
  word: string;
  /** Car-diagram system this service belongs to. */
  system: SystemId;
  eyebrow: string;
  headline: string;
  tagline: string;
  intro: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  priceFrom: string;
  priceUnit: string;
  duration: string;
  signs: string[];
  included: string[];
  prices: Price[];
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
  spec: string;
};

export type SystemId = "engine" | "transmission" | "brakes" | "suspension" | "ac" | "electrical" | "tires" | "exhaust";

export const services: Service[] = [
  {
    slug: "brakes",
    name: "Brake repair",
    word: "Brakes",
    system: "brakes",
    eyebrow: "Pads · rotors · calipers · ABS",
    headline: "Brakes that stop like the day you bought it.",
    tagline: "Pads from $189 per axle, measured and photographed before we quote.",
    intro:
      "Grinding, squealing or a soft pedal is your car asking for attention. We pull the wheels, measure pad thickness and rotor runout, and text you photos with the numbers before we touch anything. Most brake jobs are done the same day while you wait in the lounge.",
    image: "/images/brake-rotor.jpg",
    imageAlt: "Close-up of a front brake rotor and caliper on a car in the shop",
    gallery: [
      { src: "/images/brake-rotor-red.jpg", alt: "A worn, rust-ringed brake rotor pulled off a customer's car" },
      { src: "/images/impact-wrench.jpg", alt: "Technician removing lug nuts with an impact wrench" },
    ],
    priceFrom: "$189",
    priceUnit: "per axle",
    duration: "1.5–2.5 hours",
    signs: [
      "Squealing or grinding when you brake",
      "Pedal feels soft, spongy or sinks to the floor",
      "Steering wheel shakes when stopping from highway speed",
      "Car pulls to one side under braking",
      "ABS or brake warning light is on",
    ],
    included: [
      "Pad thickness and rotor measurements, with photos",
      "OEM-grade ceramic pads with new hardware",
      "Caliper slide pins cleaned and lubricated",
      "Brake fluid moisture test",
      "Lug nuts torqued to factory spec by hand",
      "Road test before you get the keys back",
    ],
    prices: [
      { item: "Front or rear pads", price: "$189–$249", note: "per axle" },
      { item: "Pads and rotors", price: "$329–$489", note: "per axle" },
      { item: "Caliper replacement", price: "$240–$420", note: "each" },
      { item: "Brake fluid flush", price: "$119" },
      { item: "ABS light diagnosis", price: "$129", note: "credited toward repair" },
    ],
    faqs: [
      {
        q: "Do I always need new rotors with new pads?",
        a: "No. If your rotors are above the manufacturer's minimum thickness and aren't warped, we leave them. You'll see the measurement in the photos we text you.",
      },
      {
        q: "How long do brake pads last in Dallas traffic?",
        a: "Around 30,000 to 50,000 miles for most daily drivers. Stop-and-go on I-30 and Central Expressway wears them faster than highway miles.",
      },
      {
        q: "Is it safe to drive with a grinding noise?",
        a: "Grinding usually means metal on metal. Drive gently and book soon: waiting can turn a $189 pad job into a $489 pads-and-rotors job.",
      },
    ],
    metaTitle: "Brake Repair in East Dallas: Pads from $189/Axle",
    metaDescription:
      "Brake pads, rotors, calipers and ABS repair in East Dallas. Measured, photographed and quoted before any work. Same-day service, 24-month/24,000-mile warranty.",
    spec: "PAD 2.1 MM · MIN 3.0",
  },
  {
    slug: "check-engine-diagnostics",
    name: "Check-engine diagnostics",
    word: "Diagnostics",
    system: "electrical",
    eyebrow: "Check-engine light · electrical · drivability",
    headline: "Your check-engine light, explained in plain English.",
    tagline: "$129 diagnosis, credited toward the repair if you fix it with us.",
    intro:
      "A code reader tells you where to start looking; it doesn't tell you what's broken. Our ASE-certified techs pair factory-level scan tools with smoke tests, scope readings and a road test to find the actual cause, then explain it without the jargon.",
    image: "/images/check-engine-light.jpg",
    imageAlt: "An amber check-engine light glowing on a dark instrument cluster",
    gallery: [
      { src: "/images/diag-scanner.jpg", alt: "Technician reading live engine data on a diagnostic scanner inside a car" },
      { src: "/images/diag-laptop.jpg", alt: "Laptop connected to a car's OBD-II port during diagnostics" },
    ],
    priceFrom: "$129",
    priceUnit: "diagnosis",
    duration: "60–90 minutes",
    signs: [
      "Check-engine light on, steady or flashing",
      "Rough idle, misfires or hesitation",
      "Fuel economy suddenly dropped",
      "Car won't start or stalls",
      "Failed emissions test",
    ],
    included: [
      "Full-system scan with factory-level software",
      "Freeze-frame and live-data review",
      "Pinpoint tests: smoke, scope, voltage drop",
      "Written findings with photos and a clear estimate",
      "Diagnosis fee credited toward the repair",
    ],
    prices: [
      { item: "Check-engine diagnosis", price: "$129", note: "credited toward repair" },
      { item: "EVAP smoke test", price: "$149" },
      { item: "Ignition coil", price: "$160–$340", note: "each, installed" },
      { item: "Oxygen sensor", price: "$220–$380" },
      { item: "Catalytic converter", price: "$950–$2,400" },
    ],
    faqs: [
      {
        q: "The parts store read my code for free. Why pay for a diagnosis?",
        a: "A code like P0420 can mean a bad catalytic converter, a failing O2 sensor or an exhaust leak. Guessing costs more than testing. We find the cause so you only pay for the part you actually need.",
      },
      {
        q: "My light is flashing. Can I keep driving?",
        a: "A flashing light usually means an active misfire that can overheat the catalytic converter. Pull over when it's safe, and call us. We can often see you the same day.",
      },
      {
        q: "Will the light go off after the repair?",
        a: "Yes. We clear the codes, road-test the car and confirm the monitors are ready, so it's clear for your next emissions test.",
      },
    ],
    metaTitle: "Check-Engine Light Diagnostics in Dallas: $129, Credited to Repair",
    metaDescription:
      "Check-engine light on? Factory-level diagnostics in East Dallas for $129, credited toward the repair. Plain-English findings with photos, same-day appointments.",
    spec: "P0420 · CAT EFF < THRESH",
  },
  {
    slug: "oil-maintenance",
    name: "Oil change & maintenance",
    word: "Maintenance",
    system: "engine",
    eyebrow: "Oil · filters · fluids · factory schedules",
    headline: "Maintenance that keeps the big repairs away.",
    tagline: "Full-synthetic oil change $79, with a free 27-point inspection.",
    intro:
      "Texas heat is hard on oil, coolant and batteries. We follow your manufacturer's schedule, not a sticker on the windshield, and use the exact oil spec your engine calls for. Every visit includes a 27-point inspection with photos of anything worth watching.",
    image: "/images/oil-pour.jpg",
    imageAlt: "Technician pouring fresh synthetic oil into an engine",
    gallery: [
      { src: "/images/oil-filter.jpg", alt: "Mechanic's gloved hands removing an oil filter" },
      { src: "/images/engine-bay.jpg", alt: "Clean engine bay after a scheduled maintenance service" },
    ],
    priceFrom: "$79",
    priceUnit: "full synthetic",
    duration: "35–45 minutes",
    signs: [
      "Oil-change reminder or wrench light on",
      "More than 5,000 miles since your last change",
      "Engine sounds louder or ticks on startup",
      "Coming up on 30k, 60k or 90k miles",
      "Road trip coming up",
    ],
    included: [
      "Up to 5 quarts of full-synthetic oil to your engine's spec",
      "New OEM-grade oil filter",
      "Tire rotation and pressure set",
      "27-point inspection with photos",
      "Fluid top-offs and battery test",
      "Service reminder reset",
    ],
    prices: [
      { item: "Full-synthetic oil change", price: "$79", note: "up to 5 qt" },
      { item: "High-mileage synthetic", price: "$89" },
      { item: "Engine and cabin air filters", price: "$59–$95" },
      { item: "Coolant flush", price: "$149" },
      { item: "30k / 60k / 90k service", price: "$289–$689" },
    ],
    faqs: [
      {
        q: "How often should I change my oil?",
        a: "Most modern cars running synthetic are fine at 5,000 to 7,500 miles. In Dallas summers with lots of short trips, we lean toward the lower end. We'll set a reminder that matches your driving.",
      },
      {
        q: "Will maintenance here affect my new-car warranty?",
        a: "No. Federal law (Magnuson-Moss) lets you service your car anywhere. We use parts that meet factory specs and keep records you can show the dealer.",
      },
      {
        q: "Do I need an appointment for an oil change?",
        a: "Walk-ins are welcome before 4 pm on weekdays. Booking online guarantees your spot and usually gets you out in under 45 minutes.",
      },
    ],
    metaTitle: "Oil Change & Scheduled Maintenance in East Dallas: $79 Synthetic",
    metaDescription:
      "Full-synthetic oil change for $79 with a 27-point inspection. Factory-scheduled 30k/60k/90k maintenance in East Dallas. Warranty-safe, done in 45 minutes.",
    spec: "0W-20 · 5.0 QT · 105 °C",
  },
  {
    slug: "ac-repair",
    name: "AC repair",
    word: "AC",
    system: "ac",
    eyebrow: "Recharge · leaks · compressors · condensers",
    headline: "Cold air in a Dallas August. Guaranteed.",
    tagline: "AC performance check $89. Recharge from $179.",
    intro:
      "When it's 104° on LBJ, warm air from the vents isn't an inconvenience. We measure vent temperature and system pressures, find leaks with UV dye and electronic sniffers, and fix the cause instead of topping off refrigerant that will leak out again.",
    image: "/images/ac-vent.jpg",
    imageAlt: "Close-up of a round car air-conditioning vent",
    gallery: [
      { src: "/images/ac-vent-2.jpg", alt: "Dashboard air vents in a car interior" },
      { src: "/images/dallas-dusk.jpg", alt: "Dallas skyline at dusk after a hot summer day" },
    ],
    priceFrom: "$179",
    priceUnit: "recharge",
    duration: "1–3 hours",
    signs: [
      "Vents blow warm or only cool at highway speed",
      "Clicking or grinding when the AC is on",
      "Musty smell from the vents",
      "Water pooling on the passenger floor",
      "AC works, then cuts out",
    ],
    included: [
      "Vent temperature and high/low-side pressure test",
      "UV-dye and electronic leak detection",
      "Evacuate, vacuum-test and recharge to factory weight",
      "Cabin air filter check",
      "Photos of any leak or damaged part",
    ],
    prices: [
      { item: "AC performance check", price: "$89" },
      { item: "Recharge, R-134a", price: "$179–$229" },
      { item: "Recharge, R-1234yf", price: "$289–$429", note: "most 2016+ cars" },
      { item: "Condenser replacement", price: "$650–$1,200" },
      { item: "Compressor replacement", price: "$1,100–$2,200" },
    ],
    faqs: [
      {
        q: "Why is a newer car's recharge more expensive?",
        a: "Most cars built after 2016 use R-1234yf refrigerant, which costs several times more than the older R-134a. We charge for the exact weight your system holds, nothing extra.",
      },
      {
        q: "Can't I just use a DIY recharge can?",
        a: "Cans often overcharge the system and can contain sealants that clog compressors. If your AC is low, it's leaking. Finding the leak is the real fix.",
      },
      {
        q: "How long does an AC repair take?",
        a: "Checks and recharges take about an hour. Compressor or condenser jobs are usually same-day or next-morning, and we'll give you a loaner if you need one.",
      },
    ],
    metaTitle: "Car AC Repair in Dallas: Recharge from $179, Leak Detection",
    metaDescription:
      "Car AC blowing warm? East Dallas AC repair with leak detection, R-134a and R-1234yf recharges, compressor and condenser replacement. $89 performance check.",
    spec: "VENT 38 °F · HI 210 PSI",
  },
  {
    slug: "transmission",
    name: "Transmission service & repair",
    word: "Transmission",
    system: "transmission",
    eyebrow: "Fluid · solenoids · clutches · rebuilds",
    headline: "Smooth shifts, without the dealership rebuild quote.",
    tagline: "Fluid service from $189. We always check the simple fix first.",
    intro:
      "Plenty of shops jump straight to a $5,000 rebuild. We start with the fluid, the software and the solenoids, because that's where most shifting problems actually live. If it truly needs a rebuild, you'll see why in the photos.",
    image: "/images/gears.jpg",
    imageAlt: "Macro view of polished transmission gears",
    gallery: [
      { src: "/images/gears-2.jpg", alt: "Close-up of interlocking gearbox gears" },
      { src: "/images/lift-underside.jpg", alt: "Car raised on a lift showing the transmission and underbody" },
    ],
    priceFrom: "$189",
    priceUnit: "fluid service",
    duration: "1 hour to 3 days",
    signs: [
      "Delayed or harsh shifts",
      "Engine revs but the car doesn't accelerate",
      "Shudder around 40–50 mph",
      "Red fluid under the car",
      "Burning smell after driving",
    ],
    included: [
      "Scan for transmission codes and adaptation data",
      "Fluid condition and level check",
      "Road test with live shift data",
      "Pan inspection for debris, with photos",
      "Software updates where the manufacturer offers them",
    ],
    prices: [
      { item: "Transmission diagnosis", price: "$129", note: "credited toward repair" },
      { item: "Fluid service", price: "$189–$329" },
      { item: "Shift solenoid", price: "$350–$750" },
      { item: "Clutch replacement", price: "$1,200–$2,400" },
      { item: "Rebuild", price: "$2,800–$4,900", note: "3-year warranty" },
    ],
    faqs: [
      {
        q: "Is a transmission flush bad for high-mileage cars?",
        a: "A pressure flush can be. We do a drain-and-fill service that matches the manufacturer's procedure, which is safe at any mileage.",
      },
      {
        q: "Do you work on CVTs?",
        a: "Yes. We service Nissan, Subaru, Honda and Toyota CVTs, including fluid, software and valve-body work.",
      },
      {
        q: "What warranty comes with a rebuild?",
        a: "Rebuilds carry 3 years or 36,000 miles, parts and labor. Everything else carries our standard 24-month/24,000-mile warranty.",
      },
    ],
    metaTitle: "Transmission Repair in East Dallas: Honest Diagnosis First",
    metaDescription:
      "Transmission and CVT service, solenoids, clutches and rebuilds in East Dallas. Fluid service from $189. We check the simple fix before recommending a rebuild.",
    spec: "ATF 176 °F · 3RD → 4TH",
  },
  {
    slug: "suspension-alignment",
    name: "Suspension & alignment",
    word: "Suspension",
    system: "suspension",
    eyebrow: "Alignment · struts · control arms · steering",
    headline: "Drives straight. Rides smooth. Wears tires evenly.",
    tagline: "Four-wheel alignment $119, with a before-and-after printout.",
    intro:
      "Dallas potholes are brutal on suspension parts. We inspect every joint, bushing and strut, set your alignment to factory spec on a laser rack, and hand you the before-and-after readings so you can see exactly what changed.",
    image: "/images/coilovers.jpg",
    imageAlt: "Four suspension struts with red coil springs lined up in the shop",
    gallery: [
      { src: "/images/cv-axle.jpg", alt: "Close-up of a car's CV axle, control arm and wheel hub" },
      { src: "/images/wheel-profile.jpg", alt: "Side profile of an alloy wheel and tire" },
    ],
    priceFrom: "$119",
    priceUnit: "4-wheel alignment",
    duration: "1–4 hours",
    signs: [
      "Car pulls left or right",
      "Steering wheel is off-center",
      "Clunking over bumps",
      "Bouncing or nose-diving when braking",
      "Inside or outside edges of tires wearing fast",
    ],
    included: [
      "Steering and suspension inspection with photos",
      "Laser four-wheel alignment to factory spec",
      "Before-and-after alignment printout",
      "Tire pressure set and tread depth measured",
      "Road test",
    ],
    prices: [
      { item: "Four-wheel alignment", price: "$119" },
      { item: "Sway bar links", price: "$149–$260", note: "pair" },
      { item: "Tie rod ends", price: "$180–$340", note: "pair" },
      { item: "Control arm", price: "$280–$560", note: "each" },
      { item: "Struts, front pair", price: "$489–$899" },
    ],
    faqs: [
      {
        q: "How do I know if I need an alignment?",
        a: "If the car pulls, the wheel is off-center, or your tires wear on one edge, you need one. We also recommend one with every set of new tires.",
      },
      {
        q: "Do you align lifted trucks?",
        a: "Yes, up to 6-inch lifts. We'll set it as close to spec as the kit allows and explain any readings that can't be corrected.",
      },
      {
        q: "What's that clunk over bumps?",
        a: "Most often a sway bar link or a worn control arm bushing. It's a quick inspection, and we'll show you the play in the part on video.",
      },
    ],
    metaTitle: "Wheel Alignment & Suspension Repair in East Dallas: $119",
    metaDescription:
      "Laser four-wheel alignment for $119 with a before-and-after printout. Struts, control arms, tie rods and steering repair in East Dallas, Lakewood and Garland.",
    spec: "TOE 0.10° · CAMBER −0.5°",
  },
  {
    slug: "tires",
    name: "Tires",
    word: "Tires",
    system: "tires",
    eyebrow: "New tires · repair · balance · TPMS",
    headline: "The right tire at a fair price, installed properly.",
    tagline: "Mount and balance $25 a tire. Rotation free with any oil change.",
    intro:
      "We sell Michelin, BFGoodrich, Continental and good budget options, and we'll tell you honestly which one makes sense for how you drive. Every install gets road-force balancing, new valve stems and lug nuts torqued to spec by hand, never just gunned on.",
    image: "/images/tire-mount.jpg",
    imageAlt: "Technician mounting a new tire onto a wheel",
    gallery: [
      { src: "/images/impact-wrench.jpg", alt: "Lug nuts coming off with an impact wrench" },
      { src: "/images/tire-tread.jpg", alt: "Deep tread on a new all-terrain tire" },
    ],
    priceFrom: "$25",
    priceUnit: "per tire installed",
    duration: "45–75 minutes",
    signs: [
      "Tread at or below 4/32 inch",
      "Tire-pressure light keeps coming back",
      "Vibration at highway speed",
      "Bulges, cracks or cords showing",
      "A nail you'd rather not drive on",
    ],
    included: [
      "Tread depth and date-code check on all four tires",
      "Road-force balancing",
      "New valve stems",
      "TPMS relearn",
      "Lug nuts torqued to spec by hand",
      "Old tires recycled",
    ],
    prices: [
      { item: "Mount and balance", price: "$25", note: "per tire" },
      { item: "Rotation", price: "$29", note: "free with oil change" },
      { item: "Flat repair (plug and patch)", price: "$30" },
      { item: "TPMS sensor", price: "$75–$110" },
      { item: "New tires", price: "Quoted", note: "3 options, every time" },
    ],
    faqs: [
      {
        q: "Can I bring my own tires?",
        a: "Yes. Installation is $35 a tire for tires bought elsewhere, including balancing and valve stems.",
      },
      {
        q: "Can every flat be repaired?",
        a: "Punctures in the tread up to 1/4 inch usually can. Anything in the sidewall or shoulder can't be repaired safely, and we'll show you why.",
      },
      {
        q: "How often should I rotate?",
        a: "Every 5,000 to 7,500 miles, which lines up with most oil changes. That's why we do it free with one.",
      },
    ],
    metaTitle: "Tires in East Dallas: Install $25/Tire, Free Rotation",
    metaDescription:
      "New tires from Michelin, BFGoodrich and Continental, flat repair, TPMS and road-force balancing in East Dallas. Install $25 a tire, rotation free with oil change.",
    spec: "7/32 IN · DOT 2425 · 35 PSI",
  },
  {
    slug: "texas-state-inspection",
    name: "Texas state inspection",
    word: "Inspection",
    system: "exhaust",
    eyebrow: "Dallas County emissions · commercial safety",
    headline: "Pass your inspection in 20 minutes. Fail it here, fix it here.",
    tagline: "Dallas County emissions test, $18.50 state-set fee. No appointment needed.",
    intro:
      "Since January 2025, most Texas passenger cars no longer need a safety inspection, but Dallas County still requires an emissions (OBD) test before registration. We're a certified inspection station: pull in, grab a coffee and you're back out in about 20 minutes. Commercial vehicles still get full safety inspections here too.",
    image: "/images/dash-cluster.jpg",
    imageAlt: "Lit instrument cluster during an emissions readiness check",
    gallery: [
      { src: "/images/hood-up.jpg", alt: "Car with its hood open waiting for inspection" },
      { src: "/images/diag-laptop.jpg", alt: "Laptop plugged into the OBD-II port for the emissions test" },
    ],
    priceFrom: "$18.50",
    priceUnit: "emissions test",
    duration: "About 20 minutes",
    signs: [
      "Registration renewal notice arrived",
      "Just moved to Dallas County",
      "Check-engine light is on (it will fail)",
      "Battery was recently replaced (monitors may not be ready)",
      "You drive a commercial vehicle",
    ],
    included: [
      "OBD-II emissions test for 1996–2024+ gas vehicles",
      "Readiness-monitor pre-check before we run the official test",
      "Results filed with the state electronically",
      "Plain-English explanation if you don't pass",
      "Commercial safety inspections available",
    ],
    prices: [
      { item: "Emissions test (Dallas County)", price: "$18.50", note: "state-set fee" },
      { item: "Commercial safety inspection", price: "State fee", note: "posted at the counter" },
      { item: "Pre-inspection readiness check", price: "Free" },
      { item: "Failed-test diagnosis", price: "$129", note: "credited toward repair" },
    ],
    faqs: [
      {
        q: "Do I still need a safety inspection in Texas?",
        a: "Not for most passenger vehicles. Texas ended safety inspections for non-commercial vehicles on January 1, 2025. Dallas County still requires an emissions test, and commercial vehicles still need safety inspections.",
      },
      {
        q: "Will I pass with my check-engine light on?",
        a: "No. An illuminated check-engine light is an automatic fail. We can diagnose it first, and the diagnosis fee is credited toward the repair.",
      },
      {
        q: "Do I need an appointment?",
        a: "No. Inspections are first-come, first-served during business hours. Mornings before 10 am are the quietest.",
      },
    ],
    metaTitle: "Texas State Inspection in Dallas: Emissions Test in 20 Minutes",
    metaDescription:
      "Certified Texas inspection station in East Dallas. Dallas County emissions test for $18.50, commercial safety inspections, no appointment. Fail it here, fix it here.",
    spec: "OBD · READY 7/7 · PASS",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => `/services/${slug}`;
