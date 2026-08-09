import crypto from "node:crypto";
import {
  assertMethod,
  ensureVisitor,
  HttpError,
  readJson,
  sendError,
  sendJson,
} from "../http.mjs";
import { buildProfileContext } from "../profile.mjs";
import { cleanText, enforceRateLimits } from "../security.mjs";
import { mutateState, readState, StorageConfigurationError } from "../storage.mjs";
import { generateProfileAnswer, moderateText } from "../openai.mjs";

export async function assistantHandler(req, res) {
  try {
    assertMethod(req, ["POST"]);
    const visitor = ensureVisitor(req, res);
    const body = await readJson(req, 12_000);
    const question = cleanText(body.question, {
      min: 2,
      max: 600,
      field: "Question",
    });

    const limit = await enforceRateLimits(visitor.fingerprint, [
      {
        scope: "assistant-10m",
        limit: 6,
        windowMs: 10 * 60 * 1000,
        message: "You have used the six-question allowance. Try again in a few minutes.",
      },
      {
        scope: "assistant-day",
        limit: 20,
        windowMs: 24 * 60 * 60 * 1000,
        message: "You have reached today's assistant limit. Please return tomorrow or message Venkat.",
      },
    ]);
    await enforceRateLimits("global", [
      {
        scope: "assistant-global-day",
        limit: Number(process.env.AI_GLOBAL_DAILY_LIMIT || 250),
        windowMs: 24 * 60 * 60 * 1000,
        message: "The assistant has reached its daily capacity. Please message Venkat directly.",
      },
    ]);
    await moderateText(question);

    const state = await readState();
    let conversationId = String(body.conversationId || "");
    let conversation = state.aiConversations[conversationId];
    if (!conversation || conversation.visitorHash !== visitor.hash) {
      conversationId = crypto.randomUUID();
      conversation = { id: conversationId, visitorHash: visitor.hash, messages: [] };
    }
    const history = (conversation.messages || [])
      .slice(-6)
      .map((message) => message.role.toUpperCase() + ": " + message.text)
      .join("\n");
    const grounded = buildProfileContext(question);
    const result = await generateProfileAnswer({
      question,
      context: { profile: grounded.profile, projectFacts: grounded.projectFacts },
      history,
      safetyIdentifier: visitor.fingerprint,
    });

    const now = new Date().toISOString();
    await mutateState((next) => {
      const current =
        next.aiConversations[conversationId] ||
        { id: conversationId, visitorHash: visitor.hash, messages: [] };
      current.messages = [
        ...(current.messages || []),
        { role: "user", text: question, createdAt: now },
        { role: "assistant", text: result.answer, evidence: result.evidence, createdAt: now },
      ].slice(-12);
      current.updatedAt = now;
      next.aiConversations[conversationId] = current;

      const owned = Object.values(next.aiConversations)
        .filter((item) => item.visitorHash === visitor.hash)
        .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
      for (const stale of owned.slice(8)) delete next.aiConversations[stale.id];
    });

    const sources =
      result.evidence === "direct"
        ? grounded.sources
        : result.evidence === "adjacent"
          ? [{ id: "capabilities", title: "Published capabilities", url: "/#skills", evidence: "Profile-listed knowledge" }]
          : [];
    sendJson(res, 200, {
      conversationId,
      answer: result.answer,
      evidence: result.evidence,
      sources,
      rateLimit: limit,
      disclosure: "AI-generated from Venkat's published portfolio.",
    });
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(
        res,
        new HttpError(503, "STORAGE_NOT_CONFIGURED", "The assistant is unavailable until durable storage is configured.")
      );
      return;
    }
    sendError(res, error);
  }
}
