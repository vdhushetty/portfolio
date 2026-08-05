import { COVER_URIS_P1 } from "@/data/cover-uris-p1";
import { COVER_URIS_P2 } from "@/data/cover-uris-p2";

/** Inlined project covers (data URIs) so deploys never depend on public/ blobs. */
const COVER_URIS: Record<string, string> = {
  ...COVER_URIS_P1,
  ...COVER_URIS_P2,
};

function basename(path: string): string {
  const cleaned = path.split("?")[0]?.split("#")[0] ?? path;
  const parts = cleaned.split("/");
  return parts[parts.length - 1] || cleaned;
}

/** Resolve project cover path to a data URI (or pass-through absolute/data URLs). */
export function coverUri(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("data:") || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const key = basename(path);
  return COVER_URIS[key] ?? path;
}
