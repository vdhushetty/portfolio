import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { projectsData } from "./projectsData";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/#projects")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Hero Section with Back Button */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/#projects")}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg mb-8"
          >
            <FaArrowLeft className="text-lg" /> Back to Projects
          </button>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{project.description}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-12">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FaGithub /> View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Overview Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{project.fullDescription}</p>
        </div>

        {/* Key Metrics/Outcomes Section */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Key Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.metrics.map((metric, i) => (
                <div key={i} className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-lg">
                  <p className="text-sm font-semibold text-blue-100 mb-2">{metric.label}</p>
                  <p className="text-3xl font-bold mb-1">{metric.value}</p>
                  {metric.description && <p className="text-sm text-blue-50">{metric.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem Section */}
        {project.problem && (
          <div className="mb-16 bg-red-50 border-l-4 border-red-600 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-900">The Challenge</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{project.problem}</p>
          </div>
        )}

        {/* Solution Section */}
        {project.solution && (
          <div className="mb-16 bg-green-50 border-l-4 border-green-600 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-900">The Solution</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{project.solution}</p>
          </div>
        )}

        {/* Architecture Section */}
        {project.architecture && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Architecture</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={project.architecture}
                alt="Project Architecture"
                className="w-full h-auto object-contain bg-gray-50 p-4"
              />
            </div>
          </div>
        )}

        {/* Key Features Section */}
        {project.features && project.features.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Section */}
        {project.challenges && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Challenges & Solutions</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{project.challenges}</p>
          </div>
        )}

        {/* Project Details Sidebar */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-200 mb-16">
          <h2 className="text-2xl font-bold mb-8">Project Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {project.duration && (
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Duration</p>
                <p className="text-lg text-gray-800 mt-1">{project.duration}</p>
              </div>
            )}

            {project.role && (
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">My Role</p>
                <p className="text-lg text-gray-800 mt-1">{project.role}</p>
              </div>
            )}

            {project.team && (
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Team Size</p>
                <p className="text-lg text-gray-800 mt-1">{project.team}</p>
              </div>
            )}

            {project.status && (
              <div>
                <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Status</p>
                <p className="text-lg text-gray-800 mt-1">{project.status}</p>
              </div>
            )}
          </div>

          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-semibold uppercase tracking-wide mb-4">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {project.steps && project.steps.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-12">Project Phases</h2>
            <div className="space-y-12">
              {project.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 border border-blue-200">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-600 mb-2">{step.title}</h3>
                    <p className="text-lg text-gray-700">{step.description}</p>
                  </div>

                  {step.details && step.details.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Process Overview:</h4>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start gap-3">
                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.keyPoints && step.keyPoints.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Key Points:</h4>
                      <div className="grid md:grid-cols-1 gap-3">
                        {step.keyPoints.map((point, pointIndex) => (
                          <div key={pointIndex} className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                            <p className="text-gray-700">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.image && (
                    <div className="mt-8">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-12 text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">Interested in My Work?</h2>
          <p className="text-2xl font-semibold mb-8 text-white">Let's discuss how I can help your project</p>
          <a
            href="/#contact"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
}
