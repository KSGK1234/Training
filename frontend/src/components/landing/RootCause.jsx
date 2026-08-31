import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { Reveal, EASE } from "./Reveal";

const PILLARS = [
  { name: "Capacity", items: ["Availability", "Workload", "Leave"], testId: "rootcause-pillar-capacity" },
  { name: "Capability", items: ["Skills", "Ownership", "Assignment"], testId: "rootcause-pillar-capability" },
  { name: "Execution", items: ["Progress", "Pace", "Rework"], testId: "rootcause-pillar-execution" },
];

function VLine({ delay = 0, className = "" }) {
  return (
    <motion.div
      className={`w-px bg-zinc-300 ${className}`}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{ transformOrigin: "top" }}
    />
  );
}

export default function RootCause() {
  return (
    <section id="root-cause" className="border-t border-line bg-white px-5 py-24 md:px-10 md:py-32" data-testid="rootcause-section">
      <SectionHeader
        index="02"
        eyebrow="Root Cause"
        title="Delivery Depends on More Than the Plan"
        testId="rootcause-header"
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center" data-testid="rootcause-diagram">
        <Reveal>
          <div className="border border-ink bg-ink px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white" data-testid="rootcause-delivery-node">
            Delivery
          </div>
        </Reveal>
        <VLine className="h-10" delay={0.2} />
        <div className="h-px w-full bg-zinc-300" />
        <div className="grid w-full grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.name} className="flex flex-col items-center" data-testid={p.testId}>
              <VLine className="h-10" delay={0.3 + i * 0.1} />
              <Reveal delay={0.35 + i * 0.1} className="w-full">
                <div className="mx-1 border border-line bg-paper sm:mx-3">
                  <p className="border-b border-line px-3 py-3 text-center font-display text-sm font-medium tracking-tight text-ink sm:text-base">
                    {p.name}
                  </p>
                  {p.items.map((item) => (
                    <p key={item} className="border-b border-line px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500 last:border-b-0 sm:text-[11px]">
                      {item}
                    </p>
                  ))}
                </div>
              </Reveal>
              <VLine className="h-10" delay={0.6 + i * 0.1} />
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-zinc-300" />
        <VLine className="h-10" delay={0.8} />
        <Reveal delay={0.85}>
          <div className="border border-brand bg-brand px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-white" data-testid="rootcause-confidence-node">
            Delivery Confidence
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <p className="mt-16 text-center font-display text-xl font-light tracking-tight text-zinc-500 md:text-2xl" data-testid="rootcause-statement">
          When these signals change, <span className="text-ink">delivery probability changes.</span>
        </p>
      </Reveal>
    </section>
  );
}
