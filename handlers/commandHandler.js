import fs from "fs-extra";
import path from "path";
import config from "../config.json" assert { type: "json" };
import { fileURLToPath } from "url";
import logger from "../utils/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, "../commands");

export function handleCommand({ api, event, args, command }) {
  const commandFile = path.join(commandsPath, `${command}.js`);
  if (!fs.existsSync(commandFile)) {
    return api.sendMessage(`Lệnh "${command}" không tồn tại!`, event.threadID);
  }

  import(`../commands/${command}.js`).then(cmd => {
    try {
      cmd.default({ api, event, args, config });
    } catch (e) {
      logger.error("Lỗi chạy lệnh:", e);
      api.sendMessage("Có lỗi khi chạy lệnh!", event.threadID);
    }
  });
}