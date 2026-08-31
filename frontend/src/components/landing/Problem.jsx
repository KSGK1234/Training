import { CalendarDays, Users, Link2, History } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const CARDS = [
  {
    icon: CalendarDays,
    title: "Planned dates aren't enough",
    copy: "A project can appear on schedule while execution is already slowing down.",
    testId: "problem-card-dates",
  },
  {
    icon: Users,
    title: "Capacity changes",
    copy: "Availability, workload, leave and competing projects affect delivery.",
    testId: "problem-card-capacity",
  },
  {
    icon: Link2,
    title: "Dependencies create hidden delays",
    copy: "Blocked tasks, approvals and handoffs can silently move the delivery date.",
    testId: "problem-card-dependencies",
  },
  {
    icon: History,
    title: "Historical performance is ignored",
    copy: "Past delivery pace and rework patterns can provide valuable signals for future estimates.",
    testId: "problem-card-history",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="border-t border-line px-5 py-24 md:px-10 md:py-32" data-testid="problem-section">
      <SectionHeader
        index="01"
        eyebrow="The Problem"
        title="Why Project Delivery Becomes Unpredictable"
        testId="problem-header"
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-testid="problem-grid">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08} className="h-full">
            <div className="group flex h-full flex-col bg-white p-8 transition-colors duration-300 hover:bg-ink" data-testid={c.testId}>
              <div className="mb-8 flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors duration-300 group-hover:border-zinc-700 group-hover:text-white">
                <c.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 group-hover:text-zinc-500">
                P.0{i + 1}
              </p>
              <h3 className="font-display text-lg font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                {c.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1}>
        <p className="mt-20 max-w-4xl border-l-2 border-brand pl-6 font-display text-2xl font-light leading-snug tracking-tight text-ink md:pl-10 md:text-4xl" data-testid="problem-transition">
          The problem isn't simply planning the project.{" "}
          <span className="text-zinc-400">
            The problem is knowing whether the plan is still achievable as execution changes.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
