/** Generate skill icons as data URIs (no public/ files required). */

const LABELS: Record<string, string> = {
  "abtest.svg": "A/B",
  "access.svg": "ACL",
  "adf.svg": "ADF",
  "anaconda.svg": "Ac",
  "apachehadoop.svg": "Hd",
  "apachekafka.svg": "Kf",
  "apachespark.svg": "Sp",
  "autoloader.svg": "AL",
  "azure.svg": "Az",
  "cosmosdb.svg": "CDB",
  "databricks.svg": "DB",
  "dax.svg": "DAX",
  "delta.svg": "Dl",
  "deploy.svg": "Dep",
  "dlt.svg": "DLT",
  "docker.svg": "Dk",
  "etl.svg": "ETL",
  "excel.svg": "Xl",
  "fabric.svg": "Fab",
  "fastapi.svg": "Fa",
  "features.svg": "Fe",
  "flask.svg": "Fl",
  "git.svg": "Git",
  "hadoop.svg": "Hd",
  "huggingface.svg": "HF",
  "jupyter.svg": "Jup",
  "kafka.svg": "Kfk",
  "lineage.svg": "Lin",
  "matplotlib.svg": "Mpl",
  "medallion.svg": "Med",
  "metadata.svg": "Meta",
  "modeling.svg": "Mod",
  "mssql.svg": "SQL",
  "mysql.svg": "My",
  "nlp.svg": "NLP",
  "numpy.svg": "Np",
  "pandas.svg": "Pd",
  "plotly.svg": "Pl",
  "postgresql.svg": "Pg",
  "powerbi.svg": "PBI",
  "pyspark.svg": "PyS",
  "python.svg": "Py",
  "pytorch.svg": "PT",
  "quality.svg": "QA",
  "scikitlearn.svg": "sk",
  "spark.svg": "Spk",
  "sqlite.svg": "SQ",
  "ssms.svg": "SS",
  "synapse.svg": "Syn",
  "tensorflow.svg": "TF",
  "transformers.svg": "Tr",
  "unity-catalog.svg": "UC",
};

const COLORS = [
  "#2b9677",
  "#2b968f",
  "#59962b",
  "#967b2b",
  "#2b9680",
  "#2b9649",
  "#962b62",
  "#0078D4",
  "#7c2d12",
  "#312e81",
  "#0e7490",
  "#166534",
  "#1e3a5f",
  "#334155",
  "#E25A1C",
  "#F2C811",
  "#EE4C2C",
  "#F7931E",
  "#e15919",
  "#3eb049",
  "#4DABCF",
  "#130754",
  "#231f20",
  "#FF3621",
];

function basename(path: string): string {
  const cleaned = path.split("?")[0]?.split("#")[0] ?? path;
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || cleaned;
}

function hashKey(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h;
}

function makeIcon(key: string): string {
  const label = LABELS[key] ?? key.replace(/\.svg$/i, "").slice(0, 3);
  const color = COLORS[hashKey(key) % COLORS.length]!;
  const fs = label.length <= 3 ? "12" : "10";
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">` +
    `<rect width="48" height="48" rx="10" fill="${color}"/>` +
    `<text x="24" y="30" text-anchor="middle" font-family="ui-sans-serif,system-ui,sans-serif" font-size="${fs}" font-weight="700" fill="#fff">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Resolve skill icon path to an inlined data URI. */
export function skillIconUri(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return makeIcon(basename(path));
}
