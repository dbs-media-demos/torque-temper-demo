import Link from "next/link";
import { Phone, ArrowRight } from "@/components/ui/Icons";
import { telHref } from "@/lib/site";

/** Sticky Call + Book bar on phones. */
export function MobileBar() {
  return (
    <div
      style={{ viewTransitionName: "mobile-bar" }}
      className="theme-dark fixed inset-x-0 bottom-0 z-[100] grid grid-cols-2 gap-2 border-t border-line !bg-asphalt/90 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <a href={telHref} className="btn btn-ghost !min-h-12 w-full">
        <Phone /> Call
      </a>
      <Link href="/book" className="btn btn-signal !min-h-12 w-full">
        Book <ArrowRight />
      </Link>
    </div>
  );
}
