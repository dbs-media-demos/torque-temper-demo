import type { T } from "@/lib/i18n";
import type { Faq, Service } from "@/content/services";
import type { CarSystem } from "@/content/systems";
import type { Symptom } from "@/content/symptoms";
import type { Review } from "@/content/reviews";

/**
 * The content lists as a preview shows them: every visible field through `t` (identity on the
 * concept site). Slugs, ids, images and numbers used for logic stay as they are.
 */
export const localServices = (t: T, list: Service[]): Service[] =>
  list.map((s) => ({ ...s, name: t(s.name), word: t(s.word), eyebrow: t(s.eyebrow), tagline: t(s.tagline), priceFrom: t(s.priceFrom), priceUnit: t(s.priceUnit), spec: t(s.spec) }));

export const localSystems = (t: T, list: CarSystem[]): CarSystem[] =>
  list.map((s) => ({ ...s, label: t(s.label), blurb: t(s.blurb), watch: s.watch.map((w) => t(w)), from: t(s.from) }));

/** `urgency` keeps its English value (logic checks it); show it with `t(s.urgency)`. */
export const localSymptoms = (t: T, list: Symptom[]): Symptom[] =>
  list.map((s) => ({
    ...s,
    label: t(s.label),
    short: t(s.short),
    summary: t(s.summary),
    causes: s.causes.map((c) => ({ ...c, name: t(c.name) })),
    price: t(s.price),
    time: t(s.time),
  }));

export const localFaqs = (t: T, list: Faq[]): Faq[] => list.map((f) => ({ ...f, q: t(f.q), a: t(f.a) }));

export const localReviews = (t: T, list: Review[]): Review[] =>
  list.map((r) => ({ ...r, name: t(r.name), car: t(r.car), date: t(r.date), text: t(r.text) }));

export const localItems = <I extends { title: string; text: string }>(t: T, list: I[]): I[] =>
  list.map((i) => ({ ...i, title: t(i.title), text: t(i.text) }));
