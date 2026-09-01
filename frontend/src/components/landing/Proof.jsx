import Marquee from "react-fast-marquee";
import SectionHeader from "./SectionHeader";
import { Reveal } from "./Reveal";

const WORDS = ["Plan", "Execute", "Capture", "Analyze", "Predict", "Adjust"];

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
