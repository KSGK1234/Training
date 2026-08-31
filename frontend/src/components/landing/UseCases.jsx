import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const PRIMARY = {
  name: "Project-Based Service Businesses",
  copy: "You sell delivery dates. Pragmr tells you whether each commitment is still achievable — while there is still time to act on it.",
};

const CASES = [
  {
    name: "Engineering Teams",
    copy: "Identify capacity and execution risks before they affect delivery commitments.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwzfHxlbmdpbmVlcmluZyUyMHByb2plY3QlMjBibHVlcHJpbnQlMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzg4MTYzNzc1fDA&ixlib=rb-4.1.0&q=85",
    testId: "usecase-engineering",
  },
  {
    name: "Environmental Consulting",
    copy: "Keep multi-site, multi-phase fieldwork predictable as conditions and approvals change.",
    img: "https://images.unsplash.com/photo-1755692879778-11f911904e52?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxlbnZpcm9ubWVudGFsJTIwY29uc3VsdGluZyUyMG5hdHVyZSUyMHRlYW18ZW58MHx8fHwxNzg4MTYzNzc1fDA&ixlib=rb-4.1.0&q=85",
    testId: "usecase-environmental",
  },
  {
    name: "Digital & Professional Services",
    copy: "See workload and utilization pressure building before it slips a client date.",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwYWdlbmN5JTIwcHJvZmVzc2lvbmFscyUyMHdvcmtpbmd8ZW58MHx8fHwxNzg4MTYzNzc2fDA&ixlib=rb-4.1.0&q=85",
    testId: "usecase-digital",
  },
  {
    name: "Product Development Teams",
    copy: "Connect roadmap commitments to actual execution pace, rework and team load.",
    img: "https://images.unsplash.com/photo-1600869009498-8d429f88d4f5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODF8MHwxfHNlYXJjaHwzfHxwcm9kdWN0JTIwZGV2ZWxvcG1lbnQlMjBpbmR1c3RyaWFsJTIwZGVzaWdufGVufDB8fHx8MTc4ODE2Mzc3NXww&ixlib=rb-4.1.0&q=85",
    testId: "usecase-product",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="border-t border-line px-5 py-24 md:px-10 md:py-32" data-testid="usecases-section">
      <SectionHeader
        index="07"
        eyebrow="Use Cases"
        title="Where Delivery Prediction Creates Value"
        testId="usecases-header"
      />
      <Reveal>
        <div className="mb-px flex flex-col justify-between gap-6 border border-line bg-ink p-8 md:flex-row md:items-end md:p-12" data-testid="usecase-primary">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-brand">Primary Market</p>
            <h3 className="font-display text-2xl font-medium tracking-tight text-white md:text-4xl">{PRIMARY.name}</h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400 md:text-base">{PRIMARY.copy}</p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-px border border-t-0 border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-testid="usecases-grid">
        {CASES.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.07} className="h-full">
            <div className="group flex h-full flex-col bg-white" data-testid={c.testId}>
              <div className="overflow-hidden border-b border-line">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">{c.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
