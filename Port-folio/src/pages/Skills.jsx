import {
  FaPython, FaDatabase, FaCloud, FaAws, FaMicrosoft, FaGoogle, FaSnowflake,
  FaServer, FaChartBar, FaTable, FaRobot, FaBrain,
} from "react-icons/fa";
import {
  SiDatabricks, SiApachekafka, SiTableau, SiJupyter, SiPandas, SiScikitlearn,
  SiTensorflow, SiPytorch,
} from "react-icons/si";
import { Reveal, SectionHeader } from "../components/ui";
import { useNavigate } from "react-router-dom";

const PySparkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#F89820" />
    <text x="16" y="20" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="Arial" fontWeight="bold">Spark</text>
  </svg>
);
const PowerBIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#F2C811" />
    <rect x="9" y="12" width="2.5" height="8" rx="1.25" fill="#333" />
    <rect x="14" y="9" width="2.5" height="11" rx="1.25" fill="#333" />
    <rect x="19" y="16" width="2.5" height="4" rx="1.25" fill="#333" />
  </svg>
);
const MSSQLIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#CC2927" />
    <text x="16" y="20" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">SQL</text>
  </svg>
);
const HadoopIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#FFCD00" />
    <text x="16" y="20" textAnchor="middle" fontSize="10" fill="#333" fontFamily="Arial" fontWeight="bold">H</text>
  </svg>
);
const DAXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#764ABC" />
    <text x="16" y="20" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial" fontWeight="bold">DAX</text>
  </svg>
);
const AzureDevOpsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#0078D7" />
    <text x="16" y="20" textAnchor="middle" fontSize="8" fill="#fff" fontFamily="Arial" fontWeight="bold">ADO</text>
  </svg>
);

const skillCategories = [
  {
    title: "Languages",
    domain: "data-engineering",
    icon: <FaPython />,
    skills: [
      { name: "Python", icon: <FaPython className="text-blue-400" /> },
      { name: "MSSQL", icon: <MSSQLIcon /> },
      { name: "DAX", icon: <DAXIcon /> },
    ],
  },
  {
    title: "Databases & BI",
    domain: "analytics",
    icon: <FaDatabase />,
    skills: [
      { name: "SSMS", icon: <FaDatabase className="text-amber-500" /> },
      { name: "Power BI", icon: <PowerBIIcon /> },
      { name: "Tableau", icon: <SiTableau className="text-sky-400" /> },
    ],
  },
  {
    title: "Cloud",
    domain: "data-engineering",
    icon: <FaCloud />,
    skills: [
      { name: "Databricks", icon: <SiDatabricks className="text-red-400" /> },
      { name: "Microsoft Fabric", icon: <FaMicrosoft className="text-blue-400" /> },
      { name: "Azure", icon: <FaMicrosoft className="text-blue-400" /> },
      { name: "AWS", icon: <FaAws className="text-orange-400" /> },
      { name: "GCP", icon: <FaGoogle className="text-yellow-400" /> },
      { name: "Snowflake", icon: <FaSnowflake className="text-sky-400" /> },
    ],
  },
  {
    title: "Data Engineering",
    domain: "data-engineering",
    icon: <FaServer />,
    skills: [
      { name: "Kafka", icon: <SiApachekafka className="text-white" /> },
      { name: "PySpark", icon: <PySparkIcon /> },
      { name: "Hadoop", icon: <HadoopIcon /> },
      { name: "Azure DevOps", icon: <AzureDevOpsIcon /> },
      { name: "AWS Glue", icon: <FaAws className="text-orange-400" /> },
      { name: "Dataflow", icon: <FaGoogle className="text-yellow-400" /> },
      { name: "Data Factory", icon: <FaMicrosoft className="text-blue-400" /> },
      { name: "Data Warehousing", icon: <FaDatabase className="text-amber-500" /> },
      { name: "ETL / Modeling", icon: <FaServer className="text-slate-300" /> },
      { name: "Redshift", icon: <FaDatabase className="text-red-400" /> },
    ],
  },
  {
    title: "Data Analysis",
    domain: "analytics",
    icon: <FaChartBar />,
    skills: [
      { name: "Statistics", icon: <FaTable className="text-emerald-400" /> },
      { name: "Hypothesis Testing", icon: <FaTable className="text-emerald-400" /> },
      { name: "A/B Testing", icon: <FaTable className="text-emerald-400" /> },
      { name: "EDA", icon: <FaChartBar className="text-emerald-400" /> },
      { name: "Jupyter", icon: <SiJupyter className="text-orange-400" /> },
      { name: "Pandas", icon: <SiPandas className="text-slate-200" /> },
      { name: "Matplotlib", icon: <FaChartBar className="text-emerald-400" /> },
    ],
  },
  {
    title: "Data Science / AI",
    domain: "ai-ml",
    icon: <FaBrain />,
    skills: [
      { name: "Supervised / Unsupervised", icon: <FaRobot className="text-violet-400" /> },
      { name: "Transformers", icon: <FaRobot className="text-violet-400" /> },
      { name: "ANN / CNN / RNN / LSTM", icon: <FaBrain className="text-violet-400" /> },
      { name: "GAN", icon: <FaBrain className="text-violet-400" /> },
      { name: "NLP", icon: <FaRobot className="text-violet-400" /> },
      { name: "Feature Engineering", icon: <FaChartBar className="text-violet-400" /> },
      { name: "Model Deployment", icon: <FaServer className="text-violet-400" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn className="text-amber-400" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-400" /> },
    ],
  },
];

export default function Skills() {
  const navigate = useNavigate();
  return (
    <div>
      <SectionHeader
        index="// 04"
        kicker="Capabilities"
        title="The stack, end to end."
        sub="Six domains I work across daily — from raw ingestion to production models."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 60}>
            <div className="panel panel-hover h-full p-6 group">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-signal text-lg">{cat.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-ink">{cat.title}</h3>
                </div>
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <li key={skill.name}>
                    <button
                      onClick={() =>
                        navigate(
                          "/projects?focus=" +
                            cat.domain +
                            "&skill=" +
                            encodeURIComponent(skill.name)
                        )
                      }
                      className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 py-1.5 text-sm text-dim hover:text-ink hover:border-signal transition-colors"
                      title={"Show project evidence for " + skill.name}
                    >
                      <span className="text-base grid place-items-center w-5 h-5">{skill.icon}</span>
                      {skill.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
