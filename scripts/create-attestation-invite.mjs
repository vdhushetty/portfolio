import crypto from "node:crypto";
import { loadLocalEnv } from "../server/load-env.mjs";

loadLocalEnv();
const { cleanEmail, createInviteToken, privateEmailHash } = await import(
  "../server/security.mjs"
);
const { mutateState } = await import("../server/storage.mjs");

function argument(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

const email = argument("--email") ? cleanEmail(argument("--email")) : "";
const requestedDays = Number(argument("--days") || 14);
const days = Math.min(30, Math.max(1, requestedDays));
const id = crypto.randomUUID();
const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;
const emailHash = email ? privateEmailHash(email) : null;
const token = createInviteToken({ id, exp: expiresAt, emailHash });

await mutateState((state) => {
  state.attestationInvites[id] = {
    id,
    emailHash,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(expiresAt).toISOString(),
    usedAt: null,
    revokedAt: null,
  };
});

const site = (process.env.PUBLIC_SITE_URL || "http://127.0.0.1:5173").replace(
  /\/$/,
  ""
);
console.log("Invitation created. Share this private URL with the intended author:");
console.log(site + "/recommend/" + token);
console.log("Expires: " + new Date(expiresAt).toISOString());
