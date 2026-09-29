import type { SystemId } from "./services";

export type CarSystem = {
  id: SystemId;
  label: string;
  service: string;
  blurb: string;
  watch: string[];
  from: string;
  /** Hotspot position in the diagram's 1000×440 viewBox. */
  x: number;
  y: number;
};

export const systems: CarSystem[] = [
  {
    id: "engine",
    label: "Engine & maintenance",
    service: "oil-maintenance",
    blurb: "Oil, filters, belts and coolant. Cheap to maintain, very expensive to ignore in Texas heat.",
    watch: ["Oil-change light", "Ticking on startup", "Coolant smell"],
    from: "$79",
    x: 818,
    y: 252,
  },
  {
    id: "transmission",
    label: "Transmission",
    service: "transmission",
    blurb: "Turns engine power into motion. Most shifting problems start with fluid or software, not a rebuild.",
    watch: ["Harsh or late shifts", "Slipping", "Shudder at 40–50 mph"],
    from: "$189",
    x: 704,
    y: 262,
  },
  {
    id: "brakes",
    label: "Brakes",
    service: "brakes",
    blurb: "Pads squeeze rotors to stop you. We measure both and send you the numbers before quoting.",
    watch: ["Grinding or squeal", "Soft pedal", "Wheel shakes when braking"],
    from: "$189",
    x: 775,
    y: 318,
  },
  {
    id: "suspension",
    label: "Suspension & alignment",
    service: "suspension-alignment",
    blurb: "Springs, struts and arms keep the tires planted. Dallas potholes knock them out of spec.",
    watch: ["Pulls to one side", "Clunks over bumps", "Uneven tire wear"],
    from: "$119",
    x: 276,
    y: 258,
  },
  {
    id: "ac",
    label: "Air conditioning",
    service: "ac-repair",
    blurb: "Compressor, condenser and evaporator. Warm air almost always means a leak we can find.",
    watch: ["Warm air", "Clicking with AC on", "Musty vents"],
    from: "$89",
    x: 928,
    y: 280,
  },
  {
    id: "electrical",
    label: "Electrical & diagnostics",
    service: "check-engine-diagnostics",
    blurb: "Battery, alternator, sensors and the computer that lights up your dash.",
    watch: ["Check-engine light", "Slow crank", "Flickering lights"],
    from: "$129",
    x: 730,
    y: 214,
  },
  {
    id: "tires",
    label: "Tires & wheels",
    service: "tires",
    blurb: "Four patches of rubber the size of your hand. Tread depth and pressure matter more than brand.",
    watch: ["Tread under 4/32 in", "Vibration at speed", "TPMS light"],
    from: "$25",
    x: 246,
    y: 368,
  },
  {
    id: "exhaust",
    label: "Exhaust & emissions",
    service: "texas-state-inspection",
    blurb: "Catalytic converter and sensors. Dallas County tests them every year before registration.",
    watch: ["Failed emissions test", "Rotten-egg smell", "Rattling underneath"],
    from: "$18.50",
    x: 660,
    y: 340,
  },
];
