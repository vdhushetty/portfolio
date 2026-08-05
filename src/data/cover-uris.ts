/** Generate project covers as data URIs (no public/ files required). */

const COVER_META: Record<string, { title: string; subtitle: string }> = {
  "arm-fkik.svg": { title: "5-DOF Arm Kinematics", subtitle: "MATLAB FK / IK" },
  "byod.svg": { title: "D365 BYOD Recovery", subtitle: "Retain · Recover · Delta" },
  "d365-replication.svg": {
    title: "D365 Real-Time Replication",
    subtitle: "Synapse Link · Auto Loader · Delta",
  },
  "databricks-dr.svg": {
    title: "Databricks Disaster Recovery",
    subtitle: "Delta Sharing · Failover · Fabric",
  },
  "drone.svg": { title: "Autonomous Tello Drone", subtitle: "OpenCV · YOLO · KNN" },
  "event-hub.svg": { title: "Event Hub Streaming", subtitle: "Events → Delta · Workflows" },
  "fabric.svg": { title: "Fabric Incremental ETL", subtitle: "Dataflow Gen2" },
  "heart-ml.svg": { title: "Heart Disease Predictor", subtitle: "scikit-learn · RF 85%" },
  "medallion.svg": { title: "Sales Medallion Lakehouse", subtitle: "Bronze → Gold · AI/BI" },
  "mlops.svg": { title: "ML Ops Batch and Real-Time", subtitle: "Scoring · Governance" },
  "platoon.svg": { title: "Truck Platooning CFD", subtitle: "Aero · Thermal · Spacing" },
  "robot-rl.svg": { title: "Robot Nav Deep RL", subtitle: "ROS · Gazebo · TD3" },
  "stock-ml.svg": { title: "Stock Market ML", subtitle: "RF · LSTM · SVM" },
  "synapse-migrate.svg": {
    title: "Synapse → Databricks Migration",
    subtitle: "Platform cutover",
  },
  "timing-ml.svg": { title: "Timing PBA ML", subtitle: "GBA → PBA · Random Forest" },
  "unity-catalog.svg": {
    title: "Unity Catalog Governance",
    subtitle: "Access · Lineage · Metadata",
  },
  "warehouse.svg": { title: "Agritech Data Warehouse", subtitle: "STAR · Power BI" },
};

function basename(path: string): string {
  const cleaned = path.split("?")[0]?.split("#")[0] ?? path;
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || cleaned;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "\u0026amp;")
    .replace(/</g, "\u0026lt;")
    .replace(/>/g, "\u0026gt;");
}

function makeCover(key: string): string {
  const meta = COVER_META[key] ?? {
    title: key.replace(/\.svg$/i, "").replace(/-/g, " "),
    subtitle: "Project",
  };
  const title = escapeXml(meta.title);
  const subtitle = escapeXml(meta.subtitle);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">` +
    `<defs>` +
    `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="#0d111a"/>` +
    `<stop offset="100%" stop-color="#121826"/>` +
    `</linearGradient>` +
    `<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">` +
    `<path d="M32 0H0V32" fill="none" stroke="#1e293b" stroke-width="1"/>` +
    `</pattern>` +
    `</defs>` +
    `<rect width="960" height="540" fill="url(#g)"/>` +
    `<rect width="960" height="540" fill="url(#grid)" opacity="0.55"/>` +
    `<circle cx="820" cy="80" r="120" fill="#22d3ee" opacity="0.08"/>` +
    `<circle cx="100" cy="480" r="140" fill="#22d3ee" opacity="0.06"/>` +
    `<rect x="80" y="200" width="120" height="48" rx="10" fill="#121826" stroke="#22d3ee" stroke-opacity="0.45"/>` +
    `<rect x="260" y="200" width="120" height="48" rx="10" fill="#121826" stroke="#22d3ee" stroke-opacity="0.45"/>` +
    `<rect x="440" y="200" width="120" height="48" rx="10" fill="#121826" stroke="#22d3ee" stroke-opacity="0.45"/>` +
    `<rect x="620" y="200" width="120" height="48" rx="10" fill="#121826" stroke="#22d3ee" stroke-opacity="0.45"/>` +
    `<path d="M200 224H260M380 224H440M560 224H620" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.55"/>` +
    `<circle cx="230" cy="224" r="3" fill="#22d3ee"/><circle cx="410" cy="224" r="3" fill="#22d3ee"/><circle cx="590" cy="224" r="3" fill="#22d3ee"/>` +
    `<text x="80" y="360" fill="#22d3ee" font-family="ui-sans-serif,system-ui" font-size="14" font-weight="600" letter-spacing="2">PROJECT</text>` +
    `<text x="80" y="400" fill="#e8edf7" font-family="ui-sans-serif,system-ui" font-size="28" font-weight="700">${title}</text>` +
    `<text x="80" y="480" fill="#8b95a8" font-family="ui-sans-serif,system-ui" font-size="16">${subtitle}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Resolve project cover path to an inlined data URI. */
export function coverUri(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return makeCover(basename(path));
}
