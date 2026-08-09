import { useEffect, useRef, useState } from "react";
/* eslint-disable react-refresh/only-export-components */

/* ------------------------------------------------------------------
   useReveal — reveal an element the first time it scrolls into view.
   ------------------------------------------------------------------ */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const optionsRef = useRef(options);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px", ...optionsRef.current }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

/* ------------------------------------------------------------------
   Reveal — wrapper that fades/rises children into view on scroll.
   `delay` is in ms; children stay put once revealed.
   ------------------------------------------------------------------ */
export function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const Component = as;
  const [ref, visible] = useReveal();
  return (
    <Component
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/* ------------------------------------------------------------------
   useCountUp — animate a number up once its container is on screen.
   ------------------------------------------------------------------ */
function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target, { duration = 1400, decimals = 0, start = false } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!start) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || target === 0) {
      rafRef.current = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(rafRef.current);
    }
    let startTime;
    const tick = (now) => {
      if (startTime === undefined) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(target * easeOut(progress));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return decimals > 0 ? value.toFixed(decimals) : Math.round(value);
}

/* ------------------------------------------------------------------
   Metric — a telemetry tile. Parses a display string like "93%",
   "1,500+", "<1 hour" or "Zero" and animates only the numeric part.
   ------------------------------------------------------------------ */
export function Metric({ value, label, description, className = "" }) {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  const match = String(value).match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const rawNum = match ? match[2] : null;
  const suffix = match ? match[3] : "";
  const decimals = rawNum && rawNum.includes(".") ? rawNum.split(".")[1].length : 0;
  const numeric = rawNum ? parseFloat(rawNum.replace(/,/g, "")) : 0;
  const animated = useCountUp(numeric, { start: visible, decimals });
  const display = rawNum
    ? `${prefix}${Number(animated).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`
    : value;

  return (
    <div ref={ref} className={className}>
      <div
        className="font-display text-3xl sm:text-4xl font-semibold tabular-nums"
        style={{ color: "var(--accent, var(--color-signal))" }}
      >
        {display}
      </div>
      <div className="mt-1 text-sm font-medium text-ink">{label}</div>
      {description ? (
        <div className="mt-0.5 text-xs text-faint leading-snug">{description}</div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------
   SectionHeader — the recurring "// INDEX · TITLE" console header.
   ------------------------------------------------------------------ */
export function SectionHeader({ index, kicker, title, sub, accent = "var(--color-signal)" }) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="eyebrow" style={{ color: accent }}>
          {index}
        </span>
        <span className="h-px w-8" style={{ background: accent }} />
        <span className="eyebrow">{kicker}</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-semibold text-ink max-w-3xl text-balance">
        {title}
      </h2>
      {sub ? <p className="mt-4 text-dim max-w-2xl">{sub}</p> : null}
    </Reveal>
  );
}
