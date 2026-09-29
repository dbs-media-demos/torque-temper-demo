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

/** Current day/minute in the shop's timezone (Dallas), wherever the visitor is. */
function shopNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function openState(date = new Date()): OpenState {
  const { day, minutes } = shopNow(date);
  const today = site.hours[day];
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
    const next = site.hours[(day + i) % 7];
    if (next.open) return { open: false, label: `Closed · opens ${i === 1 ? "tomorrow" : next.label} ${fmtTime(next.open)}` };
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
