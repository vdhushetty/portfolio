/* ------------------------------------------------------------------
   Per-project enrichment merged over projectsData at load time
   (see projects.js). Each entry adds:
   - short:  sidebar name
   - arch:   real-logo architecture flow (see ArchFlow.jsx)
   - problem / solution / optimizations / metrics / sections —
     deliberately different shapes per project, no shared template.
   ------------------------------------------------------------------ */

export const extras = {
  /* ---------- DATA ENGINEERING ---------- */

  "d365-finance-operations-replication": {
    short: "D365 Real-Time Replication",
    arch: [
      { title: "Source", note: "1,500+ tables", items: [{ logo: "d365", label: "D365 F&O" }] },
      {
        title: "Lake",
        in: "~15 min",
        note: "CSV + changelog",
        items: [
          { logo: "synapse", label: "Synapse Link" },
          { logo: "azure", label: "ADLS Gen2" },
        ],
      },
      {
        title: "Process",
        in: "rotate",
        note: "parallel · exactly-once",
        items: [
          { logo: "databricks", label: "Auto Loader" },
          { logo: "deltalake", label: "Delta" },
        ],
      },
      {
        title: "Watch",
        in: "alerts",
        note: "App Insights · Monitor",
        items: [{ logo: "monitor", label: "Azure Monitor" }],
        detailOnly: true,
      },
    ],
  },

  "databricks-disaster-recovery": {
    short: "Disaster Recovery",
    arch: [
      { title: "Primary", note: "live workloads", items: [{ logo: "databricks", label: "Workspace" }] },
      {
        title: "Replicate",
        in: "delta share",
        note: "DeepClone · 6h",
        items: [{ logo: "deltalake", label: "Delta Share" }],
      },
      {
        title: "Secondary",
        in: "reverse sync",
        note: "warm standby",
        items: [{ logo: "databricks", label: "Workspace" }],
      },
      {
        title: "Watch",
        note: "CLI health monitor",
        items: [{ logo: "monitor", label: "Failover" }],
        detailOnly: true,
      },
    ],
  },

  "synapse-databricks-migration": {
    short: "Synapse → Databricks",
    arch: [
      {
        title: "Legacy",
        note: "pipelines · SQL",
        items: [
          { logo: "synapse", label: "Synapse" },
          { logo: "mssql", label: "SQL Server" },
        ],
      },
      {
        title: "Rebuild",
        in: "backfill",
        note: "dual-run parity",
        items: [{ logo: "databricks", label: "Workflows" }],
      },
      {
        title: "Target",
        in: "cutover",
        note: "job clusters · −28%",
        items: [{ logo: "deltalake", label: "Delta Lake" }],
      },
    ],
    problem:
      "The estate ran on two platforms at once: Synapse pipelines fed by Synapse Link landed D365 data in SQL Server, while newer workloads already lived on Databricks. Every change was built twice, compute was paid for twice, and Spark tuning knowledge was split across two engines.",
    solution:
      "A phased re-platform. Historical data was backfilled from SQL Server into Delta Lake, each Synapse pipeline was rebuilt as a Databricks workflow, and both stacks ran side by side while outputs were compared table by table. Only when a pipeline's outputs matched exactly did its Synapse version get switched off.",
    optimizations: [
      "Replaced always-on Synapse capacity with Databricks job clusters that spin up per run — compute overhead dropped 28%.",
      "Swapped full reloads for Auto Loader incremental ingestion during the rebuild.",
      "Right-sized Spark clusters and enabled autoscaling per workload profile.",
      "OPTIMIZE + Z-ORDER on the hottest Delta tables after backfill.",
    ],
    metrics: [
      { label: "Compute Overhead", value: "28%", description: "reduction after migration" },
      { label: "Platforms", value: "2 → 1", description: "consolidated on Databricks" },
      { label: "Output Parity", value: "100%", description: "dual-run validated at cutover" },
    ],
    sections: [
      {
        title: "Cutover approach",
        items: [
          "Dual-run: old and new pipelines ran in parallel on live data.",
          "Automated row-count and checksum comparisons per table.",
          "Pipeline-by-pipeline cutover — no big-bang switch.",
          "Synapse kept warm as rollback until parity held for a full cycle.",
        ],
      },
    ],
    featuresTitle: "What moved",
  },

  "d365-data-retention": {
    short: "D365 Data Retention",
    arch: [
      { title: "Source", note: "purge scheduled", items: [{ logo: "d365", label: "D365 BYOD" }] },
      {
        title: "Capture",
        in: "pre-purge",
        note: "watermark · incremental",
        items: [{ logo: "databricks", label: "Jobs" }],
      },
      {
        title: "Archive",
        in: "append",
        note: "partitioned · −20% cost",
        items: [{ logo: "deltalake", label: "Delta" }],
      },
    ],
    problem:
      "Microsoft retired Export to Data Lake and enforces retention limits on D365 — historical BYOD records get purged on schedule. Finance and audit teams needed years of history that the source system was actively deleting.",
    solution:
      "A Databricks capture layer that sweeps D365 BYOD data ahead of each purge window and lands it in a Delta Lake archive. Watermarks track what has already been captured, schema evolution is handled automatically, and the archive stays queryable through Unity Catalog as if the data had never left D365.",
    optimizations: [
      "Incremental capture (deltas only, never full snapshots) keeps runs short.",
      "Partitioned by entity and date so audit queries prune to a fraction of the archive.",
      "Compaction and vacuum policies tuned for cold, append-mostly data — storage costs dropped 20%.",
    ],
    metrics: [
      { label: "Storage Cost", value: "20%", description: "reduction vs. prior approach" },
      { label: "History Lost", value: "Zero", description: "after purge windows" },
    ],
    sections: [
      {
        title: "How capture works",
        items: [
          "Per-entity watermark tracks the last captured change.",
          "Pre-purge sweep runs ahead of the D365 retention schedule.",
          "Schema drift is absorbed with Delta schema evolution.",
          "Every retained batch is logged for auditability.",
        ],
      },
    ],
  },

  "synapse-fabric-link": {
    short: "Synapse / Fabric Link",
    arch: [
      { title: "Source", note: "CDC export", items: [{ logo: "d365", label: "D365" }] },
      {
        title: "Dual path",
        note: "auto failover",
        items: [
          { logo: "synapse", label: "Synapse Link" },
          { logo: "fabric", label: "Fabric Link" },
        ],
      },
      {
        title: "Lakehouse",
        in: "dedupe merge",
        note: "consistent layout",
        items: [{ logo: "deltalake", label: "Delta" }],
      },
    ],
    problem:
      "With Export to Data Lake retired, Synapse Link became the sole bridge between D365 and the lakehouse — a single point of failure. When it degraded, data freshness stalled and every downstream report aged in place.",
    solution:
      "Two ingestion paths instead of one. Synapse Link runs as the primary CDC export and Fabric Link as the parallel path, both landing in a consistent layout on ADLS. Health checks watch export lag, and fallback logic switches paths automatically — downstream consumers never notice which link delivered the data.",
    optimizations: [
      "Tuned export frequency per table group so hot tables refresh fastest.",
      "Landing folder layout designed for Auto Loader pickup with zero file listing overhead.",
      "Merge keys dedupe overlap during switchover, so a failover never double-loads.",
    ],
    metrics: [
      { label: "Ingestion Paths", value: "2", description: "primary + fallback" },
      { label: "Failover", value: "Auto", description: "no manual intervention" },
    ],
    sections: [
      {
        title: "Failover behavior",
        items: [
          "Health probes track export lag and file arrival cadence.",
          "Sustained lag past threshold triggers the path switch.",
          "Overlap window is deduplicated on merge keys.",
          "Primary path resumes automatically once healthy.",
        ],
      },
    ],
  },

  "operational-db-warehouse": {
    short: "Op DB & Warehouse",
    arch: [
      { title: "Sources", note: "rate-limited", items: [{ logo: "api", label: "APIs" }] },
      {
        title: "Operational",
        in: "ingest jobs",
        note: "system of record",
        items: [{ logo: "mssql", label: "SQL Server" }],
      },
      {
        title: "Warehouse",
        in: "dataflows",
        note: "star · incremental",
        items: [
          { logo: "datafactory", label: "Dataflows" },
          { logo: "warehouse", label: "Star DW" },
        ],
      },
    ],
    problem:
      "Business data lived only inside third-party systems reachable through rate-limited APIs. There was no central store, no history beyond what the APIs exposed, and reporting meant hammering those APIs directly.",
    solution:
      "A two-tier foundation: ingestion jobs pull from the source APIs into a SQL Server operational database, then Synapse dataflows reshape it into a star-schema warehouse — facts and conformed dimensions — that every downstream dashboard queries instead of the APIs.",
    sections: [
      {
        title: "Model design",
        items: [
          "Fact tables for transactions, visits, and inventory events.",
          "Conformed dimensions shared across subject areas (product, store, rep, date).",
          "Incremental loads driven by watermarks, not full refreshes.",
          "Indexing and partitioning tuned to dashboard query patterns.",
        ],
      },
      {
        title: "Reliability",
        items: [
          "Error handling with custom logging and notifications on every load.",
          "Source-to-sink validation checks confirm completeness per run.",
          "SQL test plans verify consistency across databases.",
        ],
      },
    ],
    featuresTitle: "What I built",
  },

  "databricks-cicd-dab": {
    short: "CI/CD · Asset Bundles",
    arch: [
      { title: "Define", note: "YAML as code", items: [{ logo: "databricks", label: "Bundle" }] },
      {
        title: "Validate",
        in: "on PR",
        note: "bundle validate",
        items: [{ logo: "devops", label: "DevOps" }],
      },
      {
        title: "Promote",
        in: "one artifact",
        note: "SP auth · gated",
        items: [{ text: "DEV" }, { text: "TEST" }, { text: "PROD" }],
      },
    ],
    problem:
      "Deployments at Lindsay meant hand-copying notebooks and job configs between workspaces. Code and configuration drifted apart across environments, there was no review trail, and nobody could say with certainty what was running in prod.",
    solution:
      "Everything became code. Databricks Asset Bundles define jobs, pipelines, and cluster configs in YAML; Azure DevOps validates each bundle in pull requests and deploys the same artifact through isolated dev, test, and prod workspaces with environment-specific overrides. Code and infrastructure now travel together — a notebook change can't ship without the job definition that runs it.",
    optimizations: [
      "One bundle artifact promoted through all environments — no rebuilds, no drift.",
      "bundle validate wired into PR checks catches broken configs before merge.",
      "Service principals replace personal tokens for prod deploys.",
      "Environment overrides keep dev clusters small and prod schedules exact.",
    ],
    metrics: [
      { label: "Environments", value: "3", description: "isolated dev / test / prod" },
      { label: "Manual Deploys", value: "Zero", description: "everything ships via pipeline" },
    ],
    sections: [
      {
        title: "Environment strategy",
        items: [
          "Dev: auto-deploy on merge, small clusters, schedules paused.",
          "Test: gated deploy, production-shaped data, schedules live.",
          "Prod: approval-gated, service-principal-owned, fully scheduled.",
        ],
      },
    ],
    featuresTitle: "What the pipeline does",
  },

  /* ---------- DATA ANALYTICS ---------- */

  "powerbi-reporting-suite": {
    short: "Power BI Suite (7)",
    arch: [
      { title: "Warehouse", note: "star schema", items: [{ logo: "mssql", label: "SQL Server" }] },
      {
        title: "Model",
        in: "refresh",
        note: "shared DAX · RLS",
        items: [{ logo: "powerbi", label: "Semantic" }],
      },
      {
        title: "Serve",
        in: "drill-down",
        note: "7 ops dashboards",
        items: [{ logo: "dashboard", label: "Ops views" }],
      },
    ],
    problem:
      "Field reps and ops managers ran the business from spreadsheets: no shared view of shelf life, stock gaps, rep coverage, or merchandising compliance — and by the time a report circulated, the shelf had already changed.",
    solution:
      "Seven connected Power BI dashboards on the star-schema warehouse, sharing one semantic model with common DAX measures and row-level security. Each dashboard answers one operational question, drill-downs run from region to store to item, and scheduled refresh with automated delivery keeps every view current without anyone exporting a thing.",
    optimizations: [
      "One shared semantic model — a measure fixed once is fixed in all seven dashboards.",
      "Row-level security via DAX scopes each rep to their own stores.",
      "Automated refresh and scheduled delivery replaced manual report runs.",
    ],
    sections: [
      {
        title: "Who runs on it",
        items: [
          "Field reps — visit coverage, missing tags, planogram checks on the floor.",
          "Ops — low stock, out of stock, and code-date risk by store.",
          "Quality team — quality incidents and credit tracking.",
          "Leadership — the same numbers, rolled up.",
        ],
      },
    ],
    featuresTitle: "The seven dashboards",
  },

  "lindsay-enterprise-dashboards": {
    short: "Lindsay Dashboards",
    arch: [
      { title: "Gold", note: "Unity Catalog", items: [{ logo: "deltalake", label: "Gold layer" }] },
      {
        title: "BI",
        in: "governed",
        items: [
          { logo: "databricks", label: "AI/BI" },
          { logo: "powerbi", label: "Power BI" },
        ],
      },
      {
        title: "Audience",
        note: "sales · supplier · IT",
        items: [{ logo: "dashboard", label: "Leadership" }],
      },
    ],
    problem:
      "Leadership at Lindsay had refined Medallion-architecture data but no consolidated views on top of it — sales, supplier, and IT questions each meant a fresh ad-hoc query.",
    solution:
      "A set of leadership dashboards built directly on the governed Gold layer: Databricks AI/BI for interactive exploration and Power BI for distribution, each backed by Unity Catalog so access control and lineage come for free.",
    sections: [
      {
        title: "The dashboards",
        items: [
          "Sales — revenue and order performance from Bronze-to-Gold refined data.",
          "Supplier — supplier performance and delivery metrics.",
          "IT metrics — operational KPIs for the technology org.",
        ],
      },
    ],
    featuresTitle: "Built on",
  },

  /* ---------- AI / MACHINE LEARNING ---------- */

  "crop-yield-forecasting": {
    short: "Crop Yield ML",
    arch: [
      {
        title: "Signals",
        note: "NDVI · soil · weather",
        items: [
          { logo: "satellite", label: "Satellite" },
          { logo: "soil", label: "Soil" },
          { logo: "weather", label: "Weather" },
        ],
      },
      {
        title: "Model",
        in: "fuse",
        note: "RF · XGB ensemble",
        items: [{ logo: "sklearn", label: "Ensemble" }],
      },
      {
        title: "Output",
        in: "R² · RMSE",
        note: "field-level",
        items: [{ logo: "yield", label: "Yield t/ha" }],
      },
    ],
    problem:
      "No single signal predicts yield. Vegetation indices miss what's happening underground, soil data misses the season, and weather alone misses the crop — growers needed a field-level estimate months before harvest.",
    solution:
      "A fused feature space: satellite vegetation indices (NDVI / EVI), soil properties, and seasonal weather aligned to the crop calendar, feeding a Random Forest / XGBoost ensemble trained on historical yield. Feature-importance analysis shows which drivers matter, and predictions are scored against actuals with R² and RMSE.",
    optimizations: [
      "Feature windows aligned to growth stages rather than calendar months.",
      "Season-based cross-validation so the model is never scored on a season it trained on.",
      "Ensemble over single model — vegetation and weather errors don't compound.",
    ],
    sections: [
      {
        title: "Feature groups",
        items: [
          "Vegetation — NDVI and EVI trajectories across the season.",
          "Soil — nutrients, pH, and moisture profile.",
          "Weather — rainfall, temperature, growing-degree days.",
          "History — prior-season yield as the baseline signal.",
        ],
      },
    ],
  },

  "demand-forecasting": {
    short: "Demand Forecast",
    arch: [
      {
        title: "Signals",
        note: "sell-through vs orders",
        items: [
          { logo: "pos", label: "POS" },
          { logo: "shipped", label: "Shipments" },
        ],
      },
      {
        title: "Train",
        in: "lag features",
        note: "backtested",
        items: [{ logo: "python", label: "ML" }],
      },
      {
        title: "Plan",
        in: "+15% acc",
        note: "per product",
        items: [{ logo: "chart", label: "Forecast" }],
      },
    ],
    problem:
      "Planning ran on shipped orders alone — but shipments trail what consumers actually buy. The gap between sell-through and shipments meant over-stock on fading products and stockouts on rising ones.",
    solution:
      "Train on both signals. Point-of-sale data captures real consumer demand, shipment history captures the supply response, and the model learns the relationship between them to predict product-level demand for upcoming orders — lifting forecast accuracy 15% over the prior baseline.",
    optimizations: [
      "Lag and rolling-window features capture trend and seasonality per product.",
      "Backtesting across held-out periods before any forecast reached planners.",
      "Forecasts land directly in the planning workflow instead of a separate report.",
    ],
    sections: [
      {
        title: "Why two signals",
        items: [
          "POS = what consumers actually bought this week.",
          "Shipments = what stores ordered — lagging and distorted by inventory.",
          "The divergence between them is itself a predictive feature.",
        ],
      },
    ],
  },
};
