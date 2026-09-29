import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { t: "Inspect", d: "A technician checks the car and measures what matters." },
  { t: "Photograph", d: "Photos and numbers go to your phone, with a price per item." },
  { t: "Approve", d: "You tap approve on what you want done. Nothing else happens." },
  { t: "Repair", d: "OEM-grade parts, factory torque specs, a paint mark on every critical bolt." },
  { t: "Road test", d: "A tech drives it and signs the ticket before you get the keys." },
];

/** The five-step work order every job follows. */
export function ProcessSteps() {
  return (
    <Reveal as="ol" stagger={0.08} className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li key={s.t} className="relative flex min-h-56 flex-col justify-between gap-8 bg-bg p-6">
          <span className="font-display text-6xl font-black leading-none text-faint/40 [--wdth:62]">0{i + 1}</span>
          <span>
            <span className="t-h3 block">{s.t}</span>
            <span className="mt-2 block text-sm leading-relaxed text-muted">{s.d}</span>
          </span>
          {i < steps.length - 1 && <span aria-hidden className="absolute right-4 top-7 hidden font-mono text-signal lg:block">→</span>}
        </li>
      ))}
    </Reveal>
  );
}
