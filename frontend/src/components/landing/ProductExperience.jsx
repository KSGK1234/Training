import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

function Frame({ label, testId, children }) {
  return (
    <div className="group flex h-full flex-col border border-line bg-white" data-testid={testId}>
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{label}</span>
        <span className="border border-line px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-400">UI Preview</span>
      </div>
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}

const Bar = ({ w, tone = "bg-zinc-200" }) => <div className={`h-2 ${tone}`} style={{ width: w }} />;

function PlannerMock() {
  return (
    <div className="space-y-3">
      <Bar w="40%" tone="bg-ink" />
      {[["70%", "bg-brand"], ["45%", "bg-zinc-300"], ["85%", "bg-brand"], ["30%", "bg-zinc-300"]].map(([w, t], i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-2 w-12 bg-zinc-200" />
          <div className="h-3 flex-1 bg-zinc-100"><div className={`h-full ${t}`} style={{ width: w }} /></div>
        </div>
      ))}
    </div>
  );
}

function KanbanMock() {
  return (
    <img
      src="/assets/hero-task-board.png"
      alt="Pragmr Kanban task board — live product"
      loading="lazy"
      className="h-full w-full border border-line object-cover object-left-top"
    />
  );
}

function WorkOrderMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Bar w="45%" tone="bg-ink" />
        <span className="border border-brand/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.15em] text-brand">In Progress</span>
      </div>
      <Bar w="90%" /><Bar w="75%" /><Bar w="82%" />
      <div className="pt-1">
        <div className="mb-1 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-400"><span>Progress</span><span>64%</span></div>
        <div className="h-1.5 w-full bg-zinc-100"><div className="h-full w-[64%] bg-brand" /></div>
      </div>
    </div>
  );
}

function MilestonesMock() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute inset-x-2 top-1/2 h-px bg-zinc-200" />
        {["bg-emerald-500", "bg-emerald-500", "bg-brand", "bg-zinc-300"].map((t, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className={`relative z-10 h-3 w-3 rounded-full border-2 border-white ${t}`} />
            <span className="h-1.5 w-8 bg-zinc-200" />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <span className="border border-line px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">Next: Phase 2 Handoff — Aug 02</span>
      </div>
    </div>
  );
}

function CalendarMock() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} className={`aspect-square border border-line ${[4, 11, 12, 19].includes(i) ? "bg-brand/15" : i === 17 ? "bg-amber-400/30" : "bg-white"}`}>
          {[4, 11, 12, 17, 19].includes(i) && <div className={`m-0.5 h-1 w-2/3 ${i === 17 ? "bg-amber-500" : "bg-brand"}`} />}
        </div>
      ))}
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="flex h-full flex-col justify-end">
      <div className="flex h-32 items-end justify-between gap-1.5">
        {[35, 50, 42, 62, 55, 74, 68, 88].map((h, i) => (
          <div key={i} className={`w-full ${i === 7 ? "bg-brand" : "bg-zinc-200"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-zinc-400">
        <span>Planned pace</span><span className="text-brand">Actual +12%</span>
      </div>
    </div>
  );
}

const ITEMS = [
  { label: "Planner", Mock: PlannerMock, testId: "product-mock-planner" },
  { label: "Kanban", Mock: KanbanMock, testId: "product-mock-kanban" },
  { label: "Work Order", Mock: WorkOrderMock, testId: "product-mock-workorder" },
  { label: "Milestones", Mock: MilestonesMock, testId: "product-mock-milestones" },
  { label: "Calendar", Mock: CalendarMock, testId: "product-mock-calendar" },
  { label: "Analytics", Mock: AnalyticsMock, testId: "product-mock-analytics" },
];

export default function ProductExperience() {
  return (
    <section id="product" className="border-t border-line bg-white px-5 py-24 md:px-10 md:py-32" data-testid="product-section">
      <SectionHeader
        index="08"
        eyebrow="Product Experience"
        title="Everything Your Team Needs to Connect Planning With Execution"
        testId="product-header"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="product-grid">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className="h-full">
            <div className="h-full min-h-[240px] transition-transform duration-500 hover:-translate-y-1.5">
              <Frame label={item.label} testId={item.testId}>
                <div className="h-44"><item.Mock /></div>
              </Frame>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400" data-testid="product-note">
          Okay, this isn't just an idea. There is an actual system behind it.
        </p>
      </Reveal>
    </section>
  );
}
