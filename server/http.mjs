import crypto from "node:crypto";

export class HttpError extends Error {
  constructor(status, code, message, details = undefined) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function sendJson(res, status, payload, headers = {}) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  res.end(JSON.stringify(payload));
}

export function sendError(res, error) {
  const status = error instanceof HttpError ? error.status : 500;
  const code = error instanceof HttpError ? error.code : "INTERNAL_ERROR";
  const message =
    error instanceof HttpError
      ? error.message
      : "The service could not complete the request.";
  const headers =
    error instanceof HttpError && error.details?.retryAfter
      ? { "Retry-After": String(error.details.retryAfter) }
      : {};
  sendJson(res, status, { error: { code, message } }, headers);
}

export async function readJson(req, maxBytes = 24_000) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBytes) {
      throw new HttpError(413, "PAYLOAD_TOO_LARGE", "The request is too large.");
    }
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks);
  req.rawBody = raw;
  if (!raw.length) return {};
  try {
    return JSON.parse(raw.toString("utf8"));
  } catch {
    throw new HttpError(400, "INVALID_JSON", "The request body must be valid JSON.");
  }
}

export function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [
          decodeURIComponent(index >= 0 ? part.slice(0, index) : part),
          decodeURIComponent(index >= 0 ? part.slice(index + 1) : ""),
        ];
      })
  );
}

export function appendCookie(res, cookie) {
  const existing = res.getHeader("Set-Cookie");
  const next = existing
    ? [...(Array.isArray(existing) ? existing : [existing]), cookie]
    : [cookie];
  res.setHeader("Set-Cookie", next);
}

export function hashValue(value, purpose = "portfolio") {
  const salt =
    process.env.RATE_LIMIT_SALT ||
    process.env.ATTESTATION_SIGNING_SECRET ||
    "local-development-only";
  return crypto
    .createHash("sha256")
    .update(purpose + ":" + salt + ":" + value)
    .digest("hex");
}

export function requestFingerprint(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  const ip =
    forwarded ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown";
  const agent = String(req.headers["user-agent"] || "unknown").slice(0, 240);
  return hashValue(ip + "|" + agent, "rate-limit");
}

export function ensureVisitor(req, res) {
  const cookies = parseCookies(req);
  let visitorId = cookies.portfolio_vid;
  if (!/^[a-f0-9-]{36}$/i.test(visitorId || "")) {
    visitorId = crypto.randomUUID();
    const secure = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
    appendCookie(
      res,
      "portfolio_vid=" +
        encodeURIComponent(visitorId) +
        "; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000" +
        (secure ? "; Secure" : "")
    );
  }
  return {
    id: visitorId,
    hash: hashValue(visitorId, "visitor"),
    fingerprint: requestFingerprint(req),
  };
}

export function assertMethod(req, methods) {
  if (!methods.includes(req.method)) {
    throw new HttpError(405, "METHOD_NOT_ALLOWED", "This method is not allowed.");
  }
}

export function isLikelyBot(req) {
  const agent = String(req.headers["user-agent"] || "");
  return /bot|crawler|spider|preview|headless|lighthouse/i.test(agent);
}
