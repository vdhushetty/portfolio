import crypto from "node:crypto";
import {
  assertMethod,
  HttpError,
  readJson,
  sendError,
  sendJson,
} from "../http.mjs";
import {
  cleanEmail,
  cleanText,
  createInviteToken,
  privateEmailHash,
  requireAdmin,
} from "../security.mjs";
import { mutateState, StorageConfigurationError } from "../storage.mjs";

const verificationMethods = new Set([
  "LinkedIn identity reviewed",
  "Work email and relationship confirmed",
  "Published LinkedIn recommendation",
]);

export async function attestationAdminHandler(req, res) {
  try {
    assertMethod(req, ["POST"]);
    requireAdmin(req);
    const body = await readJson(req, 12_000);
    if (body.action === "create_invite") {
      const id = crypto.randomUUID();
      const email = body.email ? cleanEmail(body.email) : "";
      const days = Math.min(30, Math.max(1, Number(body.validDays || 14)));
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
      const site = (process.env.PUBLIC_SITE_URL || "http://127.0.0.1:5173").replace(/\/$/, "");
      sendJson(res, 201, {
        id,
        inviteUrl: site + "/recommend/" + token,
        expiresAt: new Date(expiresAt).toISOString(),
      });
      return;
    }

    const id = cleanText(body.id, { min: 10, max: 80, field: "Recommendation ID" });
    const action = body.action === "reject" ? "reject" : "approve";
    const method = cleanText(body.verificationMethod, {
      min: action === "approve" ? 5 : 0,
      max: 100,
      field: "Verification method",
    });
    if (action === "approve" && !verificationMethods.has(method)) {
      throw new HttpError(400, "INVALID_VERIFICATION_METHOD", "Choose an approved verification method.");
    }
    const result = await mutateState((state) => {
      const item = state.attestations.find((entry) => entry.id === id);
      if (!item) throw new HttpError(404, "NOT_FOUND", "Recommendation not found.");
      item.status = action === "approve" ? "approved" : "rejected";
      item.verificationMethod = action === "approve" ? method : null;
      item.verifiedAt = action === "approve" ? new Date().toISOString() : null;
      item.reviewNote = body.reviewNote
        ? cleanText(body.reviewNote, { min: 0, max: 500, field: "Review note" })
        : "";
      return { id: item.id, status: item.status };
    });
    sendJson(res, 200, result);
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(res, new HttpError(503, "STORAGE_NOT_CONFIGURED", "Recommendations are not configured."));
      return;
    }
    sendError(res, error);
  }
}
