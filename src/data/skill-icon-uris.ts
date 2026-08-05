/** Inlined skill icon SVGs (data URIs) — deploy-safe without public blobs. */
import { SKILL_ICON_URIS_P1 } from "./skill-icon-uris-p1";
import { SKILL_ICON_URIS_P2 } from "./skill-icon-uris-p2";

export const SKILL_ICON_URIS: Record<string, string> = {
  ...SKILL_ICON_URIS_P1,
  ...SKILL_ICON_URIS_P2,
};

export function skillIconUri(path: string | undefined | null): string {
  if (!path) return "";
  const file = path.split("/").pop() ?? path;
  return SKILL_ICON_URIS[file] ?? path;
}
