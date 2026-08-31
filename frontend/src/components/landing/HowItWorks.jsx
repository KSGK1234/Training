import { LayoutGrid, FileText, CheckSquare, Columns3, UserCheck, Flag, BarChart3 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const MODULES = [
  { icon: LayoutGrid, name: "Planner", copy: "Map projects, milestones and work in one structured plan.", testId: "module-planner" },
  { icon: FileText, name: "Work Orders", copy: "Turn plans into scoped, assignable units of work.", testId: "module-work-orders" },
  { icon: CheckSquare, name: "Tasks", copy: "Break work into trackable execution items.", testId: "module-tasks" },
  { icon: Columns3, name: "Kanban", copy: "See work move, stall and block in real time.", testId: "module-kanban" },
  { icon: UserCheck, name: "Smart Assign", copy: "Match work to the right people by skills and capacity.", testId: "module-smart-assign" },
  { icon: Flag, name: "Milestones", copy: "Track the checkpoints that define delivery.", testId: "module-milestones" },
  { icon: BarChart3, name: "Analytics", copy: "Compare execution against plan and history.", testId: "module-analytics" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-white px-5 py-24 md:px-10 md:py-32" data-testid="howitworks-section">
      <SectionHeader
        index="04"
        eyebrow="How It Works"
        title="From Everyday Work to Predictable Delivery"
        testId="howitworks-header"
      />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-7" data-testid="howitworks-modules">
        {MODULES.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06} className="h-full">
            <div className="group flex h-full flex-col bg-paper p-5 transition-colors duration-300 hover:bg-ink" data-testid={m.testId}>
              <m.icon className="mb-6 h-5 w-5 text-zinc-400 transition-colors duration-300 group-hover:text-brand" strokeWidth={1.5} />
              <h3 className="font-display text-base font-medium tracking-tight text-ink transition-colors duration-300 group-hover:text-white">
                {m.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
                {m.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
