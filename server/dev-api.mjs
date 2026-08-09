import http from "node:http";
import { loadLocalEnv } from "./load-env.mjs";

loadLocalEnv();

const handlers = {
  "/api/assistant": (await import("./handlers/assistant.mjs")).assistantHandler,
  "/api/visitor": (await import("./handlers/visitor.mjs")).visitorHandler,
  "/api/chat": (await import("./handlers/chat.mjs")).chatHandler,
  "/api/attestations": (await import("./handlers/attestations.mjs")).attestationsHandler,
  "/api/attestation-admin": (await import("./handlers/attestation-admin.mjs")).attestationAdminHandler,
  "/api/discord": (await import("./handlers/discord.mjs")).discordHandler,
};

const port = Number(process.env.API_PORT || 8787);
const server = http.createServer(async (req, res) => {
  const path = new URL(req.url, "http://localhost").pathname;
  const handler = handlers[path];
  if (!handler) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: { code: "NOT_FOUND", message: "API route not found." } }));
    return;
  }

  try {
    if (req.method !== "GET") {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 32_000) {
          res.statusCode = 413;
          res.end(JSON.stringify({ error: { code: "PAYLOAD_TOO_LARGE", message: "Request too large." } }));
          return;
        }
        chunks.push(chunk);
      }
      req.rawBody = Buffer.concat(chunks);
      if (path !== "/api/discord" && req.rawBody.length) {
        try {
          req.body = JSON.parse(req.rawBody.toString("utf8"));
        } catch {
          req.body = null;
        }
      }
    }
    await handler(req, res);
  } catch {
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: { code: "INTERNAL_ERROR", message: "Request failed." } }));
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log("Portfolio API listening on http://127.0.0.1:" + port);
});
