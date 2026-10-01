import { site } from "./site";

export type OpenState = { open: boolean; label: string };

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "18:00" → "6 pm", "07:30" → "7:30 am" */
export const fmtTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
};

type DayHours = { day: number; open: string | null; close: string | null };
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

/** Open/closed for any week of hours (a preview's real business), in its own timezone. */
export function openState(date = new Date(), hours: DayHours[] = site.hours, timeZone: string = site.timezone): OpenState {
  const { day, minutes } = shopNow(date, timeZone);
  const today = hours[day];
  if (today.open === "00:00" && today.close === "23:59") return { open: true, label: "Open 24 hours" };
  if (today.open && today.close) {
    const o = toMin(today.open);
    const c = toMin(today.close);
    if (minutes >= o && minutes < c) {
      const left = c - minutes;
      return { open: true, label: left <= 60 ? `Open · closes in ${left} min` : `Open now · closes ${fmtTime(today.close)}` };
    }
    if (minutes < o) return { open: false, label: `Closed · opens ${fmtTime(today.open)} today` };
  }
  // Find the next opening day.
  for (let i = 1; i <= 7; i++) {
    const next = hours[(day + i) % 7];
    if (next.open) return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : DAY_NAMES[next.day]} ${fmtTime(next.open)}` };
  }
  return { open: false, label: "Closed" };
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
