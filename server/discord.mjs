import nacl from "tweetnacl";
import { HttpError } from "./http.mjs";

export async function notifyDiscord({ conversationId, name, email, message }) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return { delivered: false, reason: "not_configured" };

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "New portfolio message - conversation " + conversationId,
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "Message from " + name,
          description: message,
          color: 0x3fe0ff,
          fields: [
            { name: "Conversation", value: conversationId, inline: false },
            { name: "Reply", value: "/reply conversation:" + conversationId + " message:<your reply>", inline: false },
            ...(email ? [{ name: "Email", value: email, inline: false }] : []),
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });
  if (!response.ok) {
    throw new HttpError(502, "DISCORD_DELIVERY_FAILED", "The message was saved, but Discord delivery failed.");
  }
  return { delivered: true };
}

export function verifyDiscordRequest(req, rawBody) {
  const publicKey = process.env.DISCORD_PUBLIC_KEY;
  if (!publicKey) {
    throw new HttpError(503, "DISCORD_NOT_CONFIGURED", "Discord replies are not configured.");
  }
  const signature = String(req.headers["x-signature-ed25519"] || "");
  const timestamp = String(req.headers["x-signature-timestamp"] || "");
  if (!signature || !timestamp) {
    throw new HttpError(401, "INVALID_DISCORD_SIGNATURE", "Invalid Discord signature.");
  }
  const timestampMs = Number(timestamp) * 1_000;
  if (!Number.isFinite(timestampMs) || Math.abs(Date.now() - timestampMs) > 5 * 60 * 1_000) {
    throw new HttpError(401, "STALE_DISCORD_SIGNATURE", "The Discord request has expired.");
  }
  const valid = nacl.sign.detached.verify(
    Buffer.from(timestamp + rawBody.toString("utf8")),
    Buffer.from(signature, "hex"),
    Buffer.from(publicKey, "hex")
  );
  if (!valid) {
    throw new HttpError(401, "INVALID_DISCORD_SIGNATURE", "Invalid Discord signature.");
  }
}
