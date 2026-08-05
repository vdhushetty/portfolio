export type Experience = {
  title: string;
  company: string;
  type: string;
  period: string;
  achievements: string[];
};

export const experience: Experience[] = [
  {
    title: "Sr. Databricks Data Engineer",
    company: "Lindsay Corporation",
    type: "Full-time",
    period: "March 2026 – Present",
    achievements: [
      "Designed and implemented a Medallion architecture to process and refine sales data from Bronze to Gold layers.",
      "Developed SQL queries to transform, cleanse, and prepare data for downstream consumption.",
      "Built interactive Databricks AI/BI dashboards for data visualization and insights.",
      "Conducted data validation to ensure accuracy and reliability of datasets.",
    ],
  },
  {
    title: "Sr. Data Engineer",
    company: "Taylor Farms",
    type: "Contract",
    period: "May 2022 – March 2026",
    achievements: [
      "Migrated data pipelines from Azure Synapse Analytics to Azure Databricks; designed Unity Catalog governance with access control, lineage, and auditing.",
      "Authored SQL and Databricks workflows / Delta Live Tables for streaming inserts, updates, and deletes.",
      "Built Event Hub → Delta streaming paths and Fabric Dataflow Gen2 for incremental ingestion.",
      "Operationalized ML models in batch and real-time pipelines with governance for traceability.",
      "Architected D365 BYOD recovery/retention and Databricks disaster recovery for business continuity.",
      "Improved ingestion with Synapse Link / Fabric Link fallbacks and Auto Loader CSV→Parquet acceleration.",
    ],
  },
  {
    title: "Data Engineer",
    company: "C2S Technologies",
    type: "Contract",
    period: "January 2020 – July 2021",
    achievements: [
      "Built agritech data warehouse on Synapse with STAR dimensional modeling, indexing, and partitioning.",
      "Created incremental load processes and dataflow transformations with error handling and logging.",
      "Delivered Power BI sales dashboards with DAX, RLS, drill-down, and scheduled refresh.",
      "Used Git for workspace collaboration; documented Medallion architecture in Azure DevOps Wiki.",
      "Wrote SQL test plans for source/sink validation and data consistency.",
    ],
  },
];
