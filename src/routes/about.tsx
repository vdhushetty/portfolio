import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { projects } from "@/data/projects";
import { SkillIconGrid } from "@/components/skills/skill-chip";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-primary">About</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-muted">{profile.title}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { v: profile.yearsExperience, l: "Years" },
              { v: String(projects.length), l: "Projects" },
              { v: "3", l: "Certs" },
            ].map((s) => (
              <div
                key={s.l}
                className="min-w-[4.5rem] rounded-xl border border-border bg-surface px-3 py-2 text-center"
              >
                <div className="font-mono text-base font-semibold text-primary">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wide text-subtle">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          {profile.about}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link to="/contact">Contact</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/projects">Projects</Link>
          </Button>
        </div>
      </header>

      <section className="border-b border-border py-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-primary">Skills</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.title} className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-3 text-xs font-medium text-fg">{g.title}</p>
              <SkillIconGrid skills={g.skills} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border py-8">
        <h2 className="text-sm font-medium uppercase tracking-wider text-primary">Experience</h2>
        <div className="mt-4 space-y-3">
          {experience.map((job) => (
            <article key={job.company} className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-fg">{job.title}</h3>
                <p className="text-xs text-subtle">{job.period}</p>
              </div>
              <p className="text-sm text-muted">
                {job.company} · {job.type}
              </p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {job.achievements.map((a) => (
                  <li key={a} className="text-sm leading-snug text-muted">
                    <span className="text-primary">·</span> {a}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 py-8 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-primary">Education</h2>
          <div className="mt-3 space-y-3">
            {education.map((e) => (
              <article key={e.school} className="rounded-xl border border-border bg-surface p-4">
                <h3 className="text-sm font-semibold text-fg">{e.school}</h3>
                <p className="mt-1 text-sm text-muted">{e.degree}</p>
                <p className="mt-1 text-xs text-subtle">
                  {e.period}
                  {e.detail ? ` · ${e.detail}` : ""}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-wider text-primary">Certifications</h2>
          <div className="mt-3 space-y-3">
            {certifications.map((c) => (
              <a
                key={c.name}
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 no-underline transition-colors hover:border-primary/40"
              >
                <img src={c.image} alt="" className="h-12 w-12 shrink-0 object-contain" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fg">{c.name}</p>
                  <p className="text-xs text-muted">{c.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
