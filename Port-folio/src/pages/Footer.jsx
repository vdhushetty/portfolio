import { useNavigate } from "react-router-dom";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import VisitorCounter from "../components/VisitorCounter";

const links = [
  { label: "Recruiter view", path: "/recruiter" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Writing", path: "/writing" },
  { label: "Recommendations", path: "/recommendations" },
  { label: "Privacy", path: "/privacy" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const navigate = useNavigate();

  const go = (item) => {
    if (item.path) {
      navigate(item.path);
      return;
    }
    const element = document.getElementById(item.id);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    else navigate(`/#${item.id}`);
  };

  return (
    <footer className="border-t border-line bg-canvas-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="status-dot" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-dim">
                System online
              </span>
            </div>
            <h3 className="font-display text-lg font-semibold text-ink">Venkat Sai Dhushetty</h3>
            <p className="font-mono text-xs text-faint mt-1">Data · Analytics · AI/ML</p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            <span className="eyebrow mb-2">Navigate</span>
            {links.map((item) => (
              <button
                key={item.path || item.id}
                onClick={() => go(item)}
                className="text-left text-dim hover:text-signal transition-colors w-fit ul-link"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div>
            <span className="eyebrow mb-3 block">Connect</span>
            <div className="flex gap-3">
              {[
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/vdhushetty/", label: "LinkedIn" },
                { icon: <FaGithub />, href: "https://github.com/vdhushetty", label: "GitHub" },
                { icon: <FaEnvelope />, href: "mailto:venkatsaidhushetty@gmail.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid place-items-center h-11 w-11 rounded-lg border border-line text-dim hover:text-signal hover:border-signal transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-line pt-6 grid gap-3 text-center sm:grid-cols-3 sm:text-left">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} Venkat Sai Dhushetty
          </p>
          <span className="sm:text-center"><VisitorCounter /></span>
          <p className="font-mono text-xs text-faint sm:text-right">React · Vite · server-side APIs</p>
        </div>
      </div>
    </footer>
  );
}
