import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envFile = path.join(root, "Port-folio", ".env.local");
const secretNames = [
  "RATE_LIMIT_SALT",
  "ATTESTATION_SIGNING_SECRET",
  "ADMIN_API_TOKEN",
];

let source = "";
try {
  source = await fs.readFile(envFile, "utf8");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const lines = source ? source.split(/\r?\n/) : [];
const generated = [];
for (const name of secretNames) {
  const index = lines.findIndex((line) => line.startsWith(name + "="));
  const current = index >= 0 ? lines[index].slice(name.length + 1).trim() : "";
  if (current) continue;
  const value = crypto.randomBytes(32).toString("base64url");
  if (index >= 0) lines[index] = name + "=" + value;
  else lines.push(name + "=" + value);
  generated.push(name);
}

await fs.mkdir(path.dirname(envFile), { recursive: true });
await fs.writeFile(envFile, lines.join("\n").replace(/\n*$/, "\n"), "utf8");
console.log(
  generated.length
    ? "Created local secrets without printing their values: " + generated.join(", ")
    : "Local security secrets are already configured."
);
