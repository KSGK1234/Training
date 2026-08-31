export default function Gauge({ value = 78, tone = "#0047FF", label, sub, sizeClass = "w-full", testId }) {
  const ticks = Array.from({ length: 28 }, (_, i) => (i * 270) / 27 - 135);
  return (
    <div className={`relative ${sizeClass}`} data-testid={testId}>
      <svg viewBox="0 0 100 100" className="w-full">
        <circle cx="50" cy="50" r="41" fill="none" stroke="#E4E4E7" strokeWidth="3.5"
          pathLength="100" strokeDasharray="75 100" strokeLinecap="butt"
          transform="rotate(135 50 50)" />
        <circle cx="50" cy="50" r="41" fill="none" stroke={tone} strokeWidth="3.5"
          pathLength="100" strokeDasharray={`${(value / 100) * 75} 100`} strokeLinecap="butt"
          transform="rotate(135 50 50)" />
        {ticks.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x1 = 50 + 47.5 * Math.sin(rad);
          const y1 = 50 - 47.5 * Math.cos(rad);
          const x2 = 50 + 44.5 * Math.sin(rad);
          const y2 = 50 - 44.5 * Math.cos(rad);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 9 === 0 ? "#A1A1AA" : "#E4E4E7"} strokeWidth="0.6" />;
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="font-mono text-2xl font-medium leading-none text-ink" data-testid={testId ? `${testId}-value` : undefined}>
          {value}<span className="text-sm text-zinc-400">%</span>
        </p>
        {sub && (
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-zinc-400">{sub}</p>
        )}
      </div>
      {label && (
        <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">{label}</p>
      )}
    </div>
  );
}
