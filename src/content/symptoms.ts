/** Data for the "What's that noise?" symptom finder. */
export type Wave = "grind" | "pulse" | "hiss" | "drift" | "surge" | "smell";

export type Symptom = {
  id: string;
  label: string;
  short: string;
  code: string;
  wave: Wave;
  summary: string;
  causes: { name: string; likelihood: number }[];
  price: string;
  time: string;
  urgency: "Drive gently, book this week" | "Book soon" | "Stop driving, call us" | "Safe to drive, book when convenient";
  service: string;
};

export const symptoms: Symptom[] = [
  {
    id: "grinding-brakes",
    label: "Grinding when I brake",
    short: "Grinding brakes",
    code: "BRK-01",
    wave: "grind",
    summary:
      "A harsh metal-on-metal grind almost always means the pad material is gone and the backing plate is touching the rotor. The sooner it's fixed, the cheaper it stays.",
    causes: [
      { name: "Pads worn to the backing plate", likelihood: 78 },
      { name: "Rotor scored or below minimum thickness", likelihood: 54 },
      { name: "Stone or debris caught in the shield", likelihood: 12 },
    ],
    price: "$189–$489 per axle",
    time: "1.5–2.5 hours",
    urgency: "Drive gently, book this week",
    service: "brakes",
  },
  {
    id: "check-engine",
    label: "Check-engine light is on",
    short: "Check-engine light",
    code: "CEL-P0",
    wave: "pulse",
    summary:
      "The light means the engine computer logged a fault. It can be as small as a loose gas cap or as serious as a misfire. A steady light is a heads-up; a flashing light means stop soon.",
    causes: [
      { name: "Oxygen sensor or catalytic converter efficiency", likelihood: 41 },
      { name: "Ignition coil or spark plug misfire", likelihood: 33 },
      { name: "EVAP leak (often the gas cap)", likelihood: 26 },
    ],
    price: "$129 diagnosis, credited toward repair",
    time: "60–90 minutes",
    urgency: "Book soon",
    service: "check-engine-diagnostics",
  },
  {
    id: "ac-warm",
    label: "AC is blowing warm air",
    short: "AC blowing warm",
    code: "HVAC-12",
    wave: "hiss",
    summary:
      "Warm air usually means the system is low on refrigerant because of a leak, or a part like the compressor clutch or condenser fan has stopped doing its job.",
    causes: [
      { name: "Refrigerant leak (low charge)", likelihood: 62 },
      { name: "Compressor clutch or relay failure", likelihood: 24 },
      { name: "Condenser fan not running", likelihood: 18 },
    ],
    price: "$89 check · recharge from $179",
    time: "1–3 hours",
    urgency: "Safe to drive, book when convenient",
    service: "ac-repair",
  },
  {
    id: "pulls-left",
    label: "Car pulls to one side",
    short: "Pulls left or right",
    code: "ALN-04",
    wave: "drift",
    summary:
      "If the car drifts on a straight road, the alignment is usually out, often after a pothole. It can also be uneven tire pressure or a sticking brake caliper.",
    causes: [
      { name: "Wheel alignment out of spec", likelihood: 64 },
      { name: "Uneven tire pressure or tire wear", likelihood: 27 },
      { name: "Sticking brake caliper", likelihood: 14 },
    ],
    price: "$119 alignment",
    time: "About 1 hour",
    urgency: "Book soon",
    service: "suspension-alignment",
  },
  {
    id: "overheating",
    label: "Engine is overheating",
    short: "Overheating",
    code: "COOL-98",
    wave: "surge",
    summary:
      "A temperature needle climbing into the red can warp a cylinder head in minutes. Pull over, let it cool and don't open the radiator cap while it's hot.",
    causes: [
      { name: "Coolant leak (hose, radiator or water pump)", likelihood: 52 },
      { name: "Thermostat stuck closed", likelihood: 28 },
      { name: "Radiator fan failure", likelihood: 22 },
    ],
    price: "$129 diagnosis · repairs from $180",
    time: "Same day for most repairs",
    urgency: "Stop driving, call us",
    service: "check-engine-diagnostics",
  },
  {
    id: "strange-smell",
    label: "Strange smell from the car",
    short: "Strange smell",
    code: "ODR-07",
    wave: "smell",
    summary:
      "Smells are clues. Sweet means coolant, burnt oil means a leak onto the exhaust, rotten eggs means the catalytic converter, and a musty vent smell means the AC evaporator.",
    causes: [
      { name: "Oil leaking onto a hot exhaust", likelihood: 38 },
      { name: "Coolant leak (sweet, syrupy smell)", likelihood: 31 },
      { name: "Overheated brakes or clutch", likelihood: 19 },
    ],
    price: "$129 diagnosis, credited toward repair",
    time: "60–90 minutes",
    urgency: "Book soon",
    service: "check-engine-diagnostics",
  },
];
