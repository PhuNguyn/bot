import login from "ws3-fca";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { handleCommand } from "./handlers/commandHandler.js";
import logger from "./utils/logger.js";
import config from "./config.json" assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appStateFile = path.join(__dirname, "appstate.json");
let appState = JSON.parse(fs.readFileSync(appStateFile, "utf-8"));

login({ appState }, async (err, api) => {
  if (err) return logger.error("Login failed:", err);

  logger.success(`${config.botName} đã online thành công!`);

  api.setOptions({
    listenEvents: true,
    selfListen: false,
    logLevel: "silent"
  });

  const listen = api.listenMqtt;
  listen(async (err, event) => {
    if (err) return logger.error(err);

    if (event.type !== "message" && event.type !== "message_reply") return;

    const body = event.body || "";
    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    handleCommand({ api, event, args, command });
  });
});
