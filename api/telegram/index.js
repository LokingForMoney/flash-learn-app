import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

export const handler = async function(event, context) {
  try {
    console.log('=== НОВЫЙ ЗАПРОС ===');
    const body = JSON.parse(event.body);
    console.log('ДАННЫЕ:', body);

    if (body.message) {
      const chatId = body.message.chat.id;
      console.log('CHAT ID:', chatId);
      await bot.sendMessage(chatId, 'Тест бота');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    console.log('ОШИБКА:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false })
    };
  }
};
