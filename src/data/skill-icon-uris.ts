import { SKILL_ICON_URIS_P1 } from "@/data/skill-icon-uris-p1";
import { SKILL_ICON_URIS_P2 } from "@/data/skill-icon-uris-p2";

/** Inlined skill icons (data URIs) so deploys never depend on public/ blobs. */
const SKILL_ICON_URIS: Record<string, string> = {
  ...SKILL_ICON_URIS_P1,
  ...SKILL_ICON_URIS_P2,
};

function basename(path: string): string {
  const cleaned = path.split("?")[0]?.split("#")[0] ?? path;
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || cleaned;
}

/** Resolve skill icon path to a data URI (or pass-through absolute/data URLs). */
export function skillIconUri(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const key = basename(path);
  return SKILL_ICON_URIS[key] ?? path;
}
