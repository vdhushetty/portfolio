import type { Project, ProjectCategory } from "./projects-a";
import { professionalProjects } from "./projects-a";
import { academicProjects } from "./projects-b";

export type { Metric, ProjectStep, ProjectCategory, Project } from "./projects-a";
export const projects: Project[] = [...professionalProjects, ...academicProjects];
export function getProject(id: string) { return projects.find((p) => p.id === id); }
export function allTechTags() {
  const set = new Set<string>();
  for (const p of projects) for (const t of p.tech) set.add(t);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
export function projectsByCategory(category: ProjectCategory | "all") {
  if (category === "all") return projects;
  return projects.filter((p) => p.category === category);
}
