import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MaskedLine, Reveal } from "./Reveal";
import Gauge from "./Gauge";
import { useLead } from "./LeadDialog";

const SIGNALS = [
  { name: "Schedule", value: 82, tone: "#514EB3" },
  { name: "Progress", value: 74, tone: "#F59E0B" },
  { name: "Capacity", value: 61, tone: "#EF4444" },
  { name: "Dependency", value: 91, tone: "#10B981" },
  { name: "Execution", value: 76, tone: "#F59E0B" },
];

function Dashboard() {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative will-change-transform"
      data-testid="hero-dashboard"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative border border-line bg-white shadow-[0_40px_80px_-40px_rgba(17,17,17,0.25)]"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Pragmr <span className="text-zinc-300">/</span> Delivery Confidence
          </p>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-5 gap-4 px-5 py-6">
          <div className="col-span-2">
            <Gauge value={78} tone="#514EB3" sub="Confidence" testId="hero-gauge" />
            <div className="mt-3 border border-line px-3 py-2 text-center">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">Expected ETA</p>
              <p className="font-mono text-sm font-medium text-ink">AUG 14 <span className="text-amber-500">+2D</span></p>
            </div>
          </div>
          <div className="col-span-3 flex flex-col justify-center gap-3">
            {SIGNALS.map((s, i) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em]">
                  <span className="text-zinc-500">{s.name}</span>
                  <span className="text-ink">{s.value}%</span>
                </div>
                <div className="h-[3px] w-full bg-zinc-100">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: s.tone }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.value}%` }}
                    transition={{ duration: 1.2, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400">
          <span>Capacity <span className="text-red-500">-12%</span></span>
          <span>Rework <span className="text-amber-500">+18%</span></span>
          <span>Scope <span className="text-zinc-600">Stable</span></span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-16 hidden border border-line bg-white px-4 py-3 shadow-lg md:block"
        data-testid="hero-chip-risk"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">Signal</p>
        <p className="font-mono text-xs font-medium text-ink">Rework rising <span className="text-amber-500">+18%</span></p>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -right-4 bottom-10 hidden border border-line bg-ink px-4 py-3 shadow-lg md:block"
        data-testid="hero-chip-verdict"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">Verdict</p>
        <p className="font-mono text-xs font-medium text-white">Deliverable <span className="text-emerald-400">— with adjustment</span></p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { openLead } = useLead();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="hero" ref={sectionRef} className="spotlight relative overflow-hidden pt-16" data-testid="hero-section">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col justify-center border-b border-line px-5 py-20 md:px-10 md:py-28 lg:border-b-0 lg:border-r lg:py-32">
          <Reveal delay={0.1} y={16}>
            <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500" data-testid="hero-overline">
              <span className="h-2 w-2 bg-brand" />
              Pragmr — Delivery Confidence Engine
            </p>
          </Reveal>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.02] text-ink" data-testid="hero-headline">
            <MaskedLine delay={0.15} className="font-light">Predict Project</MaskedLine>
            <MaskedLine delay={0.28} className="font-bold">Delivery <span className="text-brand">Before</span></MaskedLine>
            <MaskedLine delay={0.41} className="font-light">Delays Happen</MaskedLine>
          </h1>
          <Reveal delay={0.55}>
            <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-zinc-500" data-testid="hero-copy">
              Make delivery decisions using real execution data — team capacity, work progress,
              historical delivery pace, dependencies and changing project conditions.
            </p>
          </Reveal>
          <Reveal delay={0.68}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => openLead("prediction")} data-testid="hero-cta-prediction"
                className="group flex items-center gap-3 bg-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-brand">
                Get a Delivery Prediction
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
              <button onClick={() => openLead("demo")} data-testid="hero-cta-demo"
                className="group flex items-center gap-3 border border-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white">
                Book a Demo
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.8}>
            <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-400">
              Capacity <span className="text-zinc-300 mx-2">/</span> Pace <span className="text-zinc-300 mx-2">/</span> Dependencies <span className="text-zinc-300 mx-2">/</span> Rework <span className="text-zinc-300 mx-2">/</span> Scope
            </p>
          </Reveal>
        </div>
        <motion.div style={{ y: parallaxY }} className="lg:col-span-5 flex items-center px-5 py-16 md:px-10 lg:py-24">
          <Dashboard />
        </motion.div>
      </div>
    </section>
  );
}
