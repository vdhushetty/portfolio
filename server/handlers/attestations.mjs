import crypto from "node:crypto";
import {
  assertMethod,
  ensureVisitor,
  HttpError,
  readJson,
  sendError,
  sendJson,
} from "../http.mjs";
import {
  cleanEmail,
  cleanLinkedIn,
  cleanText,
  enforceRateLimits,
  privateEmailHash,
  verifyInviteToken,
} from "../security.mjs";
import { mutateState, readState, StorageConfigurationError } from "../storage.mjs";

function publicAttestation(item) {
  return {
    id: item.id,
    name: item.name,
    role: item.role,
    company: item.company,
    relationship: item.relationship,
    linkedInUrl: item.linkedInUrl,
    quote: item.quote,
    submittedAt: item.submittedAt,
    verifiedAt: item.verifiedAt,
    verificationMethod: item.verificationMethod,
    consentConfirmed: true,
  };
}

export async function attestationsHandler(req, res) {
  try {
    assertMethod(req, ["GET", "POST"]);
    if (req.method === "GET") {
      const state = await readState();
      const items = state.attestations
        .filter((item) => item.status === "approved")
        .sort((a, b) => String(b.verifiedAt).localeCompare(String(a.verifiedAt)))
        .map(publicAttestation);
      sendJson(res, 200, {
        items,
        policy:
          "Published by invitation, with author consent and a reviewed professional identity.",
      });
      return;
    }

    const visitor = ensureVisitor(req, res);
    await enforceRateLimits(visitor.fingerprint, [
      {
        scope: "attestation-day",
        limit: 3,
        windowMs: 24 * 60 * 60 * 1000,
        message: "Too many recommendation submissions were attempted today.",
      },
    ]);
    const body = await readJson(req, 18_000);
    const invite = verifyInviteToken(body.token);
    const email = cleanEmail(body.workEmail);
    if (invite.emailHash && invite.emailHash !== privateEmailHash(email)) {
      throw new HttpError(
        400,
        "INVITE_EMAIL_MISMATCH",
        "Use the work email associated with this invitation."
      );
    }
    if (body.consent !== true) {
      throw new HttpError(
        400,
        "CONSENT_REQUIRED",
        "Publishing consent is required before submitting a recommendation."
      );
    }

    const now = new Date().toISOString();
    const attestation = {
      id: crypto.randomUUID(),
      inviteId: invite.id,
      name: cleanText(body.name, { min: 2, max: 100, field: "Name" }),
      role: cleanText(body.role, { min: 2, max: 120, field: "Role" }),
      company: cleanText(body.company, { min: 2, max: 120, field: "Company" }),
      relationship: cleanText(body.relationship, {
        min: 5,
        max: 240,
        field: "Working relationship",
      }),
      linkedInUrl: cleanLinkedIn(body.linkedInUrl),
      workEmailHash: privateEmailHash(email),
      privateWorkEmail: email,
      quote: cleanText(body.quote, {
        min: 60,
        max: 900,
        field: "Recommendation",
      }),
      status: "pending_review",
      verificationMethod: null,
      submittedAt: now,
      consentAt: now,
      verifiedAt: null,
    };

    await mutateState((state) => {
      const storedInvite = state.attestationInvites[invite.id];
      if (!storedInvite || storedInvite.revokedAt || storedInvite.usedAt) {
        throw new HttpError(409, "INVITE_ALREADY_USED", "This invitation is no longer available.");
      }
      storedInvite.usedAt = now;
      storedInvite.attestationId = attestation.id;
      state.attestations.push(attestation);
    });
    sendJson(res, 201, {
      id: attestation.id,
      status: "pending_review",
      message: "Thank you. The recommendation will be published only after identity review.",
    });
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(res, new HttpError(503, "STORAGE_NOT_CONFIGURED", "Recommendations are not configured."));
      return;
    }
    sendError(res, error);
  }
}
