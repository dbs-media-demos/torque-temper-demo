import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { noindex, site, siteUrl } from "@/lib/site";
import { businessSchema, graph, websiteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBar } from "@/components/layout/MobileBar";
import { DemoPill } from "@/components/layout/DemoPill";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${site.name} | Auto Repair in East Dallas, TX`, template: `%s | ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "DBS Media", url: site.dbsUrl }],
  creator: "DBS Media",
  formatDetection: { telephone: false },
  robots: noindex ? { index: false, follow: false, googleBot: { index: false, follow: false } } : { index: true, follow: true },
  category: "automotive",
};

export const viewport: Viewport = {
  themeColor: "#0e0f11",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={fontVariables} suppressHydrationWarning>
      <head>
        <JsonLd data={graph(businessSchema(), websiteSchema())} />
      </head>
      <body className="theme-dark min-h-screen">
        <a href="#main" className="btn btn-signal fixed left-4 top-4 z-[300] -translate-y-24 focus:translate-y-0">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <MobileBar />
        <DemoPill />
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
