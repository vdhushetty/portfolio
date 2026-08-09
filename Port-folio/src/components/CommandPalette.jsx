import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiCornerDownLeft, FiArrowRight, FiHome, FiGrid, FiCpu,
  FiBriefcase, FiBookOpen, FiAward, FiUser, FiMail, FiFileText, FiFolder,
} from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { projects } from "../pages/projectsCatalog";

const SECTIONS = [
  { id: "home", label: "Home", icon: <FiHome /> },
  { id: "projects", label: "Projects", icon: <FiGrid />, path: "/projects" },
  { id: "experience", label: "Experience", icon: <FiBriefcase />, path: "/experience" },
  { id: "writing", label: "Writing", icon: <FiBookOpen />, path: "/writing" },
  { id: "skills", label: "Skills", icon: <FiCpu /> },
  { id: "education", label: "Education", icon: <FiAward /> },
  { id: "certifications", label: "Certifications", icon: <FiAward /> },
  { id: "about", label: "About", icon: <FiUser /> },
  { id: "contact", label: "Contact", icon: <FiMail /> },
];

const openUrl = (url) => () => window.open(url, "_blank", "noopener,noreferrer");

const LINKS = [
  { id: "resume", label: "Download résumé", icon: <FiFileText />, run: openUrl("/Venkat-Sai-Dhushetty-Resume.pdf") },
  { id: "linkedin", label: "LinkedIn", icon: <FaLinkedin />, run: openUrl("https://www.linkedin.com/in/vdhushetty/") },
  { id: "github", label: "GitHub", icon: <FaGithub />, run: openUrl("https://github.com/vdhushetty") },
  { id: "email", label: "Email me", icon: <FiMail />, run: () => (window.location.href = "mailto:venkatsaidhushetty@gmail.com") },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const closePalette = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const actions = useMemo(() => {
    // Section jumps fall back to routed navigation when the landing
    // sections aren't in the DOM (i.e. on case-study / blog pages).
    const goSection = (section) => () => {
      if (section.path) {
        navigate(section.path);
        return;
      }
      const el = document.getElementById(section.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else navigate(`/#${section.id}`);
    };
    return [
      ...SECTIONS.map((s) => ({ ...s, group: "Navigate", run: goSection(s) })),
      ...projects.map((p) => ({
        id: `proj-${p.id}`,
        label: p.short || p.title,
        group: "Projects",
        icon: <FiFolder />,
        run: () => navigate(`/project/${p.id}`),
      })),
      ...LINKS.map((l) => ({ ...l, group: "Actions" })),
    ];
  }, [navigate]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [query, actions]);

  // Open on Cmd/Ctrl+K, close on Esc; also respond to the nav trigger.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setQuery("");
        setActive(0);
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActive(0);
      }
    };
    const onTrigger = () => {
      setQuery("");
      setActive(0);
      setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-command", onTrigger);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-command", onTrigger);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 20);
    return () => clearTimeout(focusTimer);
  }, [open]);

  const run = (a) => {
    closePalette();
    // let the overlay unmount before scrolling/navigating
    setTimeout(() => a.run(), 0);
  };

  const onListKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  };

  if (!open) return null;

  let lastGroup = null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="absolute inset-0 bg-canvas/70 backdrop-blur-sm" onClick={closePalette} />
      <div className="relative w-full max-w-xl panel overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <FiSearch className="text-dim shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onListKey}
            placeholder="Jump to a section, project, or action…"
            className="w-full bg-transparent py-4 text-ink placeholder:text-faint focus:outline-none font-body"
          />
          <kbd className="hidden sm:block font-mono text-[10px] text-faint border border-line rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-dim font-mono text-sm">No matches.</li>
          )}
          {results.map((a, i) => {
            const showGroup = a.group !== lastGroup;
            lastGroup = a.group;
            return (
              <li key={a.id}>
                {showGroup && <div className="px-4 pt-3 pb-1 eyebrow text-faint">{a.group}</div>}
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => run(a)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    i === active ? "bg-signal/10 text-ink" : "text-dim"
                  }`}
                >
                  <span className={i === active ? "text-signal" : "text-faint"}>{a.icon}</span>
                  <span className="flex-1 font-body text-sm">{a.label}</span>
                  {i === active && <FiCornerDownLeft className="text-faint text-xs" />}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-line font-mono text-[10px] text-faint">
          <span className="flex items-center gap-1.5">
            <FiArrowRight className="rotate-90" /> navigate
          </span>
          <span>Venkat Sai Dhushetty · console</span>
        </div>
      </div>
    </div>
  );
}
