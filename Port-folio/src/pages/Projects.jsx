import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";
import { projects, domains } from "./projectsCatalog";
import { PlatformPipeline } from "../components/ArchFlow";
import {
  ArchitectureEvolutionThumbnail,
  ProjectArchitectureThumbnail,
} from "../components/ArchitectureEvolution";
import { Reveal } from "../components/ui";
import TrustBadge from "../components/TrustBadge";

const accentClass = { de: "accent-de", da: "accent-da", ai: "accent-ai" };
const featuredProjectIds = [
  "d365-finance-operations-replication",
  "databricks-disaster-recovery",
  "synapse-databricks-migration",
];

function ProjectThumbnail({ project, hex }) {
  if (project.architectureEvolution) {
    return <ArchitectureEvolutionThumbnail story={project.architectureEvolution} accent={hex} />;
  }
  return <ProjectArchitectureThumbnail project={project} accent={hex} />;
}

function ProjectCard({ project, hex, focused }) {
  const navigate = useNavigate();
  const metrics = (project.metrics || []).slice(0, 2);

  return (
    <Reveal>
      <article
        id={`card-${project.id}`}
        onClick={() => navigate(`/project/${project.id}`)}
        className={`group relative panel panel-hover cursor-pointer overflow-hidden h-full flex flex-col ${
          accentClass[project.domain]
        } ${focused ? "ring-2 ring-signal ring-offset-2 ring-offset-canvas" : ""}`}
      >
        <div className="sheen" />

        {/* Project-specific architecture thumbnail */}
        <div className="relative viz-surface border-b border-line min-h-[196px] grid place-items-center">
          <ProjectThumbnail project={project} hex={hex} />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="eyebrow" style={{ color: "var(--accent)" }}>
              Case study
            </span>
            <TrustBadge evidence={project.evidence} compact />
          </div>
          <h3 className="font-display text-xl font-semibold text-ink leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-dim leading-relaxed line-clamp-2">{project.tagline}</p>

          {metrics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              {metrics.map((m) => (
                <span key={m.label} className="font-mono text-sm">
                  <span style={{ color: "var(--accent)" }}>{m.value}</span>{" "}
                  <span className="text-faint text-xs">{m.label.toLowerCase()}</span>
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="chip text-[11px] px-2 py-1">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[13px] group-hover:gap-2.5 transition-all"
              style={{ color: "var(--accent)" }}
            >
              Open case study
              <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Projects({ mode = "all" }) {
  const [searchParams] = useSearchParams();
  const focusMap = {
    "data-engineering": "de",
    analytics: "da",
    "ai-ml": "ai",
    de: "de",
    da: "da",
    ai: "ai",
  };
  const requestedDomain = focusMap[searchParams.get("focus")] || "de";
  const requestedQuery = searchParams.get("skill") || searchParams.get("q") || "";
  const [active, setActive] = useState(requestedDomain);
  const [query, setQuery] = useState(requestedQuery);
  const [focusId, setFocusId] = useState(null);
  const navigate = useNavigate();
  const domain = domains.find((d) => d.key === active);

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (project.domain !== active) return false;
      if (!normalized) return true;
      return [
        project.title,
        project.tagline,
        project.description,
        ...(project.tech || []),
        ...(project.technologies || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });
  }, [active, query]);
  const featuredProjects = featuredProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter(Boolean);

  const jump = (p) => {
    if (p.domain !== active) setActive(p.domain);
    setFocusId(p.id);
  };

  useEffect(() => {
    if (!focusId) return;
    const scroll = setTimeout(() => {
      document
        .getElementById(`card-${focusId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
    const clear = setTimeout(() => setFocusId(null), 2600);
    return () => {
      clearTimeout(scroll);
      clearTimeout(clear);
    };
  }, [focusId, active]);

  if (mode === "featured") {
    return (
      <div className="w-full">
        <Reveal className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="eyebrow text-signal">// 01</span>
            <span className="h-px w-8 bg-signal" />
            <span className="eyebrow">Selected work</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-ink max-w-4xl text-balance">
            Three systems that show how I build.
          </h2>
          <p className="mt-5 text-dim max-w-2xl">
            A focused sample of production work across scale, reliability, and platform
            modernization. The full catalog spans professional and academic work across three domains.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              hex={domains.find((d) => d.key === project.domain)?.hex}
            />
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/projects")}
            className="group inline-flex items-center gap-2 rounded-lg border border-line-2 px-6 py-3 font-mono text-sm text-ink hover:border-signal hover:text-signal transition-colors"
          >
            View all {projects.length} projects
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Reveal>
      </div>
    );
  }

  return (
    <section className="w-full">
      <Reveal className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="eyebrow text-signal">// 01</span>
          <span className="h-px w-8 bg-signal" />
          <span className="eyebrow">Project catalog</span>
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-semibold text-ink max-w-4xl text-balance">
          All projects, across the whole data stack.
        </h2>
        <p className="mt-5 text-dim max-w-2xl">
          It's all one platform: sources flow through ingestion and processing into
          serving and consumption. Pick a discipline below — every card is a real
          architecture, drawn with the tools that ran it.
        </p>
      </Reveal>

      {/* High-level platform pipeline */}
      <Reveal className="mb-12">
        <PlatformPipeline projects={projects} />
      </Reveal>

      <Reveal className="mb-8">
        <label className="relative block max-w-xl">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, tools, or capabilities"
            className="w-full rounded-xl border border-line bg-surface py-3 pl-11 pr-11 text-ink placeholder:text-faint focus:border-signal focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center text-faint hover:text-ink"
              aria-label="Clear project search"
            >
              <FiX />
            </button>
          )}
        </label>
      </Reveal>

      <div className="grid lg:grid-cols-[225px_1fr] gap-10 items-start">
        {/* Sidebar — full project index */}
        <aside className="hidden lg:block sticky top-24">
          <div className="eyebrow mb-4">Project index</div>
          <nav className="space-y-5">
            {domains.map((d) => (
              <div key={d.key}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: d.hex }} />
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim">
                    {d.label}
                  </span>
                </div>
                <ul className="border-l border-line ml-[3px] pl-3.5 space-y-0.5">
                  {projects
                    .filter((p) => p.domain === d.key)
                    .map((p) => (
                      <li key={p.id}>
                        <button
                          onClick={() => jump(p)}
                          className={`w-full text-left font-mono text-[12.5px] py-1 transition-colors ${
                            focusId === p.id
                              ? "text-signal"
                              : "text-faint hover:text-ink"
                          }`}
                        >
                          {p.short || p.title}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
          <div className="mt-6 pt-4 border-t border-line font-mono text-[10px] text-faint">
            {projects.length} projects · {domains.length} domains
          </div>
        </aside>

        {/* Main — tabs + 2-column grid */}
        <div>
          <div
            role="tablist"
            aria-label="Project domains"
            className="flex flex-wrap gap-2 border-b border-line pb-4 mb-6"
          >
            {domains.map((d) => {
              const on = d.key === active;
              const count = projects.filter((p) => p.domain === d.key).length;
              return (
                <button
                  key={d.key}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(d.key)}
                  className={`inline-flex items-center gap-2.5 rounded-lg border px-4 py-2.5 font-mono text-sm transition-all ${
                    on ? "text-ink" : "border-line text-dim hover:text-ink hover:border-line-2"
                  }`}
                  style={
                    on
                      ? {
                          borderColor: d.hex,
                          background: `color-mix(in srgb, ${d.hex} 10%, transparent)`,
                        }
                      : undefined
                  }
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: d.hex, boxShadow: on ? `0 0 10px ${d.hex}` : "none" }}
                  />
                  {d.label}
                  <span className="text-faint">{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>

          <Reveal key={`blurb-${active}`} className="mb-6 flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: domain.hex }} />
            <p className="text-dim text-sm">{domain.blurb}</p>
          </Reveal>

          <div key={`grid-${active}`} className="grid md:grid-cols-2 gap-6">
            {items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                hex={domain.hex}
                focused={focusId === project.id}
              />
            ))}
          </div>
          {items.length === 0 && (
            <div className="panel p-8 text-center">
              <p className="text-ink">No projects in this domain match “{query}”.</p>
              <button onClick={() => setQuery("")} className="mt-3 font-mono text-sm text-signal">
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
