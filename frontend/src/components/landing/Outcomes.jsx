import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const OUTCOMES = [
  { title: "Reduce Delivery Surprises", copy: "Identify emerging risks earlier.", testId: "outcome-card-surprises" },
  { title: "Improve Resource Decisions", copy: "Understand workload and capacity before allocating work.", testId: "outcome-card-resources" },
  { title: "Improve Estimation", copy: "Use actual historical execution to improve future planning.", testId: "outcome-card-estimation" },
  { title: "Increase Delivery Predictability", copy: "Connect planning with real execution.", testId: "outcome-card-predictability" },
];

export default function Outcomes() {
  return (
    <section id="outcomes" className="border-t border-line px-5 py-24 md:px-10 md:py-32" data-testid="outcomes-section">
      <SectionHeader
        index="09"
        eyebrow="Business Outcomes"
        title="Make Better Delivery Decisions Earlier"
        testId="outcomes-header"
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2" data-testid="outcomes-grid">
        {OUTCOMES.map((o, i) => (
          <Reveal key={o.title} delay={i * 0.07} className="h-full">
            <div className="group flex h-full min-h-[220px] flex-col justify-between bg-white p-8 transition-colors duration-300 hover:bg-ink md:p-10" data-testid={o.testId}>
              <span className="font-mono text-xs tracking-[0.2em] text-zinc-300 transition-colors duration-300 group-hover:text-brand">
                O.0{i + 1}
              </span>
              <div className="mt-12">
                <h3 className="font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-white md:text-3xl">
                  {o.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400 md:text-base">
                  {o.copy}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
