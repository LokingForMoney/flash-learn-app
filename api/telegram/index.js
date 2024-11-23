import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);
const webAppUrl = 'https://flashclearn.netlify.app/';

export const handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body);
    
    if (body.message && body.message.text === '/start') {
      await bot.sendMessage(body.message.chat.id, 'Добро пожаловать в FlashLearn!', {
        reply_markup: {
          inline_keyboard: [[{
            text: 'Открыть веб-приложение',
            url: webAppUrl
          }]]
        }
      });
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  }
};
