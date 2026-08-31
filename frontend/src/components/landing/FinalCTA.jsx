import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskedLine, Reveal } from "./Reveal";
import { useLead } from "./LeadDialog";

export default function FinalCTA() {
  const { openLead } = useLead();
  return (
    <section id="cta" className="border-t border-line bg-ink px-5 py-28 md:px-10 md:py-40" data-testid="finalcta-section">
      <p className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
        <span className="text-brand">[ 11 ]</span>
        <span className="mx-3 text-zinc-700">/</span>
        Get Started
      </p>
      <h2 className="max-w-5xl font-display text-4xl font-medium tracking-tighter leading-[1.02] text-white sm:text-5xl lg:text-6xl" data-testid="finalcta-headline">
        <MaskedLine once>Know Whether Your Project</MaskedLine>
        <MaskedLine once delay={0.12}>Can Still <span className="text-brand">Deliver</span></MaskedLine>
      </h2>
      <Reveal delay={0.25}>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg" data-testid="finalcta-copy">
          Stop relying only on status updates. Understand the signals behind your delivery confidence.
        </p>
      </Reveal>
      <Reveal delay={0.35}>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <button onClick={() => openLead("prediction")} data-testid="finalcta-cta-prediction"
            className="group flex items-center gap-3 bg-white px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-brand hover:text-white">
            Get a Delivery Prediction
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
          <button onClick={() => openLead("demo")} data-testid="finalcta-cta-demo"
            className="group flex items-center gap-3 border border-zinc-600 px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink">
            Book a Demo
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </Reveal>
      <Reveal delay={0.45}>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500" data-testid="finalcta-microcopy">
          No commitment. See how Pragmr works with your delivery workflow.
        </p>
      </Reveal>
    </section>
  );
}
