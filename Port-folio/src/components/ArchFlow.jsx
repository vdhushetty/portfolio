import { Fragment } from "react";
import TechLogo from "./TechLogo";

/* ------------------------------------------------------------------
   ArchFlow — project architectures as grouped blueprint stages on the
   fixed-dark viz surface. An arch is an array of stages:

   { title:"LAKE", note:"CSV + changelog", in:"export ~15 min",
     items:[{logo,label,sub} | {text}], detailOnly?:true }

   - `in`   labels the connector arriving at this stage
   - `note` is the telemetry line under the stage's tiles
   - `detailOnly` stages are hidden at size="sm" (project cards)
   Legacy elements (bare chip / array of chips) still render.
   ------------------------------------------------------------------ */

const SIZES = {
  xs: { tile: 22, chipW: 42, conn: 14, font: 7, titleF: 6.5, noteF: 6.5, pad: "px-1.5 pt-1.5 pb-1" },
  sm: { tile: 28, chipW: 54, conn: 24, font: 8.5, titleF: 7.5, noteF: 7.5, pad: "px-2.5 pt-2 pb-1.5" },
  lg: { tile: 42, chipW: 80, conn: 38, font: 10, titleF: 9, noteF: 9, pad: "px-4 pt-3 pb-2" },
};

const INK = "#e8eefb";
const DIM = "#94a6c4";
const LINE = "#2a3d5e";

function Tile({ item, tile }) {
  if (item.text)
    return (
      <span
        className="font-mono font-semibold"
        style={{ fontSize: tile * 0.3, color: "#0c1a2e", letterSpacing: "0.04em" }}
      >
        {item.text}
      </span>
    );
  return <TechLogo name={item.logo} size={tile * 0.62} />;
}

function Chip({ item, tile, chipW, font }) {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0" style={{ width: chipW }}>
      <div
        className="grid place-items-center rounded-lg"
        style={{
          width: tile,
          height: tile,
          background: "#f2f5fa",
          boxShadow: "0 1px 0 rgba(255,255,255,0.35) inset, 0 4px 14px -6px rgba(0,0,0,0.6)",
        }}
      >
        <Tile item={item} tile={tile} />
      </div>
      <span className="font-mono text-center leading-tight" style={{ fontSize: font, color: INK }}>
        {item.label}
      </span>
      {item.sub && (
        <span className="font-mono leading-none" style={{ fontSize: font - 1.5, color: DIM, marginTop: -2 }}>
          {item.sub}
        </span>
      )}
    </div>
  );
}

/* Vertical offset that centers connectors on the tile row of a group. */
const tileCenter = (s, grouped) =>
  (grouped ? s.titleF * 1.2 + 7 : 0) + s.tile / 2;

function Conn({ s, accent, label, grouped }) {
  const w = Math.max(s.conn, label ? label.length * (s.noteF * 0.62) + 6 : 0);
  const labelH = label ? s.noteF + 4 : 0;
  return (
    <div
      className="shrink-0 flex flex-col items-center"
      style={{ paddingTop: Math.max(2, tileCenter(s, grouped) - 6 - labelH), paddingInline: 2 }}
    >
      {label && (
        <span
          className="font-mono whitespace-nowrap leading-none"
          style={{ fontSize: s.noteF - 0.5, color: DIM, marginBottom: 3 }}
        >
          {label}
        </span>
      )}
      <svg width={w} height="12" aria-hidden="true">
        <line x1="0" y1="6" x2={w - 7} y2="6" className="flow-line" stroke={accent} strokeWidth="1.5" fill="none" />
        <path d={`M${w - 7} 2 L${w} 6 L${w - 7} 10`} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function StageGroup({ stage, s, accent }) {
  return (
    <div
      className={`rounded-lg border border-dashed shrink-0 self-start ${s.pad}`}
      style={{ borderColor: LINE }}
    >
      <div
        className="font-mono uppercase text-center leading-none"
        style={{ fontSize: s.titleF, letterSpacing: "0.18em", color: "#7d90b3", marginBottom: 7 }}
      >
        {stage.title}
      </div>
      <div className="flex justify-center" style={{ gap: 8 }}>
        {stage.items.map((it, i) => (
          <Chip key={i} item={it} tile={s.tile} chipW={s.chipW} font={s.font} />
        ))}
      </div>
      {stage.note && (
        <div
          className="font-mono text-center leading-tight"
          style={{ fontSize: s.noteF, color: accent, marginTop: 5, opacity: 0.9 }}
        >
          {stage.note}
        </div>
      )}
    </div>
  );
}

export default function ArchFlow({ arch = [], accent = "#3fe0ff", size = "sm", className = "" }) {
  const s = SIZES[size] || SIZES.sm;
  const stages = arch.filter((el) => !(size === "sm" && el.detailOnly));

  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <div className="flex items-start w-max mx-auto px-3 py-4">
        {stages.map((el, i) => {
        const grouped = !!el.title;
        return (
          <Fragment key={i}>
            {i > 0 && <Conn s={s} accent={accent} label={el.in} grouped={grouped} />}
            {grouped ? (
              <StageGroup stage={el} s={s} accent={accent} />
            ) : Array.isArray(el) ? (
              <div className="flex flex-col gap-2 shrink-0" style={{ width: s.chipW }}>
                {el.map((sub, j) => (
                  <Chip key={j} item={sub} tile={s.tile * 0.8} chipW={s.chipW} font={s.font - 1} />
                ))}
              </div>
            ) : (
              <Chip item={el} tile={s.tile} chipW={s.chipW} font={s.font} />
            )}
          </Fragment>
        );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   PlatformPipeline — the high-level "one pipeline" overview. Stage
   membership counts are computed from each project's arch logos.
   ------------------------------------------------------------------ */

const STAGES = [
  {
    label: "Sources",
    chips: [
      { logo: "d365", label: "D365" },
      { logo: "api", label: "APIs" },
      { logo: "pos", label: "POS" },
    ],
    keys: ["d365", "api", "pos", "shipped", "satellite", "soil", "weather"],
  },
  {
    label: "Ingest",
    chips: [
      { logo: "synapse", label: "Synapse Link" },
      { logo: "fabric", label: "Fabric Link" },
    ],
    keys: ["synapse", "fabric", "datafactory"],
  },
  {
    label: "Process",
    chips: [
      { logo: "databricks", label: "Databricks" },
      { logo: "deltalake", label: "Delta Lake" },
      { logo: "python", label: "PySpark" },
    ],
    keys: ["databricks", "deltalake", "spark", "python", "devops"],
  },
  {
    label: "Serve",
    chips: [
      { logo: "mssql", label: "SQL Server" },
      { logo: "warehouse", label: "Warehouse" },
    ],
    keys: ["mssql", "warehouse"],
  },
  {
    label: "Consume",
    chips: [
      { logo: "powerbi", label: "Power BI" },
      { logo: "sklearn", label: "ML models" },
    ],
    keys: ["powerbi", "sklearn", "dashboard", "chart", "yield"],
  },
];

const logosOf = (p) =>
  (p.arch || [])
    .flatMap((el) => (el.items ? el.items : Array.isArray(el) ? el : [el]))
    .map((c) => c.logo)
    .filter(Boolean);

export function PlatformPipeline({ projects, accent = "#3fe0ff" }) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-6 pt-5 pb-4 border-b border-line">
        <div>
          <span className="eyebrow" style={{ color: accent }}>
            // platform
          </span>
          <h3 className="font-display text-xl font-semibold text-ink mt-1">
            One pipeline, {projects.length} projects
          </h3>
        </div>
        <span className="font-mono text-xs text-faint">
          every project below lives on a stage of this flow
        </span>
      </div>
      <div className="viz-surface overflow-x-auto">
        <div className="flex items-stretch px-5 py-6 min-w-max mx-auto w-fit">
          {STAGES.map((st, i) => {
            const count = projects.filter((p) => logosOf(p).some((k) => st.keys.includes(k))).length;
            return (
              <Fragment key={st.label}>
                {i > 0 && (
                  <div className="self-center shrink-0 px-1">
                    <svg width="30" height="12" aria-hidden="true">
                      <line x1="0" y1="6" x2="23" y2="6" className="flow-line" stroke={accent} strokeWidth="1.5" fill="none" />
                      <path d="M23 2 L30 6 L23 10" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <div className="rounded-xl border border-dashed shrink-0 px-4 pt-3 pb-2.5" style={{ borderColor: LINE }}>
                  <div className="font-mono text-[9.5px] tracking-[0.2em] uppercase mb-2.5" style={{ color: DIM }}>
                    {st.label}
                  </div>
                  <div className="flex gap-2">
                    {st.chips.map((c) => (
                      <Chip key={c.label} item={c} tile={34} chipW={62} font={8.5} />
                    ))}
                  </div>
                  <div className="font-mono text-[9px] mt-1.5" style={{ color: accent }}>
                    {count} project{count === 1 ? "" : "s"}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
