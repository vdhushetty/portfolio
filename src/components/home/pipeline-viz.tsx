const nodes = [
  { id: 'ingest', label: 'Ingest', x: 8, y: 42 },
  { id: 'quality', label: 'Quality', x: 28, y: 18 },
  { id: 'transform', label: 'Transform', x: 48, y: 48 },
  { id: 'feature', label: 'Features', x: 68, y: 22 },
  { id: 'serve', label: 'Serve', x: 88, y: 45 },
] as const

const edges = [
  ['ingest', 'quality'],
  ['quality', 'transform'],
  ['transform', 'feature'],
  ['feature', 'serve'],
  ['ingest', 'transform'],
] as const

function nodePos(id: string) {
  return nodes.find((n) => n.id === id)!
}

export function PipelineViz({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 shadow-sm backdrop-blur-sm ${
        className
      }`}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.1),transparent_40%)]" />
      <svg viewBox="0 0 100 70" className="relative h-full w-full" role="img">
        <title>Data pipeline schematic</title>
        {edges.map(([a, b], i) => {
          const from = nodePos(a)
          const to = nodePos(b)
          return (
            <line
              key={`${a}-${b}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className="stroke-primary/35"
              strokeWidth={0.6}
              strokeDasharray={i % 2 === 0 ? '1.5 1' : undefined}
            />
          )
        })}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r={3.2}
              className={i % 2 === 0 ? 'fill-primary/90' : 'fill-accent/90'}
            />
            <text
              x={n.x}
              y={n.y + 7.5}
              textAnchor="middle"
              className="fill-muted-foreground text-[3.2px] font-medium"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="relative mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Live systems thinking · not a demo chart
      </p>
    </div>
  )
}
