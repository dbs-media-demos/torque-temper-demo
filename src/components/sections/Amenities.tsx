import Image from "next/image";
import { amenities } from "@/content/general";
import { Eyebrow } from "@/components/ui/Bits";
import { DoorReveal, Parallax, Reveal } from "@/components/ui/Reveal";
import { defaultBiz, type Biz } from "@/lib/biz";
import { tOf } from "@/lib/i18n";

/** Lounge, loaners and financing: image-led, two photos opening like shop doors. */
export function Amenities({ biz = defaultBiz }: { biz?: Biz }) {
  const t = tOf(biz);
  return (
    <section aria-labelledby="amenities-title" className="theme-dark py-24 lg:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>{t("While you wait")}</Eyebrow>
          <h2 id="amenities-title" className="t-h2 mt-5 max-w-[12ch]">
            {t("A lounge you'd actually work from.")}
          </h2>
          <Reveal as="ul" stagger={0.08} className="mt-12 flex flex-col">
            {amenities.map((a, i) => (
              <li key={a.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-6">
                <span className="font-mono text-xs text-signal">0{i + 1}</span>
                <span>
                  <span className="t-h3 block text-[1.3rem]">{t(a.title)}</span>
                  <span className="mt-2 block leading-relaxed text-muted">{t(a.text)}</span>
                </span>
              </li>
            ))}
          </Reveal>
        </div>
        <div className="grid grid-cols-6 gap-4 lg:col-span-7 lg:pl-8">
          <DoorReveal className="col-span-6 aspect-[16/11]">
            <Parallax className="absolute inset-0" amount={10} reveal={false}>
              <div className="absolute inset-0">
                <Image src="/images/lounge-dark.jpg" alt={t("The customer lounge with leather sofa and armchairs")} fill sizes="(min-width: 1024px) 55vw, 100vw" quality={70} className="object-cover" />
              </div>
            </Parallax>
          </DoorReveal>
          <DoorReveal className="col-span-3 aspect-[4/5]">
            <Image src="/images/lounge-lamp.jpg" alt={t("A quiet corner of the lounge with a lamp and wooden table")} fill sizes="(min-width: 1024px) 27vw, 50vw" quality={65} className="object-cover" />
          </DoorReveal>
          <div className="col-span-3 flex flex-col justify-end gap-3 border border-line p-5">
            <p className="font-display text-5xl font-black [--wdth:70]">{t("5 mi")}</p>
            <p className="text-sm text-muted">{t("Free shuttle radius, 7:30 am to 5 pm. Loaner cars for repairs longer than a day.")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
