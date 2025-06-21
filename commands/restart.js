export default function ({ api, event, config }) {
  const { senderID, threadID } = event;
  if (!config.adminIDs.includes(senderID)) {
    return api.sendMessage("Cút! Lệnh này chỉ dành cho admin!", threadID);
  }

  api.sendMessage("♻️ Restarting KirraBot...", threadID, () => {
    process.exit(1);
  });
}