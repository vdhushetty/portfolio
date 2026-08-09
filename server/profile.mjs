import { projects } from "../Port-folio/src/pages/projectsCatalog.js";

export const profile = {
  name: "Venkat Sai Dhushetty",
  location: "Bellevue, Washington",
  headline: "Senior Data Engineer working across data platforms, analytics, data science, and AI/ML.",
  summary:
    "I design real-time data pipelines, analytics platforms, and AI/ML systems with emphasis on reliability, observability, recovery, and measurable cost efficiency.",
  experience: [
    {
      role: "Sr. Databricks Data Engineer",
      company: "Lindsay Corporation",
      period: "March 2026 - Present",
      focus: "Medallion architecture, SQL transformation, validation, and Databricks AI/BI dashboards.",
    },
    {
      role: "Sr. Data Engineer",
      company: "Taylor Farms",
      period: "May 2022 - March 2026",
      focus:
        "Azure Synapse, Databricks, Unity Catalog, streaming, Event Hubs, disaster recovery, D365 retention, and ML operationalization.",
    },
    {
      role: "Data Engineer",
      company: "C2S Technologies",
      period: "January 2017 - January 2020",
      focus:
        "Synapse warehousing, dimensional modeling, incremental loads, data quality, Power BI, DAX, and row-level security.",
    },
  ],
  education: [
    "M.S. Robotics & Autonomous Systems, Arizona State University",
    "B.Tech in Engineering, Jawaharlal Nehru Technological University",
  ],
  certifications: [
    "Microsoft Certified: Azure AI Engineer Associate",
    "Databricks Data Engineer Associate",
    "Microsoft Azure Data Scientist Associate (DP-100)",
  ],
  capabilities: [
    "Python",
    "PySpark",
    "SQL",
    "Databricks",
    "Azure",
    "AWS",
    "GCP",
    "Snowflake",
    "Delta Lake",
    "Kafka",
    "Azure Data Factory",
    "Microsoft Fabric",
    "Power BI",
    "DAX",
    "Statistics",
    "A/B testing",
    "TensorFlow",
    "PyTorch",
    "Transformers",
    "NLP",
    "Scikit-learn",
    "MLOps",
    "Data warehousing",
    "Dimensional modeling",
  ],
};

const stopWords = new Set([
  "about", "and", "are", "can", "does", "for", "from", "have", "how", "into",
  "is", "me", "of", "on", "the", "this", "to", "use", "venkat", "what", "with",
  "you", "your",
]);

function tokens(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9+#./-]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function projectText(project) {
  return [
    project.title,
    project.tagline,
    project.description,
    project.fullDescription,
    ...(project.tech || []),
    ...(project.technologies || []),
    project.problem,
    project.solution,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function relevantProjects(query, limit = 5) {
  const queryTokens = tokens(query);
  return projects
    .map((project) => {
      const haystack = projectText(project);
      const title = project.title.toLowerCase();
      const score = queryTokens.reduce((total, token) => {
        if (title.includes(token)) return total + 5;
        if ((project.tech || []).some((item) => item.toLowerCase().includes(token))) {
          return total + 3;
        }
        return total + (haystack.includes(token) ? 1 : 0);
      }, 0);
      return { project, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildProfileContext(query) {
  const matches = relevantProjects(query);
  const projectFacts = matches.map(({ project }) => ({
    id: project.id,
    title: project.title,
    domain: project.domain,
    summary: project.fullDescription || project.description,
    technologies: project.technologies || project.tech,
    outcomes: project.metrics || [],
    status: project.status,
    evidence: project.evidence,
  }));
  return {
    profile,
    projectFacts,
    sources: matches.map(({ project }) => ({
      id: project.id,
      title: project.title,
      url: "/project/" + project.id,
      evidence: project.evidence?.label || "Portfolio documented",
    })),
  };
}
