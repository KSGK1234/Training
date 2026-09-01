import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";
import Gauge from "./Gauge";

const CARDS = [
  { name: "Schedule Confidence", q: "Is the expected ETA still achievable?", value: 82, tone: "#514EB3", status: "On Track", statusCls: "text-brand border-brand/30", testId: "confidence-card-schedule" },
  { name: "Progress Confidence", q: "Is actual progress keeping pace with the plan?", value: 74, tone: "#F59E0B", status: "Watch", statusCls: "text-amber-600 border-amber-500/40", testId: "confidence-card-progress" },
  { name: "Capacity Confidence", q: "Does available capacity support the remaining work?", value: 61, tone: "#EF4444", status: "At Risk", statusCls: "text-red-600 border-red-500/40", testId: "confidence-card-capacity" },
  { name: "Dependency Confidence", q: "Are blockers and dependencies threatening delivery?", value: 91, tone: "#10B981", status: "Strong", statusCls: "text-emerald-600 border-emerald-500/40", testId: "confidence-card-dependency" },
  { name: "Execution Confidence", q: "Are bottlenecks, aging and rework increasing delivery risk?", value: 76, tone: "#F59E0B", status: "Watch", statusCls: "text-amber-600 border-amber-500/40", testId: "confidence-card-execution" },
];

export default function Confidence() {
  return (
    <section id="confidence" className="border-t border-line bg-white px-5 py-24 md:px-10 md:py-32" data-testid="confidence-section">
      <SectionHeader
        index="06"
        eyebrow="Delivery Confidence"
        title="See the Signals Behind Delivery Confidence"
        testId="confidence-header"
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-testid="confidence-grid">
        {CARDS.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.07} className={`h-full ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            <div className="flex h-full flex-col items-center bg-paper p-8" data-testid={c.testId}>
              <div className="w-36">
                <Gauge value={c.value} tone={c.tone} sub={c.status} />
              </div>
              <span className={`mt-4 border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.22em] ${c.statusCls}`}>
                {c.status}
              </span>
              <h3 className="mt-5 text-center font-display text-lg font-medium tracking-tight text-ink">{c.name}</h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-zinc-500">{c.q}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.35} className="h-full">
          <div className="flex h-full flex-col justify-center bg-ink p-8" data-testid="confidence-statement-card">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">The shift</p>
            <p className="mt-4 font-display text-xl font-light leading-snug tracking-tight text-white md:text-2xl">
              Instead of asking <span className="text-zinc-500 line-through decoration-zinc-600">“Are we on track?”</span>{" "}
              ask <span className="text-brandlight">“What evidence tells us whether we can still deliver?”</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
