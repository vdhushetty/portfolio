import crypto from "node:crypto";
import { HttpError, hashValue } from "./http.mjs";
import { mutateState } from "./storage.mjs";

export function cleanText(value, { min = 0, max = 2_000, field = "Text" } = {}) {
  const text = String(value || "")
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
  if (text.length < min) {
    throw new HttpError(400, "VALIDATION_ERROR", field + " is required.");
  }
  if (text.length > max) {
    throw new HttpError(
      400,
      "VALIDATION_ERROR",
      field + " must be " + max + " characters or fewer."
    );
  }
  return text;
}

export function cleanEmail(value, { required = true } = {}) {
  const email = cleanText(value, {
    min: required ? 3 : 0,
    max: 254,
    field: "Email",
  }).toLowerCase();
  if (!email && !required) return "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, "VALIDATION_ERROR", "Enter a valid email address.");
  }
  return email;
}

export function cleanLinkedIn(value) {
  const input = cleanText(value, { min: 8, max: 300, field: "LinkedIn URL" });
  let url;
  try {
    url = new URL(input);
  } catch {
    throw new HttpError(400, "VALIDATION_ERROR", "Enter a valid LinkedIn URL.");
  }
  if (url.protocol !== "https:" || !/(^|\.)linkedin\.com$/i.test(url.hostname)) {
    throw new HttpError(400, "VALIDATION_ERROR", "Use a linkedin.com profile URL.");
  }
  return url.toString();
}

export async function enforceRateLimits(key, rules) {
  const now = Date.now();
  return mutateState((state) => {
    let tightest = null;
    for (const rule of rules) {
      const rateKey = rule.scope + ":" + key;
      let bucket = state.rateLimits[rateKey];
      if (!bucket || now - bucket.startedAt >= rule.windowMs) {
        bucket = { startedAt: now, count: 0 };
      }
      if (bucket.count >= rule.limit) {
        const retryAfter = Math.max(
          1,
          Math.ceil((rule.windowMs - (now - bucket.startedAt)) / 1000)
        );
        throw new HttpError(
          429,
          "RATE_LIMITED",
          rule.message || "You have reached the usage limit. Please try again later.",
          { retryAfter }
        );
      }
      bucket.count += 1;
      state.rateLimits[rateKey] = bucket;
      const remaining = Math.max(0, rule.limit - bucket.count);
      if (!tightest || remaining < tightest.remaining) {
        tightest = {
          scope: rule.scope,
          remaining,
          resetAt: new Date(bucket.startedAt + rule.windowMs).toISOString(),
        };
      }
    }

    const expiry = now - 8 * 24 * 60 * 60 * 1000;
    for (const [rateKey, bucket] of Object.entries(state.rateLimits)) {
      if (bucket.startedAt < expiry) delete state.rateLimits[rateKey];
    }
    return tightest;
  });
}

function signingSecret() {
  const secret = process.env.ATTESTATION_SIGNING_SECRET;
  if (!secret && (process.env.VERCEL === "1" || process.env.NODE_ENV === "production")) {
    throw new HttpError(
      503,
      "ATTESTATION_NOT_CONFIGURED",
      "Recommendation invitations are not configured."
    );
  }
  return secret || "local-attestation-development-secret";
}

function signature(input) {
  return crypto
    .createHmac("sha256", signingSecret())
    .update(input)
    .digest("base64url");
}

export function createInviteToken(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return encoded + "." + signature(encoded);
}

export function verifyInviteToken(token) {
  const [encoded, provided] = String(token || "").split(".");
  if (!encoded || !provided) {
    throw new HttpError(400, "INVALID_INVITE", "This recommendation invitation is invalid.");
  }
  const expected = signature(encoded);
  const valid =
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!valid) {
    throw new HttpError(400, "INVALID_INVITE", "This recommendation invitation is invalid.");
  }
  let payload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    throw new HttpError(400, "INVALID_INVITE", "This recommendation invitation is invalid.");
  }
  if (!payload.id || !payload.exp || Date.now() > payload.exp) {
    throw new HttpError(410, "INVITE_EXPIRED", "This recommendation invitation has expired.");
  }
  return payload;
}

export function requireAdmin(req) {
  const expected = process.env.ADMIN_API_TOKEN;
  const provided = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!expected || !provided) {
    throw new HttpError(401, "UNAUTHORIZED", "Administrator authorization is required.");
  }
  const valid =
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
  if (!valid) {
    throw new HttpError(401, "UNAUTHORIZED", "Administrator authorization is required.");
  }
}

export function privateEmailHash(email) {
  return hashValue(email.toLowerCase(), "attestation-email");
}
