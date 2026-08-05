/**
 * Multiplayer is intentionally a no-op on the portfolio deploy target
 * (single-player / static site). Keep the export so imports resolve.
 */
export function multiplayerDisabled() {
  return true;
}
