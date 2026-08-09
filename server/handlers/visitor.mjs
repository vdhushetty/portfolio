import {
  assertMethod,
  ensureVisitor,
  HttpError,
  isLikelyBot,
  readJson,
  sendError,
  sendJson,
} from "../http.mjs";
import { cleanText, enforceRateLimits } from "../security.mjs";
import { mutateState, readState, StorageConfigurationError, storageMode } from "../storage.mjs";

const allowedEvents = new Set([
  "page_view",
  "project_open",
  "resume_download",
  "contact_start",
  "assistant_start",
]);

function summary(state) {
  const entries = Object.values(state.visitors);
  const first = entries
    .map((entry) => entry.firstSeen)
    .filter(Boolean)
    .sort()[0];
  return {
    uniqueVisitors: entries.length,
    since: first || null,
    methodology: "Approximate unique browsers; bots and repeat refreshes are excluded.",
  };
}

export async function visitorHandler(req, res) {
  try {
    assertMethod(req, ["GET", "POST"]);
    if (req.method === "GET") {
      const state = await readState();
      sendJson(res, 200, { ...summary(state), storage: storageMode() });
      return;
    }

    const visitor = ensureVisitor(req, res);
    if (isLikelyBot(req)) {
      const state = await readState();
      sendJson(res, 200, { ...summary(state), counted: false });
      return;
    }
    await enforceRateLimits(visitor.fingerprint, [
      { scope: "analytics-minute", limit: 30, windowMs: 60 * 1000 },
    ]);
    const body = await readJson(req, 4_000);
    const event = cleanText(body.event || "page_view", {
      min: 3,
      max: 40,
      field: "Event",
    });
    if (!allowedEvents.has(event)) {
      throw new HttpError(400, "INVALID_EVENT", "That analytics event is not supported.");
    }
    const now = new Date().toISOString();
    const day = now.slice(0, 10);
    const result = await mutateState((state) => {
      const current = state.visitors[visitor.hash];
      state.visitors[visitor.hash] = {
        firstSeen: current?.firstSeen || now,
        lastSeen: now,
        views: (current?.views || 0) + (event === "page_view" ? 1 : 0),
      };
      const key = day + ":" + event;
      state.analytics[key] = (state.analytics[key] || 0) + 1;
      return summary(state);
    });
    sendJson(res, 200, { ...result, counted: true });
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(res, new HttpError(503, "STORAGE_NOT_CONFIGURED", "Visitor analytics are not configured."));
      return;
    }
    sendError(res, error);
  }
}
