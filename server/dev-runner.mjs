import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = spawn(process.execPath, [path.join(root, "server", "dev-api.mjs")], {
  cwd: root,
  stdio: "inherit",
});
const viteCommand = process.platform === "win32"
  ? process.env.ComSpec || "cmd.exe"
  : "npm";
const viteArgs = process.platform === "win32"
  ? ["/d", "/s", "/c", "npm.cmd run dev:vite"]
  : ["run", "dev:vite"];
const vite = spawn(viteCommand, viteArgs, {
  cwd: path.join(root, "Port-folio"),
  stdio: "inherit",
  env: { ...process.env, API_PORT: process.env.API_PORT || "8787" },
});

let closing = false;
function close(code = 0) {
  if (closing) return;
  closing = true;
  api.kill();
  vite.kill();
  process.exitCode = code;
}

api.on("exit", (code) => {
  if (!closing) close(code || 1);
});
vite.on("exit", (code) => {
  if (!closing) close(code || 1);
});
process.on("SIGINT", () => close(0));
process.on("SIGTERM", () => close(0));
