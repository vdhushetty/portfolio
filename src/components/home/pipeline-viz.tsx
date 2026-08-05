const nodes = ["Sources", "CDC / Bus", "Lakehouse", "Curated", "Insights"];

export function PipelineViz() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 sm:p-6 glow-ring">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <p className="relative mb-5 text-xs font-medium uppercase tracking-wider text-primary">
        Live data path
      </p>
      <div className="relative flex flex-col gap-3">
        {nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-3">
            <div
              className="float-slow flex h-11 min-w-0 flex-1 items-center justify-between rounded-xl border border-border-strong bg-bg-elevated px-4"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <span className="truncate text-sm font-medium text-fg">{node}</span>
              <span className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
            </div>
            {i < nodes.length - 1 && (
              <div className="hidden w-8 shrink-0 sm:block">
                <div className="h-0.5 w-full rounded-full pipeline-flow" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="relative mt-5 grid grid-cols-3 gap-2">
        {[
          { k: "latency", v: "<500ms" },
          { k: "volume", v: "1.2M/min" },
          { k: "SLA", v: "99.9%" },
        ].map((m) => (
          <div
            key={m.k}
            className="rounded-lg border border-border bg-bg/70 px-2 py-2 text-center"
          >
            <div className="font-mono text-sm font-semibold tabular-nums text-primary">{m.v}</div>
            <div className="text-[10px] uppercase tracking-wide text-subtle">{m.k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
