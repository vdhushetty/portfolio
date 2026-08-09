import crypto from "node:crypto";
import {
  assertMethod,
  ensureVisitor,
  HttpError,
  readJson,
  sendError,
  sendJson,
} from "../http.mjs";
import { notifyDiscord } from "../discord.mjs";
import { moderateText } from "../openai.mjs";
import { cleanEmail, cleanText, enforceRateLimits } from "../security.mjs";
import { mutateState, readState, StorageConfigurationError } from "../storage.mjs";

function publicMessage(message) {
  return {
    id: message.id,
    author: message.author,
    body: message.body,
    createdAt: message.createdAt,
  };
}

async function poll(req, res, visitor) {
  const url = new URL(req.url, "http://localhost");
  const conversationId = cleanText(url.searchParams.get("conversationId"), {
    min: 10,
    max: 80,
    field: "Conversation",
  });
  const after = url.searchParams.get("after") || "";
  const state = await readState();
  const conversation = state.conversations[conversationId];
  if (!conversation || conversation.visitorHash !== visitor.hash) {
    throw new HttpError(404, "CONVERSATION_NOT_FOUND", "This conversation could not be found.");
  }
  const messages = state.messages
    .filter(
      (message) =>
        message.conversationId === conversationId &&
        (!after || String(message.createdAt) > after)
    )
    .map(publicMessage);
  sendJson(res, 200, {
    conversation: {
      id: conversation.id,
      status: conversation.status,
      responseExpectation: "Usually replies within 24 hours.",
    },
    messages,
  });
}

export async function chatHandler(req, res) {
  try {
    assertMethod(req, ["GET", "POST"]);
    const visitor = ensureVisitor(req, res);
    if (req.method === "GET") {
      await poll(req, res, visitor);
      return;
    }

    await enforceRateLimits(visitor.fingerprint, [
      {
        scope: "human-chat-10m",
        limit: 10,
        windowMs: 10 * 60 * 1000,
        message: "Too many messages were sent. Please wait before trying again.",
      },
      {
        scope: "human-chat-day",
        limit: 40,
        windowMs: 24 * 60 * 60 * 1000,
        message: "Today's direct-message limit has been reached. Please use email instead.",
      },
    ]);
    const body = await readJson(req, 16_000);
    const action = body.action === "message" ? "message" : "start";
    const message = cleanText(body.message, {
      min: 2,
      max: 2_000,
      field: "Message",
    });
    await moderateText(message);

    const now = new Date().toISOString();
    let conversationId;
    let name;
    let email;
    if (action === "start") {
      conversationId = crypto.randomUUID();
      name = cleanText(body.name, { min: 2, max: 100, field: "Name" });
      email = cleanEmail(body.email);
      await mutateState((state) => {
        state.conversations[conversationId] = {
          id: conversationId,
          visitorHash: visitor.hash,
          name,
          email,
          status: "awaiting_venkat",
          createdAt: now,
          updatedAt: now,
        };
        state.messages.push({
          id: crypto.randomUUID(),
          conversationId,
          author: "visitor",
          body: message,
          createdAt: now,
        });
      });
    } else {
      conversationId = cleanText(body.conversationId, {
        min: 10,
        max: 80,
        field: "Conversation",
      });
      const result = await mutateState((state) => {
        const conversation = state.conversations[conversationId];
        if (!conversation || conversation.visitorHash !== visitor.hash) {
          throw new HttpError(404, "CONVERSATION_NOT_FOUND", "This conversation could not be found.");
        }
        conversation.status = "awaiting_venkat";
        conversation.updatedAt = now;
        state.messages.push({
          id: crypto.randomUUID(),
          conversationId,
          author: "visitor",
          body: message,
          createdAt: now,
        });
        return { name: conversation.name, email: conversation.email };
      });
      name = result.name;
      email = result.email;
    }

    let delivery = { delivered: false, reason: "not_configured" };
    try {
      delivery = await notifyDiscord({ conversationId, name, email, message });
    } catch (error) {
      delivery = { delivered: false, reason: error.code || "delivery_failed" };
    }

    sendJson(res, 201, {
      conversationId,
      message: { author: "visitor", body: message, createdAt: now },
      status: "awaiting_venkat",
      responseExpectation: "Usually replies within 24 hours.",
      discordDelivery: delivery.delivered ? "delivered" : "pending_configuration",
    });
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(res, new HttpError(503, "STORAGE_NOT_CONFIGURED", "Direct messaging is not configured."));
      return;
    }
    sendError(res, error);
  }
}
