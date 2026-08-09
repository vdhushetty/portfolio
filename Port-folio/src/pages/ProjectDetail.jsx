import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiAlertTriangle, FiCheckCircle, FiGrid } from "react-icons/fi";
import { projects, domains, getProjectById } from "./projectsCatalog";
import RefArch, { DataflowList } from "../components/RefArch";
import { Metric } from "../components/ui";
import TrustBadge from "../components/TrustBadge";

const hexFor = (key) => domains.find((d) => d.key === key)?.hex || "#3fe0ff";
const accentClass = { de: "accent-de", da: "accent-da", ai: "accent-ai" };

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = getProjectById(id);

  if (!project || project.placeholder) {
    return (
      <div className="min-h-screen grid place-items-center px-4 pt-16">
        <div className="text-center">
          <h1 className="font-display text-4xl font-semibold mb-3">Case study not found</h1>
          <p className="text-dim mb-8">This project doesn't have a published write-up yet.</p>
          <button
            onClick={() => navigate("/projects")}
            className="rounded-lg bg-signal px-6 py-3 font-mono text-sm text-canvas hover:bg-white transition-colors"
          >
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  const hex = hexFor(project.domain);
  const idx = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(idx - 1 + projects.length) % projects.length];
  const nextProject = projects[(idx + 1) % projects.length];

  return (
    <div className={`min-h-screen pt-16 ${accentClass[project.domain]}`}>
      {/* Header */}
      <div className="relative border-b border-line overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg" />
        <div className="absolute inset-0 -z-10 signal-wash" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 font-mono text-sm text-dim hover:text-signal transition-colors mb-8"
          >
            <FiArrowLeft /> Back to projects
          </button>

          <div>
            <div className="max-w-3xl">
              <span className="eyebrow mb-4 block" style={{ color: "var(--accent)" }}>
                {domains.find((d) => d.key === project.domain)?.label}
              </span>
              <TrustBadge evidence={project.evidence} />
              <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                {project.title}
              </h1>
              <p className="mt-5 text-lg text-dim leading-relaxed">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="chip text-xs">{t}</span>
                ))}
              </div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-2.5 font-mono text-sm text-canvas hover:bg-white transition-colors">
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-line-2 px-5 py-2.5 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors">
                      <FaGithub /> Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Reference architecture + numbered dataflow */}
        {project.refarch && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6">Architecture</h2>
            <div className="panel hud overflow-hidden">
              <div className="viz-surface overflow-x-auto p-4 sm:p-6">
                <RefArch spec={project.refarch} accent={hex} />
              </div>
            </div>
            {project.refarch.dataflow && (
              <>
                <h3 className="font-display text-lg font-semibold mt-8 mb-1">Data flow</h3>
                <DataflowList steps={project.refarch.dataflow} accent={hex} />
              </>
            )}
          </section>
        )}

        {/* Overview */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-lg text-dim leading-relaxed max-w-4xl">{project.fullDescription}</p>
        </section>

        {project.evidence && (
          <section className="rounded-xl border border-line bg-white/[0.02] p-5">
            <p className="eyebrow text-signal">Evidence disclosure</p>
            <p className="mt-2 text-sm text-dim">
              <span className="font-medium text-ink">{project.evidence.source}.</span>{" "}
              {project.evidence.detail}
            </p>
          </section>
        )}

        {/* Metrics */}
        {project.metrics?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-8">Key outcomes</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line panel overflow-hidden">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-surface p-6">
                  <Metric value={m.value} label={m.label} description={m.description} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem / Solution */}
        <div className="grid md:grid-cols-2 gap-6">
          {project.problem && (
            <section className="panel p-7 border-l-2" style={{ borderLeftColor: "var(--color-amber)" }}>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold mb-4 text-amber-400">
                <FiAlertTriangle /> The challenge
              </h2>
              <p className="text-dim leading-relaxed">{project.problem}</p>
            </section>
          )}
          {project.solution && (
            <section className="panel p-7 border-l-2" style={{ borderLeftColor: "var(--color-mint)" }}>
              <h2 className="flex items-center gap-2 font-display text-xl font-semibold mb-4 text-mint">
                <FiCheckCircle /> The solution
              </h2>
              <p className="text-dim leading-relaxed">{project.solution}</p>
            </section>
          )}
        </div>

        {/* Optimizations — numbered, engineering-log style */}
        {project.optimizations?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6">Optimizations</h2>
            <div className="panel divide-y divide-line overflow-hidden">
              {project.optimizations.map((o, i) => (
                <div key={i} className="flex items-start gap-4 px-6 py-4">
                  <span className="font-mono text-sm shrink-0 pt-0.5" style={{ color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-dim text-sm leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Project-specific sections */}
        {project.sections?.map((sec) => (
          <section key={sec.title}>
            <h2 className="font-display text-2xl font-semibold mb-6">{sec.title}</h2>
            {sec.body && <p className="text-dim leading-relaxed max-w-4xl mb-5">{sec.body}</p>}
            {sec.items?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3">
                {sec.items.map((it, i) => (
                  <div key={i} className="flex items-start gap-3 panel p-4">
                    <span className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                    <span className="text-dim text-sm leading-relaxed">{it}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Original design artifact */}
        {project.architecture && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6">Detailed design (Lucidchart)</h2>
            <div className="panel p-4 overflow-hidden">
              <img src={project.architecture} alt="Architecture diagram" className="w-full h-auto rounded-lg" />
            </div>
          </section>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-6">
              {project.featuresTitle || "Key features"}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {project.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 panel p-4">
                  <span className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                  <span className="text-dim text-sm leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Challenges &amp; solutions</h2>
            <p className="text-dim leading-relaxed max-w-4xl">{project.challenges}</p>
          </section>
        )}

        {/* Details */}
        <section className="panel p-8">
          <h2 className="font-display text-xl font-semibold mb-6">Project details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["Duration", project.duration],
              ["Role", project.role],
              ["Team", project.team],
              ["Status", project.status],
            ]
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-faint">{k}</p>
                  <p className="text-ink mt-1">{v}</p>
                </div>
              ))}
          </div>
          {project.technologies?.length > 0 && (
            <div className="mt-8 pt-6 border-t border-line">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-faint mb-4">Full stack</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span key={t} className="chip text-xs">{t}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Phases */}
        {project.steps?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold mb-10">How it works</h2>
            <div className="space-y-6">
              {project.steps.map((step, i) => (
                <div key={i} className="panel p-8">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono text-sm" style={{ color: "var(--accent)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                      <p className="mt-2 text-dim">{step.description}</p>
                    </div>
                  </div>
                  {step.details?.length > 0 && (
                    <ul className="space-y-2.5 mb-6 sm:pl-10">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-dim">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {step.keyPoints?.length > 0 && (
                    <div className="grid gap-2.5 mb-6 sm:pl-10">
                      {step.keyPoints.map((p, j) => (
                        <div key={j} className="rounded-lg border-l-2 bg-white/[0.02] px-4 py-2.5 text-sm text-dim" style={{ borderLeftColor: "var(--accent)" }}>
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                  {step.image && (
                    <img src={step.image} alt={step.title} className="mt-4 w-full rounded-lg border border-line" />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="panel hud text-center py-14 px-6 signal-wash">
          <h2 className="font-display text-3xl font-semibold mb-3">Interested in work like this?</h2>
          <p className="text-dim mb-8">Let's talk about the data problem you're trying to solve.</p>
          <button
            onClick={() => navigate("/#contact")}
            className="inline-flex rounded-lg bg-signal px-7 py-3 font-mono text-sm text-canvas hover:bg-white transition-colors"
          >
            Get in touch
          </button>
        </section>

        {/* Prev / index / next pager */}
        <nav aria-label="Project navigation" className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
          <button
            onClick={() => navigate(`/project/${prevProject.id}`)}
            className="panel panel-hover group p-5 text-left"
          >
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-faint mb-2">
              <FiArrowLeft /> Previous
            </span>
            <span className="font-display font-semibold text-ink group-hover:text-signal transition-colors">
              {prevProject.short || prevProject.title}
            </span>
            <span className="mt-1.5 flex items-center gap-2 font-mono text-[10px] text-faint">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: hexFor(prevProject.domain) }} />
              {domains.find((d) => d.key === prevProject.domain)?.label}
            </span>
          </button>

          <button
            onClick={() => navigate("/projects")}
            aria-label="All projects"
            title="All projects"
            className="panel panel-hover grid place-items-center px-5 py-4 text-dim hover:text-signal"
          >
            <FiGrid className="text-xl" />
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase mt-1.5">All</span>
          </button>

          <button
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="panel panel-hover group p-5 text-right"
          >
            <span className="flex items-center justify-end gap-2 font-mono text-[11px] tracking-[0.18em] uppercase text-faint mb-2">
              Next <FiArrowRight />
            </span>
            <span className="font-display font-semibold text-ink group-hover:text-signal transition-colors">
              {nextProject.short || nextProject.title}
            </span>
            <span className="mt-1.5 flex items-center justify-end gap-2 font-mono text-[10px] text-faint">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: hexFor(nextProject.domain) }} />
              {domains.find((d) => d.key === nextProject.domain)?.label}
            </span>
          </button>
        </nav>
      </div>

      {/* Project switcher rail — ultra-wide screens only */}
      <aside className="hidden 2xl:block fixed right-7 top-32 w-52 z-30" aria-label="Project switcher">
        <div className="panel p-4 max-h-[70vh] overflow-y-auto">
          <div className="eyebrow mb-3">Projects</div>
          {domains.map((d) => (
            <div key={d.key} className="mb-3.5 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.hex }} />
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-faint">
                  {d.label}
                </span>
              </div>
              <ul>
                {projects
                  .filter((p) => p.domain === d.key)
                  .map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => navigate(`/project/${p.id}`)}
                        className={`w-full text-left font-mono text-[11.5px] py-[3px] pl-3.5 border-l transition-colors ${
                          p.id === id
                            ? "text-signal border-signal"
                            : "text-faint border-line hover:text-ink hover:border-line-2"
                        }`}
                      >
                        {p.short || p.title}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
