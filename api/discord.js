import { discordHandler } from "../server/handlers/discord.mjs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default discordHandler;
