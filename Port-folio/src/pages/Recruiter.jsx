import { FiArrowRight, FiDownload, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { projects } from "./projectsCatalog";
import TrustBadge from "../components/TrustBadge";

const tracks = [
  {
    id: "data-engineering",
    label: "Data Engineering",
    summary: "Streaming, lakehouse, governance, migration, reliability, and platform cost.",
    proof: ["1,500+ tables streamed", "93% recorded pipeline cost reduction", "Databricks DR and Unity Catalog"],
  },
  {
    id: "analytics",
    label: "Analytics & BI",
    summary: "Dimensional modeling, Power BI, DAX, governed metrics, and operational decision support.",
    proof: ["Star-schema warehouses", "Power BI reporting suites", "Row-level security and validation"],
  },
  {
    id: "ai-ml",
    label: "Data Science & AI",
    summary: "Model development, MLOps, computer vision, forecasting, NLP, and applied robotics.",
    proof: ["Batch and real-time MLOps", "Forecasting and classification", "Robotics and reinforcement learning"],
  },
];

const strongestIds = [
  "d365-finance-operations-replication",
  "databricks-disaster-recovery",
  "unity-catalog-governance",
];

export default function Recruiter() {
  const navigate = useNavigate();
  const strongest = strongestIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  return (
    <main className="min-h-screen pt-16">
      <section className="relative overflow-hidden border-b border-line px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="mx-auto max-w-6xl">
          <span className="eyebrow text-signal">60-second recruiter view</span>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">
            Senior data engineering judgment with analytics and AI range.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-dim">
            I build and modernize data platforms, make reliability and governance
            operational, and connect the engineering layer to measurable business outcomes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/Venkat-Sai-Dhushetty-Resume.pdf" className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-sm text-canvas">
              <FiDownload /> Download résumé
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-portfolio-chat", { detail: { mode: "human" } }))} className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal">
              <FiMessageCircle /> Message me
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <span className="eyebrow">Role fit</span>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {tracks.map((track) => (
              <article key={track.id} className="panel panel-hover p-6">
                <h2 className="font-display text-xl font-semibold">{track.label}</h2>
                <p className="mt-3 text-sm leading-relaxed text-dim">{track.summary}</p>
                <ul className="mt-5 space-y-2">
                  {track.proof.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink">
                      <span className="text-signal">›</span> {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/projects?focus=" + track.id)} className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-signal">
                  See role evidence <FiArrowRight />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section>
          <span className="eyebrow">Strongest evidence</span>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {strongest.map((project) => (
              <button key={project.id} onClick={() => navigate("/project/" + project.id)} className="panel panel-hover p-6 text-left">
                <TrustBadge evidence={project.evidence} compact />
                <h2 className="mt-4 font-display text-xl font-semibold">{project.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-dim">{project.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-signal">
                  Open case study <FiArrowRight />
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel p-7 sm:p-9">
          <div className="grid gap-8 lg:grid-cols-3">
            <div>
              <span className="eyebrow text-signal">Availability</span>
              <p className="mt-2 text-ink">Open to data engineering opportunities.</p>
              <p className="mt-1 text-sm text-faint">Bellevue, Washington · Pacific Time</p>
            </div>
            <div>
              <span className="eyebrow text-signal">Response</span>
              <p className="mt-2 text-ink">Usually within 24 hours.</p>
              <p className="mt-1 text-sm text-faint">Direct website messages reach my private inbox.</p>
            </div>
            <div>
              <span className="eyebrow text-signal">Evidence policy</span>
              <p className="mt-2 text-ink">Claims are labeled by source.</p>
              <p className="mt-1 text-sm text-faint">Credentials link externally; case-study metrics are disclosed as self-reported.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
