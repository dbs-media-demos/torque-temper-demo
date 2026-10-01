import type { ReactNode } from "react";
import { businessSchema, graph, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteChrome } from "@/components/layout/SiteChrome";

/** The concept site: the fictional shop's chrome and structured data around every page. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={graph(businessSchema(), websiteSchema())} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}
