import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  const handleLinkedIn = () => window.open("https://www.linkedin.com/in/vdhushetty/", "_blank");
  const handleGitHub = () => window.open("https://github.com/vdhushetty", "_blank");
  const handleEmail = () => window.location.href = "mailto:venkatsaidhushetty@gmail.com";

  return (
    <section id="home" className="relative overflow-hidden">
      {/* soft animated gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -inset-[30%] bg-[radial-gradient(ellipse_at_top_left,rgba(79,70,229,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.25),transparent_55%)] animate-[pulse_10s_ease-in-out_infinite]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-24 sm:py-32">
        <p className="inline-flex items-center gap-2 text-xs rounded-full border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 px-3 py-1 mb-5">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Open to opportunities
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500">Your Name</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Frontend Developer — I build fast, accessible web apps with React, Tailwind, and modern tooling.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white font-medium shadow hover:shadow-md active:scale-[0.98] transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 font-medium shadow hover:shadow-md active:scale-[0.98] transition"
          >
            Contact Me
          </a>
          <button
            onClick={handleLinkedIn}
            className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-blue-600 text-white shadow hover:shadow-md hover:bg-blue-700 active:scale-[0.98] transition cursor-pointer"
            title="LinkedIn"
          >
            <FaLinkedin className="text-lg" />
          </button>
          <button
            onClick={handleGitHub}
            className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-gray-800 text-white shadow hover:shadow-md hover:bg-gray-900 active:scale-[0.98] transition cursor-pointer"
            title="GitHub"
          >
            <FaGithub className="text-lg" />
          </button>
          <button
            onClick={handleEmail}
            className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-red-600 text-white shadow hover:shadow-md hover:bg-red-700 active:scale-[0.98] transition cursor-pointer"
            title="Email"
          >
            <FaEnvelope className="text-lg" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:.6; transform:scale(1)} 50%{opacity:.9; transform:scale(1.02)} }
      `}</style>
    </section>
  );
}
