import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Data Pipeline Automation",
    description: "Scalable ETL pipeline using Apache Spark and Databricks",
    tech: ["Python", "Spark", "Databricks", "SQL"],
    image: "https://via.placeholder.com/300x200?text=Data+Pipeline",
  },
  {
    title: "BI Dashboard System",
    description: "Interactive Power BI dashboards with DAX calculations",
    tech: ["Power BI", "DAX", "SQL Server"],
    image: "https://via.placeholder.com/300x200?text=BI+Dashboard",
  },
  {
    title: "ML Recommendation Engine",
    description: "Machine learning model for personalized recommendations",
    tech: ["Python", "TensorFlow", "PyTorch"],
    image: "https://via.placeholder.com/300x200?text=ML+Engine",
  },
  {
    title: "Cloud Data Warehouse",
    description: "Snowflake data warehouse with cloud migration",
    tech: ["Snowflake", "AWS", "Python"],
    image: "https://via.placeholder.com/300x200?text=Data+Warehouse",
  },
  {
    title: "Real-time Analytics Platform",
    description: "Kafka-based streaming analytics platform",
    tech: ["Kafka", "Spark Streaming", "Azure"],
    image: "https://via.placeholder.com/300x200?text=Analytics",
  },
  {
    title: "NLP Text Analysis",
    description: "Deep learning NLP model using Transformer architectures",
    tech: ["Hugging Face", "PyTorch", "Python"],
    image: "https://via.placeholder.com/300x200?text=NLP",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Featured Projects</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="glossy-button overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
          >
            <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-blue-600">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-black mb-2 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                  <FaExternalLinkAlt className="text-sm" />
                  Live
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2">
                  <FaGithub className="text-sm" />
                  Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
