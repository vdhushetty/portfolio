import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  HelpCircle,
  Layers,
  LineChart,
  Users,
  Workflow,
  Github,
  ExternalLink,
} from "lucide-react";
import { getProject } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoSlot } from "@/components/projects/video-slot";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = getProject(params.id);
    if (!project) throw notFound();
    return { project };
  },
  component: ProjectDetailPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-fg">Project not found</h1>
      <Button asChild className="mt-6">
        <Link to="/projects">Back to projects</Link>
      </Button>
    </div>
  ),
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  return (
    <div>
      <section className="relative border-b border-border overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
          </Button>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">Project overview</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight text-fg sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{project.description}</p>
          {project.brief && (
            <div className="mt-5 max-w-2xl rounded-xl border border-border bg-surface/80 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-primary">What I did</p>
              <p className="mt-2 text-sm leading-relaxed text-fg sm:text-base">{project.brief}</p>
            </div>
          )}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.metrics.map((m, i) => (
              <div
                key={m.label}
                className={`rounded-xl border bg-surface p-4 ${
                  i === 0 ? "border-primary/40 metric-glow" : "border-border"
                }`}
              >
                <div className="font-mono text-2xl font-semibold tabular-nums text-primary">{m.value}</div>
                <div className="mt-1 text-xs font-medium text-fg">{m.label}</div>
                <div className="mt-0.5 text-xs text-subtle">{m.description}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" /> {project.duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-primary" /> {project.role} · {project.team}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {project.status}
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6 sm:py-16">
        <section className={project.showVideo ? "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" : "grid gap-6"}>
          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 text-primary">
                <HelpCircle className="h-5 w-5" />
                <h2 className="text-sm font-medium uppercase tracking-wider">The Question</h2>
              </span>
              <span className="rounded-full border border-border bg-bg-elevated px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
                {project.category === "academic" ? "Academic" : "Professional"}
              </span>
              {project.organization && (
                <span className="text-xs text-subtle">{project.organization}</span>
              )}
            </div>
            <p className="text-xl font-semibold leading-snug text-fg sm:text-2xl">{project.question}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{project.questionDetail}</p>
            <div className="mt-6 rounded-xl border border-border bg-bg-elevated p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-subtle">
                {project.category === "academic" ? "What I did (high level)" : "Problem snapshot"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {project.category === "academic" ? project.fullDescription : project.problem}
              </p>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-4 py-2.5 text-sm font-medium text-fg no-underline transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-4 w-4" /> View on GitHub <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {project.showVideo && (
            <div className="space-y-4">
              <VideoSlot title={project.videoTitle} videoUrl={project.videoUrl} poster={project.coverImage} />
              <p className="text-center text-xs text-subtle">Video walkthrough · Coming soon</p>
            </div>
          )}
        </section>

        <section>
          <div className="mb-5 flex items-center gap-2 text-primary">
            <LineChart className="h-5 w-5" />
            <h2 className="text-sm font-medium uppercase tracking-wider">Visual Exploration</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {project.coverImage && (
              <div className="overflow-hidden rounded-2xl border border-border bg-surface md:col-span-2">
                <div className="border-b border-border px-4 py-3 text-sm font-medium text-fg">Project visual</div>
                <div className="bg-bg p-0">
                  <img src={project.coverImage} alt={project.title} className="mx-auto max-h-80 w-full object-cover" loading="lazy" />
                </div>
              </div>
            )}
            {project.visualAssets.map((asset) => (
              <div key={asset.label} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="border-b border-border px-4 py-3 text-sm font-medium text-fg">{asset.label}</div>
                {asset.src ? (
                  <div className="bg-bg p-3 sm:p-4">
                    <img src={asset.src} alt={asset.label} className="mx-auto max-h-72 w-full object-contain" loading="lazy" />
                  </div>
                ) : (
                  <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-bg-elevated p-6">
                    <div className="h-24 w-full max-w-xs"><MiniChart /></div>
                    <p className="text-xs text-subtle">Illustrative {asset.type} placeholder</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {project.architectureFlow && (
          <section>
            <ArchitectureDiagram flow={project.architectureFlow} />
          </section>
        )}

        <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="mb-5 flex items-center gap-2 text-primary">
            <Layers className="h-5 w-5" />
            <h2 className="text-sm font-medium uppercase tracking-wider">Building the Foundation</h2>
          </div>
          <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{project.solution}</p>
          <ol className="mb-8 space-y-3">
            {project.foundationSteps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm text-fg">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="pt-1 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          {project.foundationSketch && (
            <div className="rounded-xl border border-border bg-bg p-4 font-mono text-xs leading-relaxed text-muted sm:text-sm">
              <div className="mb-2 text-primary">// foundation sketch</div>
              <pre className="whitespace-pre-wrap">{project.foundationSketch}</pre>
            </div>
          )}
          <div className="mt-6">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-subtle">Tech stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-2 text-primary">
              <Workflow className="h-4 w-4" />
              <h2 className="text-sm font-medium uppercase tracking-wider">{project.category === "academic" ? "Outcomes" : "What shipped"}</h2>
            </div>
            <ul className="space-y-2.5">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Challenges</h2>
            <p className="text-sm leading-relaxed text-muted">{project.challenges}</p>
          </div>
        </section>

        {project.steps && project.steps.length > 0 && (
          <section>
            <h2 className="mb-5 text-sm font-medium uppercase tracking-wider text-primary">Lifecycle steps</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.steps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-border bg-surface overflow-hidden">
                  {step.image && (
                    <div className="border-b border-border bg-bg p-3">
                      <img src={step.image} alt={step.title} className="mx-auto max-h-40 object-contain" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-fg">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted">{step.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {step.keyPoints.map((k) => (
                        <li key={k} className="text-xs text-subtle">· {k}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap gap-3 border-t border-border pt-8">
          <Button asChild>
            <Link to="/projects">All projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Discuss a similar system</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function MiniChart() {
  const bars = [40, 65, 48, 80, 55, 90, 70, 88];
  return (
    <svg viewBox="0 0 200 80" className="h-full w-full text-primary" aria-hidden>
      {bars.map((h, i) => (
        <rect key={i} x={i * 24 + 8} y={80 - h * 0.7} width="14" height={h * 0.7} rx="3" fill="currentColor" opacity={0.35 + i * 0.08} />
      ))}
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={bars.map((h, i) => `${i * 24 + 15},${80 - h * 0.7 - 4}`).join(" ")} />
    </svg>
  );
}
