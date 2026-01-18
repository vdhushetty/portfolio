
import React from "react";
import { FaPython, FaDatabase, FaCloud, FaAws, FaMicrosoft, FaGoogle, FaSnowflake, FaServer, FaChartBar, FaTable, FaRobot, FaBrain, FaCertificate } from "react-icons/fa";
import { SiDatabricks, SiApachekafka, SiTableau, SiJupyter, SiPandas, SiScikitlearn, SiTensorflow, SiPytorch } from "react-icons/si";

// Custom SVG for PySpark
const PySparkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#F89820" />
    <text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">PySpark</text>
  </svg>
);

// Custom SVG for PowerBI
const PowerBIIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="6" fill="#F2C811" />
    <rect x="9" y="12" width="2.5" height="8" rx="1.25" fill="#333" />
    <rect x="14" y="9" width="2.5" height="11" rx="1.25" fill="#333" />
    <rect x="19" y="16" width="2.5" height="4" rx="1.25" fill="#333" />
  </svg>
);

// Custom SVG icons for missing technologies
const MSSQLIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#CC2927" />
    <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="Arial" fontWeight="bold">SQL</text>
  </svg>
);

const HadoopIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#FFCD00" />
    <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#333" fontFamily="Arial" fontWeight="bold">H</text>
  </svg>
);

const DAXIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#764ABC" />
    <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="Arial" fontWeight="bold">DAX</text>
  </svg>
);

const AzureDevOpsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="16" rx="14" ry="14" fill="#0078D7" />
    <text x="16" y="21" textAnchor="middle" fontSize="10" fill="#fff" fontFamily="Arial" fontWeight="bold">ADO</text>
  </svg>
);

const certifications = [
  {
    name: "Databricks Data Engineer Associate",
    date: "April 2024",
    logo: "https://cdn.worldvectorlogo.com/logos/databricks.svg",
    link: "https://credentials.databricks.com/d8b38b68-a2b3-4533-9e5c-671862730734#gs.aqy8yu",
  },
  {
    name: "Microsoft Azure Data Scientist Associate DP-100",
    date: "December 2023",
    logo: "https://cdn.worldvectorlogo.com/logos/microsoft-azure-1.svg",
    link: "https://learn.microsoft.com/en-us/users/venkatsaidhushetty-2506/credentials/82571ccd8369da80?ref=https%3A%2F%2Fwww.linkedin.com%2F",
  },
];

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <FaPython className="text-blue-500" />, // Python
    skills: [
      { name: "Python", icon: <FaPython className="text-blue-500" /> },
  { name: "MSSQL", icon: <MSSQLIcon /> },
  { name: "DAX", icon: <DAXIcon /> },
    ],
  },
  {
    title: "Database Development & BI tools",
    icon: <FaDatabase className="text-yellow-700" />, // DB
    skills: [
      { name: "SQL Server Management Studio", icon: <FaDatabase className="text-yellow-700" /> },
  { name: "PowerBI", icon: <PowerBIIcon /> },
    ],
  },
  {
    title: "Cloud Computing",
    icon: <FaCloud className="text-cyan-500" />,
    skills: [
      { name: "Databricks", icon: <SiDatabricks className="text-red-500" /> },
  { name: "Microsoft Fabric", icon: <FaMicrosoft className="text-blue-700" /> },
  { name: "Azure", icon: <FaMicrosoft className="text-blue-700" /> },
      { name: "AWS", icon: <FaAws className="text-orange-500" /> },
      { name: "GCP", icon: <FaGoogle className="text-yellow-500" /> },
      { name: "Snowflake", icon: <FaSnowflake className="text-blue-400" /> },
    ],
  },
  {
    title: "Data Engineering",
    icon: <FaServer className="text-gray-700" />,
    skills: [
      { name: "Kafka", icon: <SiApachekafka className="text-black" /> },
  { name: "Pyspark", icon: <PySparkIcon /> },
  { name: "Hadoop", icon: <HadoopIcon /> },
  { name: "Azure DevOps", icon: <AzureDevOpsIcon /> },
      { name: "Glue", icon: <FaAws className="text-orange-500" /> },
      { name: "Dataflow", icon: <FaGoogle className="text-yellow-500" /> },
      { name: "Data Factory", icon: <FaMicrosoft className="text-blue-700" /> },
      { name: "Data Warehousing", icon: <FaDatabase className="text-yellow-700" /> },
      { name: "Modeling", icon: <FaChartBar className="text-green-500" /> },
      { name: "ETL", icon: <FaServer className="text-gray-700" /> },
      { name: "Snowflake", icon: <FaSnowflake className="text-blue-400" /> },
      { name: "Redshift", icon: <FaDatabase className="text-red-700" /> },
    ],
  },
  {
    title: "Data Analysis",
    icon: <FaChartBar className="text-green-500" />,
    skills: [
      { name: "Statistics", icon: <FaTable className="text-blue-500" /> },
      { name: "Hypothesis testing", icon: <FaTable className="text-blue-500" /> },
      { name: "A/B testing", icon: <FaTable className="text-blue-500" /> },
      { name: "EDA", icon: <FaChartBar className="text-green-500" /> },
      { name: "Jupyter", icon: <SiJupyter className="text-orange-500" /> },
      { name: "Pandas", icon: <SiPandas className="text-black" /> },
      { name: "Matplotlib", icon: <FaChartBar className="text-green-500" /> },
  { name: "PowerBI", icon: <PowerBIIcon /> },
      { name: "Tableau", icon: <SiTableau className="text-blue-500" /> },
    ],
  },
  {
    title: "Data Science",
    icon: <FaBrain className="text-pink-500" />,
    skills: [
      { name: "Supervised and Unsupervised learning", icon: <FaRobot className="text-pink-500" /> },
      { name: "Transformers", icon: <FaRobot className="text-pink-500" /> },
      { name: "ANN", icon: <FaBrain className="text-pink-500" /> },
      { name: "CNN", icon: <FaBrain className="text-pink-500" /> },
      { name: "RNN", icon: <FaBrain className="text-pink-500" /> },
      { name: "LSTM", icon: <FaBrain className="text-pink-500" /> },
      { name: "GAN", icon: <FaBrain className="text-pink-500" /> },
      { name: "NLP", icon: <FaRobot className="text-pink-500" /> },
      { name: "Feature engineering", icon: <FaChartBar className="text-green-500" /> },
      { name: "Model deployment", icon: <FaServer className="text-gray-700" /> },
      { name: "Performance optimization", icon: <FaChartBar className="text-green-500" /> },
      { name: "TensorFlow", icon: <SiTensorflow className="text-orange-500" /> },
      { name: "Scikit-Learn", icon: <SiScikitlearn className="text-yellow-700" /> },
      { name: "PyTorch", icon: <SiPytorch className="text-red-700" /> },
    ],
  },
];

const gradientBg = "bg-[#161f2a]";
const cardBg = "bg-[#202a36] shadow-lg rounded-xl p-6 mb-8 border border-[#283347] hover:shadow-2xl transition-shadow duration-300";
const iconStyle = "w-7 h-7 mr-2 inline-block align-middle";

export default function Skills() {
  return (
    <div className="w-full py-10">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Skills & Expertise</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="glossy-button rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4 text-blue-600 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-2xl font-bold text-black">{cat.title}</span>
            </div>
            <ul className="space-y-3">
              {cat.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="text-2xl mr-3">{skill.icon}</span>
                  <span className="font-medium">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
