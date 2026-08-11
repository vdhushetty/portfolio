/* ------------------------------------------------------------------
   Reference-architecture specs per project, rendered by RefArch.jsx
   in the Azure Architecture Center template: swim-lane zones,
   numbered dataflow steps matched to the list below the diagram,
   and a governance/monitoring band. Facts only — no invented metrics.
   ------------------------------------------------------------------ */

export const refArchSpecs = {
  "d365-finance-operations-replication": {
    zones: [
      { title: "Source", nodes: [{ id: "src", logo: "d365", label: "D365 F&O", sub: "operational tables", viz: "tables" }] },
      { title: "Export", nodes: [{ id: "link", logo: "synapse", label: "Synapse Link", sub: "CSV · every 30 min" }] },
      { title: "Landing", nodes: [{ id: "adls", logo: "azure", label: "ADLS Gen2", sub: "CSV landing zone", viz: "files" }] },
      { title: "Process", nodes: [{ id: "dbx", logo: "databricks", label: "Managed tables", sub: "direct ingest · job compute", viz: "tables" }] },
      { title: "Serve", nodes: [{ id: "delta", logo: "deltalake", label: "DLT + Power BI", sub: "CDC workflow", viz: "medallion" }] },
    ],
    flows: [
      { from: "src", to: "link", step: 1 },
      { from: "link", to: "adls", step: 2, label: "30 min" },
      { from: "adls", to: "dbx", step: 3, label: "CSV → Delta" },
      { from: "dbx", to: "delta", step: 4, label: "CDC" },
    ],
    band: { title: "Execution", label: "Two job-compute workflows · one copy layer removed · 90% lower compute cost", step: 5 },
    dataflow: [
      "Synapse Link exports D365 Finance & Operations data as CSV files every 30 minutes.",
      "The CSV files land once in ADLS Gen2; the previous Parquet conversion and second ADLS copy are no longer required.",
      "Databricks job compute reads the CSV files directly and writes managed Delta tables in the first workflow.",
      "The second workflow applies CDC into DLT tables and serves the business-ready data to Power BI.",
      "The redesign reduces three serverless pipelines to two job-compute workflows and lowers compute cost by 90%.",
    ],
  },

  "databricks-disaster-recovery": {
    zones: [
      { title: "Primary", nodes: [{ id: "pri", logo: "databricks", label: "Primary WS", sub: "live workloads" }] },
      { title: "Replicate", nodes: [{ id: "share", logo: "deltalake", label: "Delta Sharing", sub: "read-only" }] },
      { title: "Secondary", nodes: [{ id: "sec", logo: "databricks", label: "Secondary WS", sub: "DeepClone · 6h" }] },
      { title: "Consume", nodes: [{ id: "fab", logo: "fabric", label: "Fabric shortcuts", sub: "reports failover" }] },
    ],
    flows: [
      { from: "pri", to: "share", step: 1 },
      { from: "share", to: "sec", step: 2, back: true, backLabel: "reverse DeepClone on recovery" },
      { from: "sec", to: "fab", step: 3 },
    ],
    band: { title: "Health", label: "CLI monitor — detects outage, pauses replication, triggers failover & recovery", step: 4 },
    dataflow: [
      "Primary catalogs are shared to the secondary workspace via Delta Sharing — secure, read-only, no duplication.",
      "DeepClone workflows copy shared tables into secondary catalogs every 6 hours as independent datasets.",
      "On failover, Fabric shortcuts are re-pointed via API so reports and dashboards follow the active workspace.",
      "A CLI health monitor watches the primary; on outage it pauses replication and resumes secondary workflows — RPO <1h, RTO 30 min, zero data loss.",
      "On recovery, reverse DeepClone syncs changes back before normal replication resumes.",
    ],
  },

  "synapse-databricks-migration": {
    zones: [
      {
        title: "Legacy",
        nodes: [
          { id: "syn", logo: "synapse", label: "Synapse", sub: "pipelines" },
          { id: "sql", logo: "mssql", label: "SQL Server", sub: "history", viz: "tables" },
        ],
      },
      { title: "Rebuild", nodes: [{ id: "dbx", logo: "databricks", label: "Workflows", sub: "dual-run" }] },
      { title: "Target", nodes: [{ id: "delta", logo: "deltalake", label: "Delta Lake", sub: "job clusters", viz: "medallion" }] },
    ],
    flows: [
      { from: "sql", to: "dbx", step: 1, label: "backfill" },
      { from: "syn", to: "dbx", step: 2, label: "rebuild" },
      { from: "dbx", to: "delta", step: 3, label: "cutover" },
    ],
    band: { title: "Validation", label: "Row-count + checksum parity per table — Synapse kept warm as rollback", step: 4 },
    dataflow: [
      "Historical data is backfilled from SQL Server into Delta Lake.",
      "Each Synapse pipeline is rebuilt as a native Databricks workflow.",
      "Pipelines cut over one by one after outputs match — no big-bang switch.",
      "Dual-run parity checks (row counts + checksums) validate every table; compute overhead drops 28% on job clusters.",
    ],
  },

  "d365-data-retention": {
    zones: [
      { title: "Source", nodes: [{ id: "src", logo: "d365", label: "D365 BYOD", sub: "purge scheduled", viz: "tables" }] },
      { title: "Capture", nodes: [{ id: "cap", logo: "databricks", label: "Capture jobs", sub: "per-entity watermark" }] },
      { title: "Archive", nodes: [{ id: "arc", logo: "deltalake", label: "Delta archive", sub: "entity/date partitions", viz: "files" }] },
    ],
    flows: [
      { from: "src", to: "cap", step: 1, label: "pre-purge sweep" },
      { from: "cap", to: "arc", step: 2, label: "append" },
    ],
    band: { title: "Audit", label: "Every retained batch logged · schema evolution absorbed automatically", step: 3 },
    dataflow: [
      "Capture jobs sweep D365 BYOD data ahead of each scheduled purge window, tracking a watermark per entity.",
      "Deltas append into a partitioned Delta archive — never full snapshots — cutting storage cost 20%.",
      "Each batch is logged for audit; the archive stays queryable via Unity Catalog after D365 deletes the source rows.",
    ],
  },

  "synapse-fabric-link": {
    zones: [
      { title: "Source", nodes: [{ id: "src", logo: "d365", label: "D365", sub: "CDC export" }] },
      {
        title: "Ingest",
        nodes: [
          { id: "syn", logo: "synapse", label: "Synapse Link", sub: "primary path" },
          { id: "fab", logo: "fabric", label: "Fabric Link", sub: "fallback path" },
        ],
      },
      { title: "Store", nodes: [{ id: "adls", logo: "azure", label: "ADLS Gen2", sub: "consistent layout", viz: "files" }] },
      { title: "Serve", nodes: [{ id: "delta", logo: "deltalake", label: "Lakehouse", sub: "merge dedupe" }] },
    ],
    flows: [
      { from: "src", to: "syn", step: 1 },
      { from: "src", to: "fab", step: 2, muted: true },
      { from: "syn", to: "adls", step: 3 },
      { from: "fab", to: "adls", muted: true },
      { from: "adls", to: "delta", step: 4 },
    ],
    band: { title: "Health", label: "Probes track export lag — sustained lag flips the active path, no manual steps", step: 5 },
    dataflow: [
      "Synapse Link runs as the primary CDC export path for D365.",
      "Fabric Link stays configured in parallel as the fallback path.",
      "Both paths land in one consistent ADLS layout, sized for Auto Loader pickup.",
      "Merge keys dedupe the overlap window, so a switchover never double-loads.",
      "Health probes watch export lag and switch paths automatically; the primary resumes when healthy.",
    ],
  },

  "operational-db-warehouse": {
    zones: [
      { title: "Sources", nodes: [{ id: "api", logo: "api", label: "Source APIs", sub: "rate-limited" }] },
      { title: "Operational", nodes: [{ id: "sql", logo: "mssql", label: "SQL Server", sub: "system of record", viz: "tables" }] },
      { title: "Transform", nodes: [{ id: "df", logo: "datafactory", label: "Synapse dataflows", sub: "incremental" }] },
      { title: "Serve", nodes: [{ id: "dw", logo: "warehouse", label: "Star schema DW", sub: "facts + dimensions", viz: "tables" }] },
    ],
    flows: [
      { from: "api", to: "sql", step: 1, label: "ingest jobs" },
      { from: "sql", to: "df", step: 2 },
      { from: "df", to: "dw", step: 3 },
    ],
    band: { title: "Reliability", label: "Custom logging + notifications per load · source-to-sink validation in SQL", step: 4 },
    dataflow: [
      "Ingestion jobs pull from rate-limited source APIs into a SQL Server operational database.",
      "Synapse dataflows reshape operational data on incremental watermarks — never full reloads.",
      "The star-schema warehouse (facts + conformed dimensions) serves every downstream dashboard.",
      "Each load logs, notifies on failure, and validates source-to-sink completeness in SQL test plans.",
    ],
  },

  "databricks-cicd-dab": {
    zones: [
      { title: "Define", nodes: [{ id: "dab", logo: "databricks", label: "Asset Bundle", sub: "jobs · clusters as YAML" }] },
      { title: "Validate", nodes: [{ id: "ado", logo: "devops", label: "Azure DevOps", sub: "bundle validate on PR" }] },
      {
        title: "Promote",
        nodes: [
          { id: "dev", text: "DEV", label: "auto-deploy", sub: "schedules paused" },
          { id: "test", text: "TEST", label: "gated", sub: "prod-shaped data" },
          { id: "prod", text: "PROD", label: "approval", sub: "SP-owned" },
        ],
      },
    ],
    flows: [
      { from: "dab", to: "ado", step: 1 },
      { from: "ado", to: "dev", step: 2 },
      { from: "ado", to: "test", step: 3 },
      { from: "ado", to: "prod", step: 4 },
    ],
    band: { title: "Governance", label: "One artifact promoted — no rebuilds · service principals, not personal tokens", step: 5 },
    dataflow: [
      "Jobs, pipelines, and cluster configs are defined as code in a Databricks Asset Bundle.",
      "Azure DevOps runs bundle validate in PR checks — broken configs never merge.",
      "Merges auto-deploy to dev with schedules paused and small clusters.",
      "The same artifact promotes through gated test to approval-gated, service-principal-owned prod.",
      "Environment overrides keep dev cheap and prod exact; zero manual workspace edits remain.",
    ],
  },

  "powerbi-reporting-suite": {
    zones: [
      { title: "Warehouse", nodes: [{ id: "dw", logo: "mssql", label: "SQL Server DW", sub: "star schema", viz: "tables" }] },
      { title: "Model", nodes: [{ id: "sem", logo: "powerbi", label: "Semantic model", sub: "shared DAX · RLS" }] },
      { title: "Serve", nodes: [{ id: "dash", logo: "dashboard", label: "7 dashboards", sub: "drill-down", viz: "fan" }] },
    ],
    flows: [
      { from: "dw", to: "sem", step: 1, label: "scheduled refresh" },
      { from: "sem", to: "dash", step: 2 },
    ],
    band: { title: "Delivery", label: "Automated refresh + scheduled delivery · RLS scopes each rep to their stores", step: 3 },
    dataflow: [
      "One semantic model imports the star schema on scheduled refresh — a measure fixed once is fixed everywhere.",
      "Seven dashboards serve the retail-ops lifecycle: Code Date, Rep Store Visits, Low/Out of Stock, Quality & Credits, Planogram, Missing Tags, Hot Tags & Error Items.",
      "Row-level security via DAX scopes every field rep to their own stores; delivery is scheduled, not manual.",
    ],
  },

  "lindsay-enterprise-dashboards": {
    zones: [
      { title: "Gold", nodes: [{ id: "gold", logo: "deltalake", label: "Gold layer", sub: "Unity Catalog", viz: "medallion" }] },
      {
        title: "BI",
        nodes: [
          { id: "aibi", logo: "databricks", label: "AI/BI", sub: "interactive" },
          { id: "pbi", logo: "powerbi", label: "Power BI", sub: "distribution" },
        ],
      },
      { title: "Audience", nodes: [{ id: "aud", logo: "dashboard", label: "Leadership", sub: "sales · supplier · IT" }] },
    ],
    flows: [
      { from: "gold", to: "aibi", step: 1 },
      { from: "gold", to: "pbi", step: 2 },
      { from: "aibi", to: "aud", step: 3 },
      { from: "pbi", to: "aud", muted: true },
    ],
    band: { title: "Governance", label: "Unity Catalog — access control and lineage come with the data, not the dashboard", step: 4 },
    dataflow: [
      "Sales data refined Bronze → Gold through the Medallion architecture feeds every view.",
      "Databricks AI/BI dashboards serve interactive exploration straight off the Gold layer.",
      "Power BI distributes governed views of sales, supplier, and IT operational KPIs to leadership.",
      "Unity Catalog carries access control and lineage, so no dashboard needs storage credentials.",
    ],
  },

  "crop-yield-forecasting": {
    zones: [
      {
        title: "Signals",
        nodes: [
          { id: "sat", logo: "satellite", label: "Satellite", sub: "NDVI · EVI" },
          { id: "soil", logo: "soil", label: "Soil", sub: "N-P-K · pH" },
          { id: "wx", logo: "weather", label: "Weather", sub: "rain · GDD" },
        ],
      },
      { title: "Features", nodes: [{ id: "feat", logo: "python", label: "Feature space", sub: "growth-stage windows" }] },
      { title: "Model", nodes: [{ id: "ml", logo: "sklearn", label: "RF · XGBoost", sub: "season-based CV" }] },
      { title: "Output", nodes: [{ id: "out", logo: "yield", label: "Yield t/ha", sub: "field-level" }] },
    ],
    flows: [
      { from: "sat", to: "feat", step: 1 },
      { from: "soil", to: "feat", muted: true },
      { from: "wx", to: "feat", muted: true },
      { from: "feat", to: "ml", step: 2 },
      { from: "ml", to: "out", step: 3, label: "R² · RMSE" },
    ],
    band: { title: "Evaluation", label: "Feature importance + predicted-vs-actual — scored only on unseen seasons", step: 4 },
    dataflow: [
      "Vegetation indices, soil properties, and seasonal weather fuse into one feature space aligned to the crop calendar.",
      "A Random Forest / XGBoost ensemble trains on historical yield.",
      "The model emits field-level yield estimates scored with R² and RMSE.",
      "Season-based cross-validation and feature-importance analysis keep the model honest — it is never scored on a season it trained on.",
    ],
  },

  "demand-forecasting": {
    zones: [
      {
        title: "Signals",
        nodes: [
          { id: "pos", logo: "pos", label: "POS sales", sub: "sell-through" },
          { id: "ship", logo: "shipped", label: "Shipments", sub: "store orders" },
        ],
      },
      { title: "Train", nodes: [{ id: "ml", logo: "python", label: "ML training", sub: "lag + rolling features" }] },
      { title: "Forecast", nodes: [{ id: "fc", logo: "chart", label: "Demand", sub: "per product" }] },
      { title: "Plan", nodes: [{ id: "plan", logo: "warehouse", label: "Planning", sub: "+15% accuracy" }] },
    ],
    flows: [
      { from: "pos", to: "ml", step: 1 },
      { from: "ship", to: "ml", step: 2 },
      { from: "ml", to: "fc", step: 3 },
      { from: "fc", to: "plan", step: 4 },
    ],
    band: { title: "Validation", label: "Backtested on held-out periods before any forecast reached planners", step: 5 },
    dataflow: [
      "Point-of-sale history carries what consumers actually bought.",
      "Shipment history carries what stores ordered — lagging, distorted by inventory; the divergence is itself a feature.",
      "Models train on both signals with lag and rolling-window features per product.",
      "Product-level forecasts land directly in the planning workflow, lifting accuracy 15% over baseline.",
    ],
  },
};
