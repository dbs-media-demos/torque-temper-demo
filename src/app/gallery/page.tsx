import { PageShell } from "@/components/layout/PageShell";
import { PageHero, SectionHead } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { GalleryGrid, type Photo } from "@/components/interactive/GalleryGrid";
import { BeforeAfter } from "@/components/interactive/BeforeAfter";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { graph, webPageSchema } from "@/lib/schema";

const title = "Inside the Shop: Photos from Our Bays";
const description = "Look inside Torque & Temper: eight bays, the alignment rack, the lounge and the work itself. The same kind of photos we text you before any repair.";

export const metadata = buildMetadata({ title, description, path: "/gallery", eyebrow: "Inside the shop" });

const photos: Photo[] = [
  { src: "/images/lift-red-car.jpg", alt: "A classic car raised on a two-post lift", tag: "Bays", tall: true },
  { src: "/images/shop-bay-overhead.jpg", alt: "Two technicians working on a car in the bay", tag: "Bays" },
  { src: "/images/brake-rotor-blue.jpg", alt: "A front brake rotor and caliper under shop lights", tag: "Work" },
  { src: "/images/engine-v8.jpg", alt: "A clean V8 engine after service", tag: "Work", tall: true },
  { src: "/images/tool-wall-dark.jpg", alt: "The tool wall with oils and fluids", tag: "Tools" },
  { src: "/images/lounge-dark.jpg", alt: "The customer lounge with leather seating", tag: "Lounge" },
  { src: "/images/sparks-grinder.jpg", alt: "Sparks from an angle grinder cutting a seized bolt", tag: "Work", tall: true },
  { src: "/images/wrenches.jpg", alt: "Combination wrenches hanging in order on the wall", tag: "Tools" },
  { src: "/images/lift-classic.jpg", alt: "A classic car on the lift with the hood open", tag: "Bays", tall: true },
  { src: "/images/hands-work.jpg", alt: "A technician's hands working on a component", tag: "Work" },
  { src: "/images/diag-laptop.jpg", alt: "Diagnostic laptop connected to a car", tag: "Work", tall: true },
  { src: "/images/sockets.jpg", alt: "A tray of sockets", tag: "Tools" },
  { src: "/images/lift-red-pair.jpg", alt: "Two red cars, one raised on a lift", tag: "Bays", tall: true },
  { src: "/images/lounge-lamp.jpg", alt: "A quiet corner of the lounge", tag: "Lounge", tall: true },
  { src: "/images/engine-bay-2.jpg", alt: "An engine bay ready for inspection", tag: "Work" },
  { src: "/images/wrench-set.jpg", alt: "A wrench set laid out in a toolbox drawer", tag: "Tools" },
  { src: "/images/tech-under-lift.jpg", alt: "A technician inspecting the underside of a car", tag: "Bays" },
  { src: "/images/bench-backlit.jpg", alt: "The workbench backlit at the end of the day", tag: "Bays" },
];

export default function GalleryPage() {
  return (
    <PageShell>
      <JsonLd
        data={graph(webPageSchema({ path: "/gallery", name: title, description, type: "CollectionPage" }), {
          "@type": "ImageGallery",
          name: title,
          image: photos.map((p) => ({ "@type": "ImageObject", contentUrl: absoluteUrl(p.src), caption: p.alt })),
        })}
      />
      <PageHero
        crumbs={[{ name: "Inside the shop", path: "/gallery" }]}
        eyebrow="Eight bays · no secrets"
        title={
          <>
            Inside the shop<span className="text-signal">.</span>
          </>
        }
        lead="A window into the bays. The same kind of photos land on your phone before we touch your car."
        image="/images/welder-silhouette.jpg"
        imageAlt="A technician's silhouette working at the bench in the dark shop"
      />
      <section aria-labelledby="ba-title" className="theme-chalk py-20 lg:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <SectionHead
            id="ba-title"
            eyebrow="Before / after"
            title="What came off. What went on."
            text="Drag the handle. The rotor on the left was pulled off a 2015 Altima in Garland; the one on the right is what replaced it."
          />
          <BeforeAfter
            before="/images/brake-rotor-red.jpg"
            after="/images/brake-rotor.jpg"
            beforeAlt="A rusted, grooved brake rotor removed from a customer's car"
            afterAlt="A new, clean brake rotor installed on the car"
          />
        </div>
      </section>
      <section aria-labelledby="photos-title" className="theme-dark py-20 lg:py-28">
        <div className="wrap">
          <h2 id="photos-title" className="t-h2">
            The bays
          </h2>
          <div className="mt-8">
            <GalleryGrid photos={photos} />
          </div>
        </div>
      </section>
      <CtaBand />
    </PageShell>
  );
}
