import { Map, Play, Database, ScanSearch, Radar, SlidersHorizontal, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const STEPS = [
  { icon: Map, name: "Plan", copy: "Projects, milestones, work orders and tasks.", testId: "solution-step-plan" },
  { icon: Play, name: "Execute", copy: "Teams perform and update the actual work.", testId: "solution-step-execute" },
  { icon: Database, name: "Capture", copy: "Pragmr captures execution, capacity and workflow signals.", testId: "solution-step-capture" },
  { icon: ScanSearch, name: "Analyze", copy: "Current performance is compared with historical patterns and planned outcomes.", testId: "solution-step-analyze" },
  { icon: Radar, name: "Predict", copy: "Identify whether delivery remains achievable.", testId: "solution-step-predict" },
  { icon: SlidersHorizontal, name: "Adjust", copy: "Reallocate, reprioritize, re-estimate or intervene early.", testId: "solution-step-adjust" },
];

export default function Solution() {
  return (
    <section id="solution" className="border-t border-line px-5 py-24 md:px-10 md:py-32" data-testid="solution-section">
      <SectionHeader
        index="03"
        eyebrow="The Pragmr Solution"
        title="Turn Work Execution Data Into Delivery Confidence"
        testId="solution-header"
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-6" data-testid="solution-flow">
        {STEPS.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.07} className="h-full">
            <div className="group relative flex h-full flex-col bg-white p-6" data-testid={s.testId}>
              <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400">0{i + 1}</span>
                <s.icon className="h-4 w-4 text-zinc-400 transition-colors duration-300 group-hover:text-brand" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-medium tracking-tight text-ink">{s.name}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{s.copy}</p>
              {i < STEPS.length - 1 && (
                <ArrowRight className="absolute -right-[9px] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-zinc-400 lg:block" strokeWidth={1.5} />
              )}
              <span className="absolute inset-x-0 bottom-0 h-[2px] w-0 bg-brand transition-[width] duration-500 group-hover:w-full" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
