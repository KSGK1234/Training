import Marquee from "react-fast-marquee";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const WORDS = ["Plan", "Execute", "Capture", "Analyze", "Predict", "Adjust"];

const PARTNERS = [
  { file: "partner-infinite-engineers.png", name: "Infinite Engineers" },
  { file: "partner-beyond-sustainability.png", name: "Beyond Sustainability" },
  { file: "partner-start-school.png", name: "Start School" },
  { file: "partner-stratschool.png", name: "StratSchool" },
  { file: "partner-worldly.png", name: "Worldly" },
  { file: "partner-tech-sukras.png", name: "Tech Sukras" },
  { file: "partner-technexus.png", name: "Technexus Learning" },
  { file: "partner-saga-soft.png", name: "Saga Soft" },
  { file: "partner-9.png", name: "Partner organization" },
  { file: "partner-10.png", name: "Partner organization" },
  { file: "partner-pibi-technologies.png", name: "PI-BI Technologies" },
  { file: "partner-8-queens.png", name: "8 Queens" },
];

export default function Proof() {
  return (
    <section id="proof" className="border-t border-line bg-white" data-testid="proof-section">
      <div className="px-5 pt-24 md:px-10 md:pt-32">
        <SectionHeader
          index="10"
          eyebrow="Proof"
          title="Built for Teams That Care About Delivery"
          copy="See how Pragmr connects planning, execution and delivery visibility in one workspace."
          testId="proof-header"
        />
      </div>
      <Reveal>
        <div className="border-t border-line" data-testid="proof-partners">
          <p className="px-5 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400 md:px-10">
            Trusted partners — Collaborating for innovation and delivering excellence
          </p>
          <div className="py-8">
            <Marquee speed={30} gradient={false} pauseOnHover>
              {PARTNERS.map((p) => (
                <img
                  key={p.file}
                  src={`/assets/partners/${p.file}`}
                  alt={p.name}
                  loading="lazy"
                  className="mx-10 h-12 w-auto object-contain grayscale opacity-70 md:h-14"
                />
              ))}
            </Marquee>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className="border-y border-line py-10 md:py-14" data-testid="proof-marquee">
          <Marquee speed={35} gradient={false} pauseOnHover>
            {WORDS.map((w, i) => (
              <span key={w} className="flex items-center">
                <span className={`mx-8 font-display text-5xl font-bold tracking-tighter md:mx-12 md:text-7xl ${i % 2 === 0 ? "text-ink" : "text-outline"}`}>
                  {w}
                </span>
                <span className="h-3 w-3 rotate-45 bg-brand" />
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
      <div className="px-5 pb-24 pt-12 md:px-10 md:pb-32">
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base" data-testid="proof-note">
            Pragmr is onboarding its first teams now. Every number you see in the product comes from your
            own execution data — capacity, pace, dependencies, rework — not from manufactured benchmarks.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
