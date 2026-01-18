import React from "react";

export default function Header({ darkMode, setDarkMode }) {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
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
          {/* <span className="text-black dark:text-white">Venkat</span>{" "}
          <span className="text-gray-900 dark:text-gray-200">Sai</span> */}
        </a>

        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClasses}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
