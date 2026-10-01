"use client";

import clsx from "clsx";
import { Phone } from "./Icons";
import { Magnetic } from "./Magnetic";
import { useBiz } from "@/components/preview/BizContext";
import { telOf } from "@/lib/biz";

export function CallButton({ className, label }: { className?: string; label?: string }) {
  const biz = useBiz();
  if (!biz.phone) return null;
  return (
    <Magnetic>
      <a href={telOf(biz)} className={clsx("btn btn-ghost", className)}>
        <Phone />
        {label ?? biz.phoneDisplay}
      </a>
    </Magnetic>
  );
}
