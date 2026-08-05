/** Inlined project cover SVGs (data URIs) — deploy-safe without public blobs. */
import { COVER_URIS_P1 } from "./cover-uris-p1";
import { COVER_URIS_P2 } from "./cover-uris-p2";

export const COVER_URIS: Record<string, string> = {
  ...COVER_URIS_P1,
  ...COVER_URIS_P2,
};

export function coverUri(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  const file = path.split("/").pop() ?? path;
  return COVER_URIS[file] ?? path;
}
