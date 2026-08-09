import { loadLocalEnv } from "../server/load-env.mjs";

loadLocalEnv();

const required = [
  "DISCORD_APP_ID",
  "DISCORD_BOT_TOKEN",
  "DISCORD_GUILD_ID",
];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) {
  console.error("Missing Discord configuration: " + missing.join(", "));
  process.exit(1);
}

const endpoint =
  "https://discord.com/api/v10/applications/" +
  process.env.DISCORD_APP_ID +
  "/guilds/" +
  process.env.DISCORD_GUILD_ID +
  "/commands";
const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    Authorization: "Bot " + process.env.DISCORD_BOT_TOKEN,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "reply",
    description: "Reply to a portfolio website conversation",
    default_member_permissions: "0",
    options: [
      {
        type: 3,
        name: "conversation",
        description: "Conversation ID shown in the Discord notification",
        required: true,
      },
      {
        type: 3,
        name: "message",
        description: "Reply shown to the visitor on the portfolio",
        required: true,
        max_length: 2000,
      },
    ],
  }),
});

if (!response.ok) {
  console.error("Discord command registration failed with status " + response.status + ".");
  process.exit(1);
}
console.log("Discord /reply command registered.");
