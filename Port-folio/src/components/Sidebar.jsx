import React from "react";

import { FaHome, FaUser, FaProjectDiagram, FaTools, FaEnvelope, FaMoon, FaSun } from "react-icons/fa";

export default function Sidebar({ darkMode, setDarkMode, setPage }) {
  const links = [
    { page: "home", label: "Home", icon: <FaHome /> },
    { page: "about", label: "About", icon: <FaUser /> },
    { page: "projects", label: "Projects", icon: <FaProjectDiagram /> },
    { page: "skills", label: "Skills", icon: <FaTools /> },
    { page: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full w-20 flex flex-col justify-between items-center py-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50`}>
      <nav className="flex flex-col gap-6 mt-4">
        {links.map((l) => (
          <button
            key={l.page}
            onClick={() => setPage(l.page)}
            className="flex flex-col items-center text-xl text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition focus:outline-none"
          >
            {l.icon}
            <span className="text-xs mt-1">{l.label}</span>
          </button>
        ))}
      </nav>
      <div className="flex flex-col items-center gap-4 mb-2">
        <button
          onClick={() => setDarkMode((v) => !v)}
          className={`p-3 rounded-full border transition ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'}`}
          title="Toggle theme"
        >
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
        <button
          onClick={() => setPage("contact")}
          className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition"
          title="Contact"
        >
          <FaEnvelope />
        </button>
      </div>
    </aside>
  );
}
