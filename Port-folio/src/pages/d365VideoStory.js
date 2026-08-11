export const d365ArchitectureEvolution = {
  before: {
    eyebrow: "Previous architecture",
    title: "Three serverless pipelines and two storage zones",
    badge: "3 pipelines · serverless compute",
    tone: "#f4b65d",
    summary:
      "Every 30-minute export triggered a chain of copies and table transitions before CDC could start. The design worked, but each handoff added orchestration, startup time, cost, and another recovery boundary.",
    stages: [
      { logo: "d365", label: "D365 F&O", note: "source tables" },
      { logo: "synapse", label: "Synapse Link", note: "CSV every 30 min", connector: "export" },
      { logo: "azure", label: "Landing ADLS", note: "CSV files", connector: "land" },
      { logo: "datafactory", label: "Copy + convert", note: "CSV → Parquet", pipeline: "Pipeline 01", connector: "serverless", removed: true },
      { logo: "azure", label: "Curated ADLS", note: "Parquet files", connector: "move", removed: true },
      { logo: "databricks", label: "External tables", note: "storage-backed", connector: "register", removed: true },
      { logo: "databricks", label: "Managed tables", note: "Delta", pipeline: "Pipeline 02", connector: "copy" },
      { logo: "deltalake", label: "DLT tables", note: "CDC processing", pipeline: "Pipeline 03", connector: "merge" },
      { logo: "powerbi", label: "Power BI", note: "dashboards", connector: "serve" },
    ],
  },
  after: {
    eyebrow: "Optimized architecture",
    title: "Direct CSV ingestion with two job-compute workflows",
    badge: "2 workflows · job compute",
    tone: "#3fe0a3",
    summary:
      "Synapse Link remains the reliable export contract, but Databricks now ingests the CSV files directly into managed Delta tables. CDC and DLT processing continue in the second workflow, so Power BI receives the same business-ready output through a shorter path.",
    stages: [
      { logo: "d365", label: "D365 F&O", note: "source tables" },
      { logo: "synapse", label: "Synapse Link", note: "CSV every 30 min", connector: "export" },
      { logo: "azure", label: "Landing ADLS", note: "CSV files", connector: "land" },
      { logo: "databricks", label: "Managed tables", note: "direct CSV → Delta", pipeline: "Workflow 01", connector: "job compute" },
      { logo: "deltalake", label: "DLT tables", note: "CDC processing", pipeline: "Workflow 02", connector: "merge" },
      { logo: "powerbi", label: "Power BI", note: "dashboards", connector: "serve" },
    ],
  },
  impacts: [
    { value: "3 → 2", label: "Pipelines to operate and recover" },
    { value: "−1", label: "Storage-copy and conversion layer" },
    { value: "90%", label: "Compute cost reduction", color: "#3fe0a3" },
    { value: "Job compute", label: "Right-sized execution model" },
  ],
};

const narration = `When I joined this project, the data was reaching Power BI, but the path from Dynamics 365 Finance and Operations to analytics had become more complicated and expensive than it needed to be.

The source architecture used Synapse Link to export D365 data as CSV files every thirty minutes. Those files first landed in an Azure Data Lake Storage account. A serverless pipeline then converted the CSV files to Parquet and copied them into a second storage location. Databricks registered that Parquet data as external tables. A second pipeline copied the external tables into managed tables. Finally, a third pipeline applied change data capture logic, moved the processed data into Delta Live Tables, and served the final datasets to Power BI.

So the platform had three pipelines, two storage zones, multiple copies of the same data, and serverless compute starting at several points in the flow. It worked, but every additional handoff created more waiting time, more orchestration, more potential failure points, and more cost. Diagnosing an issue would also require tracing a record across CSV, Parquet, external tables, managed tables, and DLT tables.

My design question was simple: which step was actually creating business value, and which step was only moving data?

We kept the existing Synapse Link CSV export from D365. But we removed the intermediate CSV-to-Parquet conversion and the copy into a second storage account. Databricks now reads the Synapse Link CSV files directly from the landing zone and writes them into managed Delta tables. From there, the second workflow performs CDC processing into DLT tables, and Power BI continues to consume the business-ready output.

This reduced the architecture from three pipelines to two. We also replaced the serverless execution pattern with right-sized Databricks job compute. That change reduced compute cost by approximately ninety percent while removing an entire pipeline and storage-copy layer.

To make sure the redesign did not change the data, I completed validation across the existing and optimized paths. I checked schema compatibility, late and duplicate file handling, incremental watermarks, idempotent retries, row-count reconciliation, and CDC parity. These comparisons confirmed that the data remained consistent from the source through the managed and DLT layers before the optimized path was accepted.

The final result is a simpler system with fewer copies, fewer orchestration boundaries, lower latency through the processing chain, and much lower compute cost. More importantly, the architecture is easier for the engineering team to understand, monitor, recover, and extend.`;

export const d365Video = {
  title: "How I simplified D365 replication and cut compute cost by 90%",
  description:
    "A presenter-led architecture story: establish the original three-pipeline problem, animate the eliminated copy layer, reveal the two-workflow design, and close on operational outcomes.",
  duration: "2:40",
  src: "/videos/d365-replication-background-v2.mp4",
  poster: "/videos/d365-replication-poster-v2.jpg",
  draftLabel: "Silent animation draft · narration pending",
  scriptPath: "/video-scripts/d365-replication-2-3-minute-script.txt",
  script: narration,
  scenes: [
    {
      time: "0:00–0:15",
      title: "The business problem",
      onscreen: "Data arrived, but too many handoffs made the path slow, expensive, and difficult to recover.",
      motion: "Open on the finished Power BI dashboard, then zoom backward through the pipeline until the full complexity fills the frame.",
    },
    {
      time: "0:15–0:45",
      title: "Previous architecture",
      onscreen: "D365 → 30-min CSV → Parquet copy → external tables → managed tables → DLT → Power BI",
      motion: "Reveal each service logo in sequence. Animate three numbered pipeline bands and pulse each storage copy in amber.",
    },
    {
      time: "0:45–1:05",
      title: "Why it hurt",
      onscreen: "3 pipelines · 2 storage zones · repeated startup and recovery boundaries",
      motion: "Freeze the flow, highlight duplicated data, then stack cost, latency, and troubleshooting callouts beside the handoffs.",
    },
    {
      time: "1:05–1:25",
      title: "The design decision",
      onscreen: "Keep the reliable export. Remove movement that creates no business value.",
      motion: "Isolate Synapse Link in blue, dim the rest, and draw a bright direct path from landing CSV to Databricks managed tables.",
    },
    {
      time: "1:25–1:55",
      title: "Optimized architecture",
      onscreen: "CSV → managed Delta tables → CDC/DLT → Power BI",
      motion: "Dissolve the Parquet conversion, second ADLS zone, and external-table step. Morph the counter from three pipelines to two.",
    },
    {
      time: "1:55–2:25",
      title: "Data parity validation",
      onscreen: "Validated: schema · file completeness · watermarks · idempotent retries · row-count + CDC parity",
      motion: "Build the completed validation checklist, turn each control mint as it passes, then lock the source and target results in sync.",
    },
    {
      time: "2:25–2:40",
      title: "Outcome",
      onscreen: "3 → 2 pipelines · one copy layer removed · 90% lower compute cost",
      motion: "Finish with a clean architecture hero frame, an animated cost gauge falling from 100 to 10, and the project title lockup.",
    },
  ],
};
