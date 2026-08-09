import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test, { after } from "node:test";
import nacl from "tweetnacl";

const testDataDirectory = await fs.mkdtemp(
  path.join(os.tmpdir(), "portfolio-platform-test-")
);
process.env.PORTFOLIO_DATA_DIR = testDataDirectory;
process.env.ATTESTATION_SIGNING_SECRET = "test-only-attestation-secret";

const { projects, getProjectById } = await import(
  "../Port-folio/src/pages/projectsCatalog.js"
);
const { buildProfileContext } = await import("../server/profile.mjs");
const { verifyDiscordRequest } = await import("../server/discord.mjs");
const {
  cleanLinkedIn,
  createInviteToken,
  enforceRateLimits,
  privateEmailHash,
  verifyInviteToken,
} = await import("../server/security.mjs");

after(async () => {
  await fs.rm(testDataDirectory, { recursive: true, force: true });
});

test("the merged catalog represents every remote-main project", () => {
  const remoteProjectIds = [
    "unity-catalog-governance",
    "event-hub-delta-streaming",
    "fabric-dataflow-incremental",
    "ml-ops-batch-realtime",
    "c2s-agritech-warehouse",
    "truck-platooning-aero-thermal",
    "stock-market-ml-prediction",
    "robot-nav-deep-rl",
    "autonomous-drone",
    "heart-disease-ml",
    "ml-eda-timing-pba",
    "robotic-arm-kinematics",
    "synapse-to-databricks-migration",
    "d365-byod-recovery",
    "lindsay-medallion-sales",
    "databricks-disaster-recovery",
    "d365-data-retention",
  ];

  assert.equal(projects.length, 23);
  assert.deepEqual(
    remoteProjectIds.filter((id) => !getProjectById(id)),
    []
  );
});

test("grounding returns portfolio evidence for a documented capability", () => {
  const context = buildProfileContext("Databricks disaster recovery architecture");
  assert.ok(context.projectFacts.length > 0);
  assert.ok(
    context.projectFacts.some(
      (project) => project.id === "databricks-disaster-recovery"
    )
  );
  assert.ok(context.sources.every((source) => source.url.startsWith("/project/")));
});

test("recommendation invitations are signed, expiring, and tamper-evident", () => {
  const payload = { id: "invite-test", exp: Date.now() + 60_000 };
  const token = createInviteToken(payload);
  assert.deepEqual(verifyInviteToken(token), payload);
  assert.throws(() => verifyInviteToken(token + "tampered"), {
    status: 400,
    code: "INVALID_INVITE",
  });
  assert.notEqual(
    privateEmailHash("person@example.com"),
    "person@example.com"
  );
});

test("public recommendation identity links must be secure LinkedIn URLs", () => {
  assert.equal(
    cleanLinkedIn("https://www.linkedin.com/in/example-person"),
    "https://www.linkedin.com/in/example-person"
  );
  assert.throws(() => cleanLinkedIn("http://www.linkedin.com/in/example-person"), {
    status: 400,
    code: "VALIDATION_ERROR",
  });
  assert.throws(() => cleanLinkedIn("https://example.com/in/example-person"), {
    status: 400,
    code: "VALIDATION_ERROR",
  });
});

test("rate limiting rejects requests beyond the configured allowance", async () => {
  const rules = [{ scope: "test-minute", limit: 2, windowMs: 60_000 }];
  await enforceRateLimits("visitor-test", rules);
  const remaining = await enforceRateLimits("visitor-test", rules);
  assert.equal(remaining.remaining, 0);
  await assert.rejects(() => enforceRateLimits("visitor-test", rules), {
    status: 429,
    code: "RATE_LIMITED",
  });
});

test("Discord replies require a valid, recent Ed25519 signature", () => {
  const keyPair = nacl.sign.keyPair();
  process.env.DISCORD_PUBLIC_KEY = Buffer.from(keyPair.publicKey).toString("hex");
  const rawBody = Buffer.from('{"type":1}');
  const timestamp = String(Math.floor(Date.now() / 1_000));
  const signature = Buffer.from(
    nacl.sign.detached(
      Buffer.from(timestamp + rawBody.toString("utf8")),
      keyPair.secretKey
    )
  ).toString("hex");
  const request = {
    headers: {
      "x-signature-ed25519": signature,
      "x-signature-timestamp": timestamp,
    },
  };
  assert.doesNotThrow(() => verifyDiscordRequest(request, rawBody));

  const staleTimestamp = String(Math.floor(Date.now() / 1_000) - 600);
  const staleSignature = Buffer.from(
    nacl.sign.detached(
      Buffer.from(staleTimestamp + rawBody.toString("utf8")),
      keyPair.secretKey
    )
  ).toString("hex");
  assert.throws(
    () =>
      verifyDiscordRequest(
        {
          headers: {
            "x-signature-ed25519": staleSignature,
            "x-signature-timestamp": staleTimestamp,
          },
        },
        rawBody
      ),
    { status: 401, code: "STALE_DISCORD_SIGNATURE" }
  );
});
