"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { defaultBiz, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";

const BizContext = createContext<Biz>(defaultBiz);

/** Client components read the business from here; without a provider it's the concept shop. */
export function BizProvider({ biz, children }: { biz: Biz; children: ReactNode }) {
  return <BizContext.Provider value={biz}>{children}</BizContext.Provider>;
}

export const useBiz = () => useContext(BizContext);

/** `t("English text")` in the page's language (see lib/i18n). */
export function useT() {
  const biz = useBiz();
  return useMemo(() => tOf(biz), [biz]);
}
