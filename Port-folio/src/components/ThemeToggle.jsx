import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () =>
      (typeof document !== "undefined" &&
        document.documentElement.getAttribute("data-theme")) ||
      "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable — fine, just don't persist */
    }
  }, [theme]);

  const isLight = theme === "light";

  return (
    <button
      onClick={() => setTheme(isLight ? "dark" : "light")}
      role="switch"
      aria-checked={isLight}
      aria-label="Toggle lights"
      title={isLight ? "Turn the lights off" : "Turn the lights on"}
      className="relative h-8 w-[58px] shrink-0 rounded-full border border-line bg-canvas-2 transition-colors hover:border-line-2"
    >
      {/* track hints */}
      <FiMoon className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-faint" />
      <FiSun className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-faint" />
      {/* sliding thumb */}
      <span
        className={`absolute top-[3px] left-[3px] grid h-[24px] w-[24px] place-items-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isLight
            ? "translate-x-[26px] bg-amber text-canvas shadow-[0_0_16px_-2px_var(--color-amber)]"
            : "translate-x-0 bg-signal text-canvas shadow-[0_0_16px_-2px_var(--color-signal)]"
        }`}
      >
        {isLight ? <FiSun className="text-sm" /> : <FiMoon className="text-sm" />}
      </span>
    </button>
  );
}
