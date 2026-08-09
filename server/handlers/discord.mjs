import crypto from "node:crypto";
import { verifyDiscordRequest } from "../discord.mjs";
import { HttpError, sendError, sendJson } from "../http.mjs";
import { cleanText } from "../security.mjs";
import { mutateState, StorageConfigurationError } from "../storage.mjs";

function interactionUserId(body) {
  return body.member?.user?.id || body.user?.id || "";
}

function option(body, name) {
  return body.data?.options?.find((item) => item.name === name)?.value;
}

export async function discordHandler(req, res) {
  try {
    if (req.method !== "POST") {
      throw new HttpError(405, "METHOD_NOT_ALLOWED", "This method is not allowed.");
    }
    let rawBody = req.rawBody;
    if (!rawBody) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      rawBody = Buffer.concat(chunks);
    }
    verifyDiscordRequest(req, rawBody);
    const body = JSON.parse(rawBody.toString("utf8"));
    if (body.type === 1) {
      sendJson(res, 200, { type: 1 });
      return;
    }
    if (body.type !== 2 || body.data?.name !== "reply") {
      sendJson(res, 200, {
        type: 4,
        data: { content: "Unsupported command.", flags: 64 },
      });
      return;
    }
    const ownerId = process.env.DISCORD_OWNER_USER_ID;
    if (!ownerId || interactionUserId(body) !== ownerId) {
      sendJson(res, 200, {
        type: 4,
        data: { content: "Only Venkat can reply to portfolio conversations.", flags: 64 },
      });
      return;
    }
    const conversationId = cleanText(option(body, "conversation"), {
      min: 10,
      max: 80,
      field: "Conversation",
    });
    const message = cleanText(option(body, "message"), {
      min: 2,
      max: 2_000,
      field: "Message",
    });
    const now = new Date().toISOString();
    await mutateState((state) => {
      const conversation = state.conversations[conversationId];
      if (!conversation) {
        throw new HttpError(404, "CONVERSATION_NOT_FOUND", "Conversation not found.");
      }
      state.messages.push({
        id: crypto.randomUUID(),
        conversationId,
        author: "venkat",
        body: message,
        createdAt: now,
      });
      conversation.status = "replied";
      conversation.updatedAt = now;
    });
    sendJson(res, 200, {
      type: 4,
      data: {
        content: "Reply delivered to portfolio conversation " + conversationId + ".",
        flags: 64,
      },
    });
  } catch (error) {
    if (error instanceof StorageConfigurationError) {
      sendError(res, new HttpError(503, "STORAGE_NOT_CONFIGURED", "Direct messaging is not configured."));
      return;
    }
    sendError(res, error);
  }
}
