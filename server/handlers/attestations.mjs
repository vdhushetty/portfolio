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
    linkedInAttestationUrl: item.linkedInAttestationUrl || null,
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
          "Open submissions, published only with author consent and manual identity and relationship review.",
      });
      return;
    }

    const visitor = ensureVisitor(req, res);
    await enforceRateLimits(visitor.fingerprint, [
      {
        scope: "attestation-day",
        limit: 2,
        windowMs: 24 * 60 * 60 * 1000,
        message: "Too many recommendation submissions were attempted today.",
      },
    ]);
    await enforceRateLimits("global", [
      {
        scope: "attestation-global-day",
        limit: Number(process.env.ATTESTATION_GLOBAL_DAILY_LIMIT || 50),
        windowMs: 24 * 60 * 60 * 1000,
        message: "Recommendation submissions are temporarily at capacity.",
      },
    ]);
    const body = await readJson(req, 18_000);
    if (body.website) {
      throw new HttpError(400, "VALIDATION_ERROR", "The submission could not be accepted.");
    }
    const invite = body.token ? verifyInviteToken(body.token) : null;
    const email = cleanEmail(body.workEmail);
    const emailHash = privateEmailHash(email);
    if (invite?.emailHash && invite.emailHash !== emailHash) {
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
      inviteId: invite?.id || null,
      submissionChannel: invite ? "invitation" : "public",
      name: cleanText(body.name, { min: 2, max: 100, field: "Name" }),
      role: cleanText(body.role, { min: 2, max: 120, field: "Role" }),
      company: cleanText(body.company, { min: 2, max: 120, field: "Company" }),
      relationship: cleanText(body.relationship, {
        min: 5,
        max: 240,
        field: "Working relationship",
      }),
      linkedInUrl: cleanLinkedIn(body.linkedInUrl),
      linkedInAttestationUrl: body.linkedInAttestationUrl
        ? cleanLinkedIn(body.linkedInAttestationUrl)
        : null,
      workEmailHash: emailHash,
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
      const duplicate = state.attestations.find(
        (entry) =>
          entry.workEmailHash === emailHash &&
          ["pending_review", "approved"].includes(entry.status)
      );
      if (duplicate) {
        throw new HttpError(
          409,
          "ALREADY_SUBMITTED",
          "A recommendation from this email is already pending or published."
        );
      }
      if (invite) {
        const storedInvite = state.attestationInvites[invite.id];
        if (!storedInvite || storedInvite.revokedAt || storedInvite.usedAt) {
          throw new HttpError(409, "INVITE_ALREADY_USED", "This invitation is no longer available.");
        }
        storedInvite.usedAt = now;
        storedInvite.attestationId = attestation.id;
      }
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
