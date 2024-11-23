const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  
  if (body.message) {
    const chatId = body.message.chat.id;
    await bot.sendMessage(chatId, 'Тест бота');
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true })
  };
};
