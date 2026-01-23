import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projectsData } from "./projectsData";

export default function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="w-full">
      <div className="mb-12">
        <h2 className="text-5xl font-bold mb-4 text-black">Featured Projects</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="glossy-button overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              {project.logo ? (
                <img
                  src={project.logo}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              )}
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
                {project.liveUrl && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, "_blank");
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    Live
                  </button>
                )}
                {project.githubUrl && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, "_blank");
                    }}
                    className={`px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 ${!project.liveUrl ? "flex-1" : ""}`}
                  >
                    <FaGithub className="text-sm" />
                    Code
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200">
          View All Projects
        </button>
      </div>
    </section>
  );
}
