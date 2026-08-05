import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Activity, GraduationCap } from "lucide-react";
import type { Project } from "@/data/projects";
import { coverUri } from "@/data/cover-uris";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const Icon = project.category === "academic" ? GraduationCap : Activity;
  const cover = coverUri(project.coverImage);
  return (
    <Link
      to="/projects/$id"
      params={{ id: project.id }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface no-underline transition-all duration-200",
        "hover:border-primary/40 hover:bg-surface-2",
        className,
      )}
    >
      {cover ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-bg">
          <img
            src={cover}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute left-3 top-3">
            <Badge className="bg-bg/90 text-[10px] uppercase tracking-wide backdrop-blur-sm">
              {project.category === "academic" ? "Academic" : "Professional"}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3 p-5 pb-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <Badge className="text-[10px] uppercase tracking-wide">
            {project.category === "academic" ? "Academic" : "Professional"}
          </Badge>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-snug text-fg group-hover:text-primary">
            {project.title}
          </h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-subtle transition-colors group-hover:text-primary" />
        </div>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {project.brief ?? project.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="font-mono text-sm font-semibold tabular-nums text-primary">
            {project.impactHighlight}
          </span>
          <span className="text-xs text-subtle">{project.duration}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
