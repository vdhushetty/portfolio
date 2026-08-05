/** Inlined project cover SVGs (data URIs) — deploy-safe without public blobs. */
import { COVER_SVG_P1 } from "./cover-svg-p1";
import { COVER_SVG_P2 } from "./cover-svg-p2";

const COVER_SVG: Record<string, string> = { ...COVER_SVG_P1, ...COVER_SVG_P2 };

export function coverUri(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  const file = path.split("/").pop() ?? path;
  const svg = COVER_SVG[file];
  if (!svg) return path;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
