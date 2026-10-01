import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/components/home/HomeContent";
import { previewBiz } from "@/lib/preview";
import { ogImageUrl } from "@/lib/seo";

// Always the CRM's current data: an edit there shows on the next reload
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const biz = await previewBiz((await params).token);
  const robots = { index: false, follow: false, googleBot: { index: false, follow: false } };
  if (!biz) return { title: "Preview not found", robots };
  const place = [biz.address.city || biz.area, biz.address.region].filter(Boolean).join(", ");
  const title = `${biz.name} | Auto Repair in ${place || biz.area}`;
  const description = `Auto repair in ${biz.area}. Call ${biz.phoneDisplay || "us"} or book online in about a minute. Photos before any work, prices that match the invoice.`;
  const og = `${ogImageUrl(biz.tagline || `Honest auto repair in ${biz.area}.`, `Auto repair · ${biz.area}`)}&${new URLSearchParams({
    name: biz.shortName,
    sub: place ? `Auto repair · ${place}` : "Auto repair",
    phone: biz.phoneDisplay,
    meta: biz.rating ? `${biz.rating.value} / 5 · ${biz.rating.count} Google reviews` : biz.hoursSummary,
  })}`;
  return {
    title: { absolute: title },
    description,
    robots,
    alternates: { canonical: null },
    openGraph: { type: "website", siteName: biz.name, title, description, images: [{ url: og, width: 1200, height: 630, alt: biz.name }] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function PreviewPage({ params }: Props) {
  const biz = await previewBiz((await params).token);
  if (!biz) notFound();
  return <HomeContent biz={biz} />;
}
