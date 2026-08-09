import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const openCommand = () => window.dispatchEvent(new CustomEvent("toggle-command"));

const navItems = [
  { label: "Recruiter view", path: "/recruiter" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Writing", path: "/writing" },
  { label: "Recommendations", path: "/recommendations" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Navigation({ activeSection }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (item) => {
    setOpen(false);
    if (item.path) {
      navigate(item.path);
      return;
    }
    const element = document.getElementById(item.id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate(`/#${item.id}`);
  };

  const isActive = (item) => {
    if (item.path === "/projects") {
      return location.pathname === "/projects" || location.pathname.startsWith("/project/");
    }
    if (item.path === "/writing") {
      return location.pathname === "/writing" || location.pathname.startsWith("/blog/");
    }
    if (item.path) return location.pathname === item.path;
    return location.pathname === "/" && activeSection === item.id;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => go({ id: "home" })}
          className="flex items-center gap-3 group"
          aria-label="Go to top"
        >
          <span className="grid place-items-center h-8 w-8 rounded-md border border-line-2 font-display font-bold text-signal text-sm group-hover:glow-signal transition-shadow">
            V
          </span>
          <span className="hidden sm:flex flex-col leading-none text-left">
            <span className="font-display font-semibold text-ink text-sm tracking-tight">
              Venkat Sai Dhushetty
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              data · analytics · ai
            </span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.path || item.id}
                onClick={() => go(item)}
                className={`relative px-3.5 py-2 font-mono text-[13px] tracking-wide transition-colors ${
                  active ? "text-signal" : "text-dim hover:text-ink"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-3.5 right-3.5 -bottom-px h-px bg-signal" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={openCommand}
            aria-label="Open command palette"
            className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5 text-dim hover:text-ink hover:border-line-2 transition-colors"
          >
            <FiSearch className="text-sm" />
            <kbd className="font-mono text-[10px] tracking-wide">⌘K</kbd>
          </button>
          <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
            <span className="status-dot" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">
              Open to work
            </span>
          </span>
          <ThemeToggle />
          <button
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden grid place-items-center h-9 w-9 rounded-md border border-line text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-canvas-2/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <button
                key={item.path || item.id}
                onClick={() => go(item)}
                className={`text-left px-3 py-2.5 rounded-lg font-mono text-sm transition-colors ${
                  isActive(item)
                    ? "text-signal bg-signal/5"
                    : "text-dim hover:text-ink hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
