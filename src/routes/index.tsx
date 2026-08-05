import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Briefcase, Layers } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { SkillIconGrid } from "@/components/skills/skill-chip";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const featured = projects.filter((p) => p.category === "professional").slice(0, 3);

  return (
    <>
      <Hero />

      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-primary">Case studies</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                Selected professional work
              </h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/projects">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-primary">
              <Layers className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold text-fg">Stack depth</h2>
            <p className="mt-2 text-sm text-muted">
              Cloud lakehouses, streaming, BI, and ML foundations — optimized for cost and reliability.
            </p>
            <div className="mt-6 space-y-5">
              {skillGroups.slice(0, 3).map((g) => (
                <div key={g.title}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-subtle">{g.title}</p>
                  <SkillIconGrid skills={g.skills} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Experience</span>
              </div>
              <ul className="space-y-4">
                {experience.map((job) => (
                  <li key={job.company} className="border-l-2 border-primary/40 pl-4">
                    <p className="font-medium text-fg">{job.title}</p>
                    <p className="text-sm text-muted">
                      {job.company} · {job.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-2 text-primary">
                <Award className="h-4 w-4" />
                <span className="text-xs font-medium uppercase tracking-wider">Certifications</span>
              </div>
              <ul className="space-y-3">
                {certifications.map((c) => (
                  <li key={c.name}>
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-bg-elevated/60 p-3 no-underline transition-colors hover:border-primary/40"
                    >
                      <img
                        src={c.image}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-lg object-contain"
                        width={44}
                        height={44}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-snug text-fg">{c.name}</p>
                        <p className="mt-0.5 font-mono text-xs text-muted">{c.date}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-fg sm:text-3xl">Build reliable data products</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Open to impactful data engineering and analytics science work. {profile.yearsExperience} years shipping production systems.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/projects">Browse case studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
