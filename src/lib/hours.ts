import { site } from "./site";

export type OpenState = { open: boolean; label: string };

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "18:00" → "6 pm", "07:30" → "7:30 am"; in Serbian 24h: "18:00", "7:30", "23:59" → "24:00" */
export const fmtTime = (t: string, lang: "en" | "sr" = "en") => {
  const [h, m] = t.split(":").map(Number);
  if (lang === "sr") return t === "23:59" ? "24:00" : `${h}:${String(m).padStart(2, "0")}`;
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
};

type DayHours = { day: number; open: string | null; close: string | null };
export const DAY_NAMES = {
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  sr: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"],
};
/** "opens on Monday" in Serbian takes the accusative ("u ponedeljak", "u sredu") */
const SR_ON_DAY = ["u nedelju", "u ponedeljak", "u utorak", "u sredu", "u četvrtak", "u petak", "u subotu"];

const LABELS = {
  en: {
    allDay: () => "Open 24 hours",
    closesIn: (n: number) => `Open · closes in ${n} min`,
    closes: (t: string) => `Open now · closes ${t}`,
    opensToday: (t: string) => `Closed · opens ${t} today`,
    opensTomorrow: (t: string) => `Closed · opens tomorrow ${t}`,
    opensOn: (d: number, t: string) => `Closed · opens ${DAY_NAMES.en[d]} ${t}`,
    closed: () => "Closed",
  },
  sr: {
    allDay: () => "Otvoreno 24 sata",
    closesIn: (n: number) => `Otvoreno · zatvaramo za ${n} min`,
    closes: (t: string) => `Otvoreno · radimo do ${t}`,
    opensToday: (t: string) => `Zatvoreno · otvaramo u ${t}`,
    opensTomorrow: (t: string) => `Zatvoreno · otvaramo sutra u ${t}`,
    opensOn: (d: number, t: string) => `Zatvoreno · otvaramo ${SR_ON_DAY[d]} u ${t}`,
    closed: () => "Zatvoreno",
  },
};

/** Current day/minute in the shop's timezone (Dallas), wherever the visitor is. */
function shopNow(date = new Date(), timeZone: string = site.timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** Open/closed for any week of hours (a preview's real business), in its own timezone and language. */
export function openState(date = new Date(), hours: DayHours[] = site.hours, timeZone: string = site.timezone, lang: "en" | "sr" = "en"): OpenState {
  const L = LABELS[lang];
  const f = (t: string) => fmtTime(t, lang);
  const { day, minutes } = shopNow(date, timeZone);
  const today = hours[day];
  if (today.open === "00:00" && today.close === "23:59") return { open: true, label: L.allDay() };
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      const left = c - minutes;
      return { open: true, label: left <= 60 ? L.closesIn(left) : L.closes(f(today.close)) };
    }
    if (minutes < o) return { open: false, label: L.opensToday(f(today.open)) };
  }
  // Find the next opening day.
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (next.open) return { open: false, label: i === 1 ? L.opensTomorrow(f(next.open)) : L.opensOn(next.day, f(next.open)) };
  }
  return { open: false, label: L.closed() };
}

/** Available booking slots for a given date (every 30 min, first slot at opening, last 90 min before close). */
export function slotsFor(date: Date): string[] {
  const h = site.hours[date.getDay()];
  if (!h.open || !h.close) return [];
  const out: string[] = [];
  for (let m = toMin(h.open); m <= toMin(h.close) - 90; m += 30) {
    out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return out;
}
