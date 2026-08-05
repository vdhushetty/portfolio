import { cn } from "@/lib/utils";

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  tone?: "source" | "process" | "store" | "serve" | "control";
};

export type ArchitectureFlow = {
  title?: string;
  nodes: ArchNode[];
  /** ordered chain left→right (or top→bottom on mobile) */
  edges?: [string, string][];
};

const toneClass: Record<NonNullable<ArchNode["tone"]>, string> = {
  source: "border-sky-500/40 bg-sky-500/10 text-sky-200",
  process: "border-primary/40 bg-primary/10 text-primary",
  store: "border-violet-400/40 bg-violet-500/10 text-violet-200",
  serve: "border-emerald-400/40 bg-emerald-500/10 text-emerald-200",
  control: "border-amber-400/40 bg-amber-500/10 text-amber-200",
};

export function ArchitectureDiagram({
  flow,
  className,
}: {
  flow: ArchitectureFlow;
  className?: string;
}) {
  const nodes = flow.nodes;
  const edges =
    flow.edges ??
    (nodes.length > 1
      ? (nodes.slice(0, -1).map((n, i) => [n.id, nodes[i + 1]!.id] as [string, string]) as [
          string,
          string,
        ][])
      : []);

  return (
    <div className={cn("rounded-2xl border border-border bg-surface overflow-hidden", className)}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-fg">{flow.title ?? "Architecture"}</p>
        <p className="text-[10px] uppercase tracking-wider text-subtle">System design</p>
      </div>
      <div className="p-4 sm:p-6">
        {/* Desktop horizontal flow */}
        <div className="hidden md:block">
          <div className="flex items-stretch justify-between gap-2">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex min-w-0 flex-1 items-center gap-2">
                <div
                  className={cn(
                    "w-full rounded-xl border px-3 py-3 text-center",
                    toneClass[node.tone ?? "process"],
                  )}
                >
                  <p className="text-xs font-semibold leading-snug">{node.label}</p>
                  {node.sub && (
                    <p className="mt-1 text-[10px] leading-snug opacity-80">{node.sub}</p>
                  )}
                </div>
                {i < nodes.length - 1 && edges.some(([a, b]) => a === node.id && b === nodes[i + 1]?.id) && (
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="h-0.5 w-4 rounded-full bg-primary/60 pipeline-flow sm:w-6" />
                    <span className="mt-0.5 text-[9px] text-subtle">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical flow */}
        <ol className="space-y-0 md:hidden">
          {nodes.map((node, i) => (
            <li key={node.id} className="relative flex gap-3 pb-4 last:pb-0">
              {i < nodes.length - 1 && (
                <span
                  className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-px bg-border-strong"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                  toneClass[node.tone ?? "process"],
                )}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 rounded-xl border border-border bg-bg-elevated px-3 py-2.5">
                <p className="text-sm font-medium text-fg">{node.label}</p>
                {node.sub && <p className="mt-0.5 text-xs text-muted">{node.sub}</p>}
              </div>
            </li>
          ))}
        </ol>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-3 border-t border-border pt-4 text-[10px] text-subtle">
          {(
            [
              ["source", "Source"],
              ["process", "Process"],
              ["store", "Store"],
              ["serve", "Serve"],
              ["control", "Control"],
            ] as const
          ).map(([k, label]) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-sm border", toneClass[k])} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
