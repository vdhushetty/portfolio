import { SiDatabricks, SiApachespark, SiPython, SiScikitlearn, SiPandas } from "react-icons/si";
import {
  FiGlobe, FiShoppingCart, FiDatabase, FiGrid, FiLayers, FiCloudRain,
  FiTruck, FiTrendingUp, FiActivity,
} from "react-icons/fi";
import { FaSatelliteDish, FaSeedling } from "react-icons/fa";

/* Official SVGs downloaded into /public/logos */
const FILE = {
  d365: "/logos/dynamics365-finance-operations.svg",
  azure: "/logos/azure.svg",
  mssql: "/logos/mssql.svg",
  synapse: "/logos/synapse.svg",
  devops: "/logos/devops.svg",
  powerbi: "/logos/powerbi.svg",
  datafactory: "/logos/datafactory.svg",
};

/* Brand marks from the simple-icons set (accurate paths, brand colors) */
const BRAND = {
  databricks: { Icon: SiDatabricks, color: "#FF3621" },
  spark: { Icon: SiApachespark, color: "#E25A1C" },
  python: { Icon: SiPython, color: "#3776AB" },
  sklearn: { Icon: SiScikitlearn, color: "#F7931E" },
  pandas: { Icon: SiPandas, color: "#150458" },
};

/* Concept glyphs for non-brand nodes (sources, outputs) */
const GLYPH = {
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

/* Hand-drawn marks for brands with no downloadable SVG */
const DeltaLake = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.8 L21.4 19.6 H2.6 Z" fill="none" stroke="#00ADD4" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 9.6 L16.4 17.4 H7.6 Z" fill="#00ADD4" />
  </svg>
);

const Fabric = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="fabg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#117865" />
        <stop offset="1" stopColor="#4FBF9F" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="url(#fabg)" />
    <text x="12" y="16.4" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontWeight="700" fontSize="11" fill="#fff">F</text>
  </svg>
);

const DRAWN = { deltalake: DeltaLake, fabric: Fabric };

export default function TechLogo({ name, size = 24 }) {
  if (FILE[name]) return <img src={FILE[name]} alt="" width={size} height={size} style={{ objectFit: "contain" }} />;
  if (BRAND[name]) {
    const { Icon, color } = BRAND[name];
    return <Icon size={size} color={color} aria-hidden="true" />;
  }
  if (DRAWN[name]) {
    const Cmp = DRAWN[name];
    return <Cmp size={size} />;
  }
  if (GLYPH[name]) {
    const { Icon, color } = GLYPH[name];
    return <Icon size={size * 0.92} color={color} aria-hidden="true" />;
  }
  return <FiDatabase size={size * 0.9} color="#4a6fa5" aria-hidden="true" />;
}
