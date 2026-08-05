/** Resolve project cover image path (files live under public/). */
export function coverUri(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  return path;
}
