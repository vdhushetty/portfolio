import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { allTechTags, projects, type ProjectCategory } from "@/data/projects";

export const Route = createFileRoute("/projects/")({ component: ProjectsPage });

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const tags = useMemo(() => allTechTags(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesCat = category === "all" || p.category === category;
      const matchesTag = !tag || p.tech.includes(tag) || p.technologies.includes(tag);
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        (p.organization?.toLowerCase().includes(q) ?? false);
      return matchesCat && matchesTag && matchesQuery;
    });
  }, [query, tag, category]);

  const proCount = projects.filter((p) => p.category === "professional").length;
  const acCount = projects.filter((p) => p.category === "academic").length;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">Projects grid</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          Case studies & academic work
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          {proCount} professional systems and {acCount} master's projects. Filter by category
          or technology.
        </p>

        <div className="mt-8">
          <ProjectFilters
            query={query}
            onQuery={setQuery}
            tags={tags}
            activeTag={tag}
            onTag={setTag}
            category={category}
            onCategory={setCategory}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted">No projects match that filter.</p>
        )}
      </div>
    </div>
  );
}
