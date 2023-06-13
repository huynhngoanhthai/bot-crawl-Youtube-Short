require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
// Thay thế 'YOUR_TOKEN' bằng mã token của bot Telegram của bạn

const sendMessageToTelegram = async (message) => {
  const bot = new TelegramBot(process.env.TOKEN_TELEGRAM, {
    polling: true,
  });
  const userId = process.env.ID_GROUP;
  bot.sendMessage(userId, message);
  bot.stopPolling();
};
module.exports = sendMessageToTelegram;
