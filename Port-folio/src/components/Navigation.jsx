import { useState } from 'react';
import { FaHome, FaUser, FaProjectDiagram, FaCogs, FaChartBar, FaEnvelope, FaGraduationCap, FaBriefcase, FaPen } from "react-icons/fa";

const navItems = [
  { icon: <FaHome />, label: "Home", id: "home" },
  { icon: <FaUser />, label: "About", id: "about" },
  { icon: <FaCogs />, label: "Skills", id: "skills" },
  { icon: <FaChartBar />, label: "Certifications", id: "certifications" },
  { icon: <FaProjectDiagram />, label: "Projects", id: "projects" },
  { icon: <FaBriefcase />, label: "Work", id: "work" },
  { icon: <FaGraduationCap />, label: "Education", id: "education" },
  { icon: <FaPen />, label: "Blogs", id: "blogs" },
  { icon: <FaEnvelope />, label: "Contact", id: "contact" },
];

export default function Navigation({ activeSection }) {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white backdrop-blur-md bg-opacity-95 border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-black">Portfolio</div>
        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-black hover:bg-gray-100 active:scale-95'
              }`}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="md:hidden flex gap-2">
          {navItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`p-2 rounded-lg transition-all duration-300 text-lg ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-black hover:bg-gray-100'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
