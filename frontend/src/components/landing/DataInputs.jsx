import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const SIGNALS = [
  { signal: "Team capacity", tells: "Can the available team actually handle the remaining work?" },
  { signal: "Task progress", tells: "How much work has actually been completed?" },
  { signal: "Historical delivery pace", tells: "How long does comparable work typically take?" },
  { signal: "Dependencies", tells: "What could prevent work from progressing?" },
  { signal: "Workload", tells: "Is someone overloaded across projects?" },
  { signal: "Skills", tells: "Is the assigned person suitable for the work?" },
  { signal: "Rework", tells: "Is execution taking longer than expected?" },
  { signal: "Scope changes", tells: "Has the original delivery assumption changed?" },
];

export default function DataInputs() {
  return (
    <section id="data" className="border-t border-line px-5 py-24 md:px-10 md:py-32" data-testid="data-section">
      <SectionHeader
        index="05"
        eyebrow="Data Inputs"
        title="Pragmr Looks Beyond Project Status"
        testId="data-header"
      />
      <div className="border border-line" data-testid="data-table">
        <div className="grid grid-cols-1 border-b border-line bg-ink md:grid-cols-2">
          <p className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white md:px-10">Data Signal</p>
          <p className="hidden px-6 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white md:block md:px-10">What It Tells You</p>
        </div>
        {SIGNALS.map((s, i) => (
          <Reveal key={s.signal} delay={i * 0.04} y={16}>
            <div
              className="group grid grid-cols-1 border-b border-line bg-white transition-colors duration-200 last:border-b-0 hover:bg-paper md:grid-cols-2"
              data-testid={`data-row-${i}`}
            >
              <p className="flex items-center gap-4 px-6 pt-5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink md:px-10 md:py-6">
                <span className="text-zinc-300 group-hover:text-brand transition-colors duration-200">0{i + 1}</span>
                {s.signal}
              </p>
              <p className="px-6 pb-5 pt-1 text-sm leading-relaxed text-zinc-500 md:px-10 md:py-6 md:pt-6">
                {s.tells}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
