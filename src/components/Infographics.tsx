import { useEffect, useRef, useState } from "react";

// ── Hook: run a callback when element enters viewport ─────────────────────
function useInView<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, ...options }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, options]);
  return { ref, inView };
}

// ── Animated number counter ────────────────────────────────────────────────
export const AnimatedCounter = ({
  to,
  prefix = "",
  suffix = "",
  duration = 1400,
  decimals = 0,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) => {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * to);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  const formatted = value.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

// ── Horizontal stacked bars with animated fill ────────────────────────────
export const StackBars = ({
  items,
  unit = "$",
}: {
  items: { label: string; value: number; sub?: string; color?: string }[];
  unit?: string;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div ref={ref} className="space-y-4 my-8">
      {items.map((it, i) => {
        const pct = (it.value / max) * 100;
        return (
          <div key={it.label}>
            <div className="flex items-baseline justify-between mb-1">
              <div>
                <span className="font-bold text-base md:text-lg">{it.label}</span>
                {it.sub && <span className="ml-2 text-sm text-muted-foreground">{it.sub}</span>}
              </div>
              <span className="font-extrabold text-base md:text-lg tabular-nums">
                {unit}
                {it.value.toLocaleString()}
              </span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-[1200ms] ease-out ${
                  it.color ?? "bg-primary"
                }`}
                style={{
                  width: inView ? `${pct}%` : "0%",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ── Vertical timeline with staggered reveal ────────────────────────────────
export const Timeline = ({
  steps,
}: {
  steps: { title: string; body: string; tag?: string }[];
}) => {
  const { ref, inView } = useInView<HTMLOListElement>();
  return (
    <ol
      ref={ref}
      className="relative border-l-2 border-primary/30 pl-8 space-y-8 my-10"
    >
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="relative transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transitionDelay: `${i * 150}ms`,
          }}
        >
          <span className="absolute -left-[38px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
          {s.tag && (
            <div className="text-xs font-bold tracking-wider uppercase text-primary mb-1">
              {s.tag}
            </div>
          )}
          <h4 className="text-xl font-bold mb-1">{s.title}</h4>
          <p className="text-base leading-relaxed text-muted-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  );
};

// ── Pie/donut chart (animated arc fills) ──────────────────────────────────
export const DonutChart = ({
  slices,
  size = 220,
  stroke = 28,
}: {
  slices: { label: string; value: number; color: string }[];
  size?: number;
  stroke?: number;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  const total = slices.reduce((a, b) => a + b.value, 0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 my-8">
      <svg width={size} height={size} className="shrink-0 -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted"
          strokeWidth={stroke}
        />
        {slices.map((s, i) => {
          const length = (s.value / total) * circumference;
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              className={s.color}
              stroke="currentColor"
              strokeWidth={stroke}
              strokeDasharray={`${inView ? length : 0} ${circumference}`}
              strokeDashoffset={-offset}
              style={{
                transition: "stroke-dasharray 1.2s ease-out",
                transitionDelay: `${i * 100}ms`,
              }}
            />
          );
          offset += length;
          return el;
        })}
      </svg>
      <ul className="space-y-2">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-sm ${s.color.replace("text-", "bg-")}`} />
            <span className="font-semibold">{s.label}</span>
            <span className="text-muted-foreground">
              {Math.round((s.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ── Before/After comparison card ──────────────────────────────────────────
export const CompareCard = ({
  before,
  after,
  label = "Difference",
}: {
  before: { heading: string; value: string; sub: string };
  after: { heading: string; value: string; sub: string };
  label?: string;
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-4 my-8"
      style={{ opacity: inView ? 1 : 0, transition: "opacity 700ms" }}
    >
      <div className="rounded-2xl border-2 border-rose-500/30 bg-rose-500/5 p-6 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
          {before.heading}
        </div>
        <div className="text-4xl font-extrabold mb-1">{before.value}</div>
        <div className="text-sm text-muted-foreground">{before.sub}</div>
      </div>
      <div className="rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-1">
          {after.heading}
        </div>
        <div className="text-4xl font-extrabold mb-1">{after.value}</div>
        <div className="text-sm text-muted-foreground">{after.sub}</div>
      </div>
      <div className="md:col-span-2 text-center text-sm font-bold text-primary uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
};

// ── Stat tiles grid (animated counters in a grid) ──────────────────────────
export const StatGrid = ({
  stats,
}: {
  stats: { value: number; prefix?: string; suffix?: string; label: string; decimals?: number }[];
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
    {stats.map((s) => (
      <div
        key={s.label}
        className="rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white text-center"
      >
        <div className="text-3xl md:text-4xl font-extrabold mb-1 tabular-nums">
          <AnimatedCounter
            to={s.value}
            prefix={s.prefix}
            suffix={s.suffix}
            decimals={s.decimals ?? 0}
          />
        </div>
        <div className="text-xs uppercase tracking-wider text-blue-300">{s.label}</div>
      </div>
    ))}
  </div>
);
