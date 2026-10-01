import type { Biz } from "./biz";
import { sr } from "@/i18n/sr";
import { enPreview } from "@/i18n/en-preview";

export type T = (text: string, vars?: Record<string, string | number>) => string;

/**
 * Text in the page's language. The concept site is English and passes text through untouched;
 * a personalised preview uses the Serbian dictionary (Serbian businesses) or a few English
 * tweaks (the Texas-only lines, for shops elsewhere). Keys are the English text itself, so a
 * missing translation falls back to English. `{name}` placeholders are filled from `vars`.
 */
export function tOf(biz: Pick<Biz, "lang" | "preview">): T {
  const dict: Record<string, string> | null = !biz.preview ? null : biz.lang === "sr" ? sr : enPreview;
  return (text, vars) => {
    let out = dict?.[text] ?? text;
    if (dict === sr && !(text in sr) && process.env.NODE_ENV !== "production") console.warn("[i18n] no Serbian for:", JSON.stringify(text));
    if (vars) out = out.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
    return out;
  };
}

/** 4.9 → "4,9" in Serbian */
export const num = (biz: Pick<Biz, "lang">, n: number) => (biz.lang === "sr" ? String(n).replace(".", ",") : String(n));
