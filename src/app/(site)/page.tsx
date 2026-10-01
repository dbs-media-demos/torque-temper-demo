import { JsonLd } from "@/components/seo/JsonLd";
import { HomeContent } from "@/components/home/HomeContent";
import { buildMetadata } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const title = `${site.name} | Honest Auto Repair in East Dallas, TX`;
const description =
  "Family-owned, ASE-certified auto repair in East Dallas since 2009. Photos before any work, upfront prices, 24-month/24,000-mile warranty. Serving Lakewood, Lake Highlands, Garland and Mesquite.";

export const metadata = buildMetadata({ title, description, path: "/", absoluteTitle: true, eyebrow: "East Dallas · since 2009" });

export default function HomePage() {
  return (
    <HomeContent>
      <JsonLd data={graph(webPageSchema({ path: "/", name: title, description, image: "/images/hero-poster.jpg" }))} />
    </HomeContent>
  );
}
