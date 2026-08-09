import { useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiPlay, FiArrowRight, FiFileText } from "react-icons/fi";
import { Reveal, Metric } from "../components/ui";

/* The tech I'm strongest in, grouped by the three domains the
   projects below are organised into. Colour foreshadows the sections. */
const stack = [
  {
    tag: "ENGINEER",
    accent: "var(--color-signal)",
    items: ["Python", "PySpark", "Databricks", "Azure", "Delta Lake", "Kafka", "Data Factory"],
  },
  {
    tag: "ANALYZE",
    accent: "var(--color-amber)",
    items: ["SQL", "Power BI", "DAX", "Statistics", "A/B Testing"],
  },
  {
    tag: "MODEL",
    accent: "var(--color-violet)",
    items: ["TensorFlow", "PyTorch", "Transformers", "NLP", "Scikit-learn"],
  },
];

const headline = [
  { value: "5+", label: "Years shipping data", description: "Azure · AWS · GCP · Snowflake" },
  { value: "1,500+", label: "Tables streamed", description: "Real-time, exactly-once" },
  { value: "93%", label: "Pipeline cost cut", description: "$1,500 → $100 / day" },
  { value: "99.9%", label: "Uptime held", description: "Sub-minute freshness" },
];

/* Borderless intro video that feathers into the page. Poster shows
   until /intro.mp4 (or .webm) is dropped into /public. */
function VideoFeed() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && p.then) p.then(() => setPlaying(true)).catch(() => setFailed(true));
  };

  return (
    <div className="relative w-full max-w-[440px] mx-auto lg:mr-0 aspect-[4/5]">
      {/* ambient halo behind the subject */}
      <div className="absolute inset-6 -z-10 rounded-full bg-signal/15 blur-3xl" />

      <video
        ref={videoRef}
        poster="/Images/mypic.jpg"
        className="blend-mask absolute inset-0 h-full w-full object-cover object-top"
        playsInline
        controls={playing}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src="/intro.mp4" type="video/mp4" />
        <source src="/intro.webm" type="video/webm" />
      </video>

      {/* play control — only when a video is actually available */}
      {!playing && !failed && (
        <button
          onClick={play}
          className="group absolute inset-0 grid place-items-center"
          aria-label="Play introduction video"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-signal/90 text-canvas shadow-[0_0_44px_-4px_var(--color-signal)] transition-transform group-hover:scale-110">
            <FiPlay className="translate-x-0.5 text-2xl" />
          </span>
        </button>
      )}

      {/* floating status tag, no box */}
      <span className="absolute bottom-3 left-1 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-dim">
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            failed ? "bg-amber" : "bg-rose animate-blink"
          }`}
        />
        {failed ? "standby · intro.feed" : "live · press play"}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 overflow-hidden pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute inset-0 -z-10 signal-wash" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">
          {/* Left — identity + stack */}
          <div>
            <Reveal className="flex items-center gap-3 mb-6">
              <span className="status-dot" />
              <span className="eyebrow text-dim">
                System online · Bellevue, WA · Data Engineer
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="font-display font-bold text-ink leading-[0.95] text-[clamp(2.6rem,6.5vw,4.75rem)]">
                Venkat Sai
                <br />
                <span className="text-signal text-glow-signal">Dhushetty</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-6 text-lg text-dim max-w-xl leading-relaxed">
                I design real-time data pipelines, analytics platforms, and AI/ML
                systems — and tune them until they're fast, reliable, and{" "}
                <span className="text-ink">measurably cheaper</span> to run.
              </p>
            </Reveal>

            {/* Tech stack — grouped by domain */}
            <Reveal delay={180} className="mt-9 space-y-3">
              {stack.map((group) => (
                <div key={group.tag} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span
                    className="font-mono text-[11px] tracking-[0.18em] pt-2 w-24 shrink-0"
                    style={{ color: group.accent }}
                  >
                    {group.tag}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>

            {/* CTAs + socials */}
            <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-sm font-medium text-canvas hover:bg-ink transition-colors"
              >
                Explore the work
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/recruiter"
                className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors"
              >
                60-second recruiter view
              </a>
              <button
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors"
              >
                Get in touch
              </button>
              <div className="flex items-center gap-1 ml-1">
                {[
                  { icon: <FiFileText />, href: "/Venkat-Sai-Dhushetty-Resume.pdf", label: "Résumé" },
                  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/vdhushetty/", label: "LinkedIn" },
                  { icon: <FaGithub />, href: "https://github.com/vdhushetty", label: "GitHub" },
                  { icon: <FaEnvelope />, href: "mailto:venkatsaidhushetty@gmail.com", label: "Email" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid place-items-center h-11 w-11 rounded-lg border border-line text-dim hover:text-signal hover:border-signal transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — blended intro video, top corner */}
          <Reveal delay={200} className="lg:justify-self-end w-full lg:-mt-4">
            <VideoFeed />
          </Reveal>
        </div>

        {/* Telemetry strip */}
        <Reveal delay={120} className="mt-16 sm:mt-20">
          <div className="panel grid grid-cols-2 lg:grid-cols-4 divide-line">
            {headline.map((m, i) => (
              <div
                key={m.label}
                className={`p-6 sm:p-7 border-line ${i % 2 === 0 ? "border-r" : ""} ${
                  i < 2 ? "border-b lg:border-b-0" : ""
                } ${i > 0 ? "lg:border-l" : ""}`}
              >
                <Metric value={m.value} label={m.label} description={m.description} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
