import Image from "next/image";
import { StretchHeading } from "@/components/ui/StretchHeading";
import { BookButton, CallButton } from "@/components/ui/Bits";
import { OpenBadge } from "@/components/ui/OpenBadge";
import { Parallax } from "@/components/ui/Reveal";
import { defaultBiz, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";

/** Closing call to action on every page: headlights in the dark, one huge question. */
export function CtaBand({
  title = "Warning light on?",
  text = "Book online in about a minute, or call and talk to a real service advisor. Same-day appointments most days.",
  image = "/images/headlights-dark.jpg",
  biz = defaultBiz,
}: {
  title?: string;
  text?: string;
  image?: string;
  biz?: Biz;
}) {
  const t = tOf(biz);
  return (
    <section aria-labelledby="cta-title" className="theme-dark relative overflow-hidden">
      <Parallax className="absolute inset-0" amount={14} reveal={false}>
        <div className="absolute inset-0">
          <Image src={image} alt="" fill sizes="100vw" quality={60} className="object-cover opacity-70" />
        </div>
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-asphalt/70" />
      <div className="wrap relative flex min-h-[80svh] flex-col items-center justify-center py-28 text-center">
        <OpenBadge className="text-chalk/80" />
        <StretchHeading id="cta-title" className="mt-8 text-[clamp(3.2rem,11vw,12rem)] text-chalk" from={62} to={112}>
          {t(title)}
        </StretchHeading>
        <p className="t-lead mt-8 max-w-xl text-chalk/80">{t(text)}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <BookButton />
          <CallButton />
        </div>
      </div>
    </section>
  );
}
