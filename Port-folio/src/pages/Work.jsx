import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Reveal, SectionHeader } from "../components/ui";

const workExperience = [
  {
    title: "Sr. Databricks Data Engineer",
    company: "Lindsay Corporation",
    type: "Contract",
    period: "March 2026 – Present",
    current: true,
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
      "Designed pipelines in Azure Synapse Analytics to migrate on-premises databases to Azure SQL, then migrated them onto Azure Databricks.",
      "Designed scalable architecture on Databricks + Unity Catalog — centralized access control, data lineage, and auditing across the platform.",
      "Built Databricks workflows with Delta Live Tables to handle streaming inserts, updates, and deletes.",
      "Developed Python notebooks to capture streaming data from Azure Event Hubs and persist it into Delta tables.",
      "Improved ingestion speed with a Databricks Auto Loader framework replicating and accelerating Synapse Link's CSV-to-Parquet conversion.",
      "Architected a Disaster Recovery strategy for Databricks workflows to ensure business continuity.",
      "Architected an Azure Databricks solution to recover and retain BYOD data deleted from Dynamics 365 (D365).",
      "Operationalized ML models in batch and real-time pipelines with governance for traceability and auditability.",
    ],
  },
  {
    title: "Data Engineer",
    company: "C2S Technologies",
    type: "Contract",
    period: "January 2017 – January 2020",
    achievements: [
      "Built an agritech data warehouse in Synapse Analytics with STAR dimensional modeling — schema, relationships, and indexes.",
      "Created incremental, optimized loading processes with appropriate indexing and partitioning to minimize processing time.",
      "Set up error handling with custom logging, notifications, and corrective actions to uphold data integrity.",
      "Developed interactive Power BI dashboards with drill-down across time, region, product, customer, and rep.",
      "Authored dynamic DAX calculations and implemented row-level security to control access to sensitive data.",
      "Wrote SQL test plans validating data consistency at source and sink across multiple databases.",
      "Documented Medallion architecture in Azure DevOps Wiki to Microsoft standards.",
    ],
  },
];

export default function Work({ mode = "all" }) {
  const navigate = useNavigate();
  const featured = mode === "featured";
  const jobs = featured ? workExperience.slice(0, 2) : workExperience;

  return (
    <div>
      <SectionHeader
        index="// 03"
        kicker="Experience"
        title={featured ? "Recent roles, measurable outcomes." : "Where I've shipped."}
        sub={featured ? "A concise view of the teams and platforms behind the case studies." : undefined}
      />

      <div className="relative">
        {/* connecting rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line hidden sm:block" />
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <Reveal key={job.company} delay={i * 80}>
              <div className="relative sm:pl-12">
                <span className="hidden sm:block absolute left-0 top-6 h-4 w-4 rounded-full border-2 border-signal bg-canvas">
                  <span
                    className={`absolute inset-1 rounded-full bg-signal ${
                      job.current ? "node-pulse" : ""
                    }`}
                  />
                </span>
                <div className="panel panel-hover accent-de p-7">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display text-xl font-semibold text-ink">{job.title}</h3>
                        {job.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase text-mint">
                            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> Current
                          </span>
                        )}
                      </div>
                      <p className="text-dim mt-0.5">
                        {job.company}{" "}
                        <span className="font-mono text-xs text-faint">· {job.type}</span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-signal whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {(featured ? job.achievements.slice(0, 2) : job.achievements).map((a, j) => (
                      <li key={j} className="flex gap-3 text-sm text-dim leading-relaxed">
                        <span className="text-signal mt-1 shrink-0 font-mono text-xs">▹</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {featured && (
        <Reveal className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/experience")}
            className="group inline-flex items-center gap-2 rounded-lg border border-line-2 px-6 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors"
          >
            View full experience
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      )}
    </div>
  );
}
