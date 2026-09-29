import type { Faq } from "@/content/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, graph } from "@/lib/schema";
import { Plus } from "@/components/ui/Icons";

/** Native <details> accordion: keyboard-accessible, find-in-page friendly, content always in the HTML. */
export function FaqList({ items, schema = true }: { items: Faq[]; schema?: boolean }) {
  return (
    <div className="border-t border-line">
      {schema && <JsonLd data={graph(faqSchema(items))} />}
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium transition-colors hover:text-signal [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500 group-open:rotate-45 group-open:border-signal group-open:text-signal">
              <Plus />
            </span>
          </summary>
          <p className="faq-answer max-w-3xl pb-6 pr-14 leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
