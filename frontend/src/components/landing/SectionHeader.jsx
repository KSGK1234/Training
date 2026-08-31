import { Reveal } from "./Reveal";

export default function SectionHeader({ index, eyebrow, title, copy, testId }) {
  return (
    <div className="mb-14 md:mb-20 max-w-4xl" data-testid={testId}>
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 mb-6">
          <span className="text-brand">[ {index} ]</span>
          <span className="mx-3 text-zinc-300">/</span>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.02] text-ink">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={0.16}>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-500 max-w-2xl">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}
