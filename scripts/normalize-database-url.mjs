import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(root, "Port-folio", ".env.local");
const source = await fs.readFile(envFile, "utf8");
const lines = source.split(/\r?\n/);
const index = lines.findIndex((line) => line.startsWith("DATABASE_URL="));
if (index < 0) throw new Error("DATABASE_URL is missing from Port-folio/.env.local.");

const value = lines[index].slice("DATABASE_URL=".length).trim();
const scheme = value.match(/^postgres(?:ql)?:\/\//i)?.[0];
if (!scheme) throw new Error("DATABASE_URL must start with postgres:// or postgresql://.");

const lastAt = value.lastIndexOf("@");
const firstColon = value.indexOf(":", scheme.length);
if (firstColon < scheme.length || lastAt <= firstColon) {
  throw new Error("DATABASE_URL must contain a username, password, and host.");
}

const rawPassword = value.slice(firstColon + 1, lastAt);
let decodedPassword = rawPassword;
try {
  decodedPassword = decodeURIComponent(rawPassword);
} catch {
  // A raw percent sign is treated as part of the password and encoded below.
}
const encodedPassword = encodeURIComponent(decodedPassword);
const normalized =
  value.slice(0, firstColon + 1) + encodedPassword + value.slice(lastAt);

new URL(normalized);
lines[index] = "DATABASE_URL=" + normalized;
await fs.writeFile(envFile, lines.join("\n"), "utf8");
console.log(
  normalized === value
    ? "DATABASE_URL is already URL-safe."
    : "DATABASE_URL password encoded safely without printing its value."
);
