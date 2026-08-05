/** Skill icons as data URIs (built at runtime from raw SVG). */
import { SKILL_SVG_P1 } from "./skill-svg-p1";
import { SKILL_SVG_P2 } from "./skill-svg-p2";

const SKILL_SVG: Record<string, string> = { ...SKILL_SVG_P1, ...SKILL_SVG_P2 };

export function skillIconUri(path: string | undefined | null): string {
  if (!path) return "";
  const file = path.split("/").pop() ?? path;
  const svg = SKILL_SVG[file];
  if (!svg) return path;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
