// src/pages/Work.jsx
import { FaBriefcase } from "react-icons/fa";

const workExperience = [
  {
    title: "Data Engineer / Data Analyst",
    company: "Taylor Farms",
    type: "Contract",
    period: "May 2022 – Present",
    achievements: [
      "Developed and optimized ETL pipelines using Pyspark in Azure Synapse Analytics, handling large structured and semi-structured datasets, increasing data processing efficiency by 35%.",
      "Wrote efficient SQL and T-SQL queries to support real-time reporting, reducing report generation time by 25%.",
      "Collaborated with data engineers, data scientists, and business teams on predictive modeling to forecast upcoming sales orders, contributing to a 15% improvement in forecast accuracy.",
      "Designed data ingestion and transformation workflows using Azure Event Hub, Azure Data Lake Gen2, and Delta Live Tables, cutting orchestration costs by 30%.",
      "Engineered a data retention solution for D365 that decreased storage costs by 20%.",
      "Migrated pipelines from Azure Synapse Analytics to Azure Databricks, optimizing Spark cluster configurations and reducing compute overhead by 28%.",
      "Built CI/CD pipelines for Azure-based deployments using DevOps best practices.",
    ],
  },
  {
    title: "Data Engineer",
    company: "ThingBlu",
    type: "Contract",
    period: "January 2017 – July 2021",
    achievements: [
      "Developed a data warehouse for agritech data using dataflows in Synapse Analytics with STAR dimensional modeling.",
      "Created and optimized data loading processes within Azure Synapse Analytics with efficient, incremental loading.",
      "Developed interactive Power BI reports and sales dashboards with drill-down capabilities and advanced visualizations.",
      "Created dynamic calculations using DAX, allowing users to interact with reports and explore data from multiple perspectives.",
      "Employed Git version control for database artifacts and Azure Synapse workspace for team collaboration.",
      "Worked on creating complex stored procedures and implemented row-level security using DAX.",
      "Wrote comprehensive test plans in SQL to ensure data consistency across multiple databases.",
      "Created documentation on Medallion architecture in Azure DevOps Wiki, adhering to Microsoft Standards.",
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Work Experience</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="space-y-8">
        {workExperience.map((job, index) => (
          <div
            key={index}
            className="glossy-button rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group border-l-4 border-blue-600"
          >
            <div className="flex items-start gap-6">
              <FaBriefcase className="text-5xl text-blue-600 group-hover:scale-110 transition-transform mt-2" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-black group-hover:text-blue-600 transition mb-1">
                      {job.title}
                    </h3>
                    <p className="text-lg text-gray-700 font-semibold">
                      {job.company} <span className="text-gray-600 font-normal">({job.type})</span>
                    </p>
                  </div>
                  <p className="text-gray-600 font-semibold whitespace-nowrap">{job.period}</p>
                </div>

                <ul className="space-y-3">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="flex gap-3 text-gray-700 text-sm leading-relaxed">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
