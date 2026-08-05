#!/usr/bin/env node
/**
 * On Vercel, binary photos may still live under Port-folio/public from the
 * previous site. Copy any missing files into public/ before the Vite build.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";

const legacyRoot = "Port-folio/public";
const destRoot = "public";

function walk(dir, base = dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, base, out);
    else out.push(full.slice(base.length + 1));
  }
  return out;
}

if (!existsSync(legacyRoot)) {
  console.log("[copy-legacy-assets] no Port-folio/public — skip");
  process.exit(0);
}

let n = 0;
for (const rel of walk(legacyRoot)) {
  const dest = join(destRoot, rel);
  if (existsSync(dest)) continue;
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(join(legacyRoot, rel), dest);
  n++;
}
console.log(`[copy-legacy-assets] copied ${n} missing asset(s) from Port-folio/public`);
