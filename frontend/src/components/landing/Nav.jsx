import { useLead } from "./LeadDialog";
import { scrollToId } from "@/lib/lenis";
import { ArrowUpRight } from "lucide-react";

const LINKS = [
  { id: "problem", label: "Problem", testId: "nav-link-problem" },
  { id: "solution", label: "Method", testId: "nav-link-method" },
  { id: "confidence", label: "Confidence", testId: "nav-link-confidence" },
  { id: "product", label: "Product", testId: "nav-link-product" },
  { id: "outcomes", label: "Outcomes", testId: "nav-link-outcomes" },
];

export default function Nav() {
  const { openLead } = useLead();
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md" data-testid="site-nav">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between border-x border-line px-5 md:px-10">
        <button onClick={() => scrollToId("hero")} className="flex items-center" data-testid="nav-logo">
          <img src="/assets/logo-brand.png" alt="Pragmr — OnTime" className="h-8 w-auto" />
        </button>
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollToId(l.id)} data-testid={l.testId}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 transition-colors duration-200 hover:text-ink">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-[width] duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>
        <button onClick={() => openLead("prediction")} data-testid="nav-cta-button"
          className="group flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-brand hover:border-brand">
          Get a Prediction
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
}
