import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Header({ darkMode, setDarkMode }) {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#blogs", label: "Blogs" },
    { href: "#contact", label: "Contact" },
  ];

  const linkClasses =
    "px-3 py-2 rounded-xl text-sm font-medium transition " +
    "text-gray-900 hover:bg-gray-100 " +                               // light
    "dark:text-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700";      // dark

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#home" className="text-xl font-extrabold tracking-tight">
        </a>

        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClasses}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/vdhushetty/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-blue-600 hover:text-blue-700 transition text-xl"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/vdhushetty"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-800 hover:text-gray-900 transition text-xl dark:text-gray-200 dark:hover:text-white"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:venkatsaidhushetty@gmail.com"
            className="p-2 text-red-600 hover:text-red-700 transition text-xl"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <button
            onClick={() => setDarkMode((v) => !v)}
            className={`px-4 py-2 rounded-xl font-semibold transition border ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-black border-gray-300'}`}
          >
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
          <a
            href="#contact"
            className="hidden sm:inline-block px-3 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
