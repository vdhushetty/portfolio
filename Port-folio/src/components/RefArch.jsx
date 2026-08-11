import { Fragment } from "react";
import {
  SiDatabricks, SiApachespark, SiPython, SiScikitlearn, SiPandas,
} from "react-icons/si";
import {
  FiGlobe, FiShoppingCart, FiDatabase, FiGrid, FiLayers, FiCloudRain,
  FiTruck, FiTrendingUp, FiActivity,
} from "react-icons/fi";
import { FaSatelliteDish, FaSeedling } from "react-icons/fa";

/* ------------------------------------------------------------------
   RefArch — Azure-Architecture-Center-style reference diagrams:
   swim-lane zones left→right, service tiles with real logos,
   circled dataflow numbers matched to a numbered list (DataflowList),
   optional bidirectional flows, and a governance/monitoring band
   across the bottom. Rendered as one responsive SVG on the dark
   viz surface.

   spec = {
     zones: [{ title, nodes: [{ id, logo|text, label, sub, viz }] }],
     flows: [{ from, to, step?, label?, muted?, back?, backLabel? }],
     band:  { title, label, step? },
     dataflow: ["step 1 text", …],
   }
   viz: "tables" | "files" | "fan" | "medallion"
   ------------------------------------------------------------------ */

const W = 1000;
const MX = 14;
const ZONE_GAP = 12;
const ZONE_Y = 14;
const NODE_STEP = 118;
const TILE = 48;

const INK = "#e8eefb";
const DIM = "#8fa3c4";
const FAINT = "#5f7396";
const LINE = "#2a3d5e";
const MONO = "'IBM Plex Mono', monospace";

const FILE_LOGOS = {
  d365: "/logos/dynamics365-finance-operations.svg",
  azure: "/logos/azure.svg",
  mssql: "/logos/mssql.svg",
  synapse: "/logos/synapse.svg",
  devops: "/logos/devops.svg",
  powerbi: "/logos/powerbi.svg",
  datafactory: "/logos/datafactory.svg",
};

const ICONS = {
  databricks: { Icon: SiDatabricks, color: "#FF3621" },
  spark: { Icon: SiApachespark, color: "#E25A1C" },
  python: { Icon: SiPython, color: "#3776AB" },
  sklearn: { Icon: SiScikitlearn, color: "#F7931E" },
  pandas: { Icon: SiPandas, color: "#150458" },
  api: { Icon: FiGlobe, color: "#4a6fa5" },
  pos: { Icon: FiShoppingCart, color: "#b0763a" },
  warehouse: { Icon: FiDatabase, color: "#4a6fa5" },
  dashboard: { Icon: FiGrid, color: "#4a6fa5" },
  satellite: { Icon: FaSatelliteDish, color: "#64748b" },
  soil: { Icon: FiLayers, color: "#8a6f4d" },
  weather: { Icon: FiCloudRain, color: "#4596c7" },
  yield: { Icon: FaSeedling, color: "#3fa96f" },
  shipped: { Icon: FiTruck, color: "#4a6fa5" },
  chart: { Icon: FiTrendingUp, color: "#3fa96f" },
  monitor: { Icon: FiActivity, color: "#c75454" },
};

function NodeIcon({ name, x, y, size }) {
  if (FILE_LOGOS[name]) return <image href={FILE_LOGOS[name]} x={x} y={y} width={size} height={size} />;
  if (ICONS[name]) {
    const { Icon, color } = ICONS[name];
    return <Icon x={x} y={y} size={size} color={color} />;
  }
  if (name === "deltalake")
    return (
      <g transform={`translate(${x},${y}) scale(${size / 24})`}>
        <path d="M12 2.8 L21.4 19.6 H2.6 Z" fill="none" stroke="#00ADD4" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 9.6 L16.4 17.4 H7.6 Z" fill="#00ADD4" />
      </g>
    );
  if (name === "fabric")
    return (
      <g transform={`translate(${x},${y}) scale(${size / 24})`}>
        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="#117865" />
        <text x="12" y="16.4" textAnchor="middle" fontFamily={MONO} fontWeight="700" fontSize="11" fill="#fff">F</text>
      </g>
    );
  return <FiDatabase x={x} y={y} size={size} color="#4a6fa5" />;
}

/* Small decorations that give nodes "real diagram" density. */
function Decoration({ viz, cx, y }) {
  if (viz === "medallion") {
    const layers = [
      ["GOLD", "#d4a63c"],
      ["SILVER", "#97a4b6"],
      ["BRONZE", "#b0713a"],
    ];
    return (
      <g>
        {layers.map(([label, color], i) => (
          <g key={label}>
            <rect x={cx - 29} y={y + i * 13} width="58" height="10" rx="2.5" fill={color} fillOpacity="0.9" />
            <text x={cx} y={y + i * 13 + 7.5} textAnchor="middle" fontFamily={MONO} fontSize="5.6" fontWeight="700" fill="#081018">
              {label}
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (viz === "files") {
    return (
      <g>
        <path d={`M${cx - 30} ${y + 3} h9 l3 3 h12 v14 h-24 z`} fill="#e8b64c" fillOpacity="0.9" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={cx + 2 + i * 11} y={y + 4} width="9" height="12" rx="1" fill="#dfe8f5" />
            <line x1={cx + 4 + i * 11} y1={y + 8} x2={cx + 9 + i * 11} y2={y + 8} stroke="#7a8fb3" strokeWidth="0.8" />
            <line x1={cx + 4 + i * 11} y1={y + 11} x2={cx + 9 + i * 11} y2={y + 11} stroke="#7a8fb3" strokeWidth="0.8" />
          </g>
        ))}
      </g>
    );
  }
  if (viz === "tables") {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${cx - 26 + i * 19}, ${y + 4})`}>
            <rect width="15" height="12" rx="1.5" fill="#3f6ec2" fillOpacity="0.85" />
            <line x1="0" y1="4" x2="15" y2="4" stroke="#0e1728" strokeWidth="0.9" />
            <line x1="0" y1="8" x2="15" y2="8" stroke="#0e1728" strokeWidth="0.9" />
            <line x1="7.5" y1="4" x2="7.5" y2="12" stroke="#0e1728" strokeWidth="0.9" />
          </g>
        ))}
      </g>
    );
  }
  if (viz === "fan") {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <line x1={cx} y1={y} x2={cx - 24 + i * 16} y2={y + 8} stroke={FAINT} strokeWidth="0.9" />
            <rect x={cx - 29 + i * 16} y={y + 8} width="10" height="10" rx="2" fill="#0e1728" stroke={LINE} />
            <circle cx={cx - 24 + i * 16} cy={y + 13} r="1.6" fill="#3fe0a3" />
          </g>
        ))}
      </g>
    );
  }
  return null;
}

function StepBadge({ x, y, n, accent }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9.5" fill={accent} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontFamily={MONO} fontSize="10" fontWeight="700" fill="#06121f">
        {n}
      </text>
    </g>
  );
}

export default function RefArch({ spec, accent = "#3fe0ff" }) {
  if (!spec) return null;
  const { zones = [], flows = [], band } = spec;

  /* ---- layout ---- */
  const rows = Math.max(...zones.map((z) => z.nodes.length));
  const zoneH = 40 + rows * NODE_STEP;
  const bandH = band ? 56 : 0;
  const H = ZONE_Y + zoneH + (band ? 18 + bandH : 0) + 14;
  const zw = (W - MX * 2 - ZONE_GAP * (zones.length - 1)) / zones.length;

  const pos = {};
  zones.forEach((z, zi) => {
    const zx = MX + zi * (zw + ZONE_GAP);
    const n = z.nodes.length;
    const startY = ZONE_Y + 36 + ((rows - n) * NODE_STEP) / 2;
    z.nodes.forEach((node, ni) => {
      pos[node.id] = { cx: zx + zw / 2, tileY: startY + ni * NODE_STEP, zx, zw };
    });
  });

  const anchor = (id) => {
    const p = pos[id];
    return p ? { y: p.tileY + TILE / 2, left: p.cx - TILE / 2 - 6, right: p.cx + TILE / 2 + 6 } : null;
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ minWidth: 860, display: "block" }}
      role="img"
      aria-label="Reference architecture diagram"
    >
      <defs>
        <marker id="ra-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Zones */}
      {zones.map((z, zi) => {
        const zx = MX + zi * (zw + ZONE_GAP);
        return (
          <g key={z.title + zi}>
            <rect x={zx} y={ZONE_Y} width={zw} height={zoneH} rx="12" fill="rgba(255,255,255,0.012)" stroke={LINE} strokeDasharray="5 5" />
            <text x={zx + zw / 2} y={ZONE_Y + 24} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="2.5" fill="#7d90b3">
              {z.title.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Flows (under nodes so arrowheads tuck against tiles) */}
      {flows.map((f, i) => {
        const a = anchor(f.from);
        const b = anchor(f.to);
        if (!a || !b) return null;
        const sx = a.right;
        const tx = b.left;
        const mid = (sx + tx) / 2;
        const d =
          Math.abs(a.y - b.y) < 4
            ? `M${sx} ${a.y} L${tx} ${b.y}`
            : `M${sx} ${a.y} H${mid} V${b.y} H${tx}`;
        const stroke = f.muted ? FAINT : accent;
        return (
          <g key={i}>
            <path d={d} fill="none" stroke={stroke} strokeWidth="1.7" className={f.muted ? "" : "flow-line"} strokeDasharray={f.muted ? "4 5" : undefined} markerEnd="url(#ra-arrow)" />
            {f.back && (
              <path
                d={
                  Math.abs(a.y - b.y) < 4
                    ? `M${tx} ${b.y + 16} L${sx} ${a.y + 16}`
                    : `M${tx} ${b.y + 16} H${mid - 10} V${a.y + 16} H${sx}`
                }
                fill="none"
                stroke={FAINT}
                strokeWidth="1.4"
                strokeDasharray="4 5"
                markerEnd="url(#ra-arrow)"
              />
            )}
            {f.step != null && <StepBadge x={mid} y={(a.y + b.y) / 2 - (Math.abs(a.y - b.y) < 4 ? 16 : 0)} n={f.step} accent={accent} />}
            {f.label && (
              <text x={mid} y={(a.y + b.y) / 2 + (Math.abs(a.y - b.y) < 4 ? 26 : 20)} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={DIM}>
                {f.label}
              </text>
            )}
            {f.back && f.backLabel && (
              <text x={mid} y={Math.max(a.y, b.y) + 30} textAnchor="middle" fontFamily={MONO} fontSize="8" fill={FAINT}>
                {f.backLabel}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {zones.map((z) =>
        z.nodes.map((node) => {
          const p = pos[node.id];
          const tileX = p.cx - TILE / 2;
          return (
            <g key={node.id}>
              <rect x={tileX} y={p.tileY} width={TILE} height={TILE} rx="11" fill="#f2f5fa" />
              {node.text ? (
                <text x={p.cx} y={p.tileY + TILE / 2 + 4} textAnchor="middle" fontFamily={MONO} fontSize="11.5" fontWeight="700" fill="#0c1a2e">
                  {node.text}
                </text>
              ) : (
                <NodeIcon name={node.logo} x={tileX + 9} y={p.tileY + 9} size={TILE - 18} />
              )}
              <text x={p.cx} y={p.tileY + TILE + 16} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={INK}>
                {node.label}
              </text>
              {node.sub && (
                <text x={p.cx} y={p.tileY + TILE + 28} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={DIM}>
                  {node.sub}
                </text>
              )}
              {node.viz && <Decoration viz={node.viz} cx={p.cx} y={p.tileY + TILE + 34} />}
            </g>
          );
        })
      )}

      {/* Governance / monitoring band */}
      {band && (
        <g>
          <line x1={W / 2} y1={ZONE_Y + zoneH} x2={W / 2} y2={ZONE_Y + zoneH + 18} stroke={FAINT} strokeWidth="1.2" strokeDasharray="3 4" />
          {band.step != null && <StepBadge x={W / 2 + 22} y={ZONE_Y + zoneH + 9} n={band.step} accent={accent} />}
          <rect x={MX} y={ZONE_Y + zoneH + 18} width={W - MX * 2} height={bandH} rx="12" fill="rgba(255,255,255,0.012)" stroke={LINE} strokeDasharray="5 5" />
          <text x={MX + 18} y={ZONE_Y + zoneH + 18 + 24} fontFamily={MONO} fontSize="9.5" letterSpacing="2.5" fill="#7d90b3">
            {band.title.toUpperCase()}
          </text>
          <g>
            <rect x={MX + 18} y={ZONE_Y + zoneH + 18 + 30} width="20" height="20" rx="5" fill="#f2f5fa" />
            <NodeIcon name="monitor" x={MX + 21} y={ZONE_Y + zoneH + 18 + 33} size={14} />
            <text x={MX + 46} y={ZONE_Y + zoneH + 18 + 44} fontFamily={MONO} fontSize="9.5" fill={INK}>
              {band.label}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}

/* Numbered dataflow list — the Azure-docs companion to the diagram. */
export function DataflowList({ steps = [], accent = "#3fe0ff" }) {
  if (!steps.length) return null;
  return (
    <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-6">
      {steps.map((text, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="grid place-items-center shrink-0 h-6 w-6 rounded-full font-mono text-xs font-bold"
            style={{ background: accent, color: "#06121f" }}
          >
            {i + 1}
          </span>
          <span className="text-sm text-dim leading-relaxed">{text}</span>
        </li>
      ))}
    </ol>
  );
}
