import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeContent } from "@/components/home/HomeContent";
import { previewBiz } from "@/lib/preview";
import { ogImageUrl } from "@/lib/seo";
import { num, tOf } from "@/lib/i18n";

// Always the CRM's current data: an edit there shows on the next reload
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const biz = await previewBiz((await params).token);
  const robots = { index: false, follow: false, googleBot: { index: false, follow: false } };
  if (!biz) return { title: "Preview not found", robots };
  const t = tOf(biz);
  const place = [biz.address.city || biz.area, biz.address.region].filter(Boolean).join(", ");
  const title = t("{name} | Auto Repair in {place}", { name: biz.name, place: place || biz.area });
  const description = t("Auto repair in {area}. Call {phone} or book online in about a minute. Photos before any work, prices that match the invoice.", {
    area: biz.area,
    phone: biz.phoneDisplay || t("us"),
  });
  const og = `${ogImageUrl(biz.tagline || `${t("Honest")} ${t("auto repair")} ${t("in {area}", { area: biz.area })}.`, t("Auto repair · {area}", { area: biz.area }))}&${new URLSearchParams({
    name: biz.shortName,
    sub: place ? t("Auto repair · {area}", { area: place }) : t("Auto repair"),
    phone: biz.phoneDisplay,
    meta: biz.rating ? t("{rating} / 5 · {count} Google reviews", { rating: num(biz, biz.rating.value), count: biz.rating.count }) : biz.hoursSummary,
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
