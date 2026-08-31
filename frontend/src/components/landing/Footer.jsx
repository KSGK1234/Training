import { scrollToId } from "@/lib/lenis";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 py-10 md:px-10" data-testid="site-footer">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="block h-3 w-3 bg-brand" />
            <span className="font-display text-lg font-bold tracking-tight text-ink">PRAGMR</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            Planning, execution and delivery visibility in one workspace.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {[["problem", "Problem"], ["solution", "Method"], ["confidence", "Confidence"], ["product", "Product"], ["cta", "Get Started"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollToId(id)} data-testid={`footer-link-${id}`}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors duration-200 hover:text-ink">
              {label}
            </button>
          ))}
        </nav>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">© 2026 Pragmr</p>
      </div>
    </footer>
  );
}
