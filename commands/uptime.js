import moment from "moment";

export default function ({ api, event }) {
  const uptime = process.uptime();
  const time = moment.utc(uptime * 1000).format("HH:mm:ss");
  api.sendMessage(`⏱ KirraBot đã hoạt động: ${time}`, event.threadID);
}