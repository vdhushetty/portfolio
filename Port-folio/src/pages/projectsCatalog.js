import { projectsData, domains } from "./projectsData.js";
import { extras } from "./projectsExtras.js";
import { refArchSpecs } from "./refArchSpecs.js";
import { mainProjectAliases, mainProjects } from "./mainProjects.js";

/* Merged catalog: base entries enriched with card arch strips,
   reference-architecture specs, and per-project detail. */
const localProjects = projectsData.map((p) => ({
  ...p,
  ...extras[p.id],
  refarch: refArchSpecs[p.id],
  aliases: Object.entries(mainProjectAliases)
    .filter(([, canonicalId]) => canonicalId === p.id)
    .map(([alias]) => alias),
  evidence: extras[p.id]?.evidence || {
    label: p.domain === "ai" ? "Portfolio project" : "Professional case study",
    source: "Portfolio case-study catalog",
    detail: "Project scope and outcomes are self-reported and have not been independently audited.",
  },
}));

export const projects = [...localProjects, ...mainProjects];

export const getProjectById = (id) => {
  const canonicalId = mainProjectAliases[id] || id;
  return projects.find((project) => project.id === canonicalId);
};
export { domains };
