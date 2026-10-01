"use client";

import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowRight } from "./Icons";
import { Magnetic } from "./Magnetic";
import { useT } from "@/components/preview/BizContext";

export function BookButton({ href = "/book", children, className }: { href?: string; children?: ReactNode; className?: string }) {
  const t = useT();
  return (
    <Magnetic>
      <Link href={href} className={clsx("btn btn-signal group", className)}>
        {children ?? t("Book a repair")}
        <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
      </Link>
    </Magnetic>
  );
}
