import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);
const webAppUrl = 'https://flashclearn.netlify.app/';

export async function POST(req: Request) {
  const update = await req.json();
 
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (text === '/start') {
      await bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn! Нажмите на кнопку ниже, чтобы открыть веб-приложение.', {
        reply_markup: {
          inline_keyboard: [[{
            text: 'Открыть FlashLearn',
            web_app: { url: webAppUrl }
          }]]
        }
      });
    }
  }

  return NextResponse.json({ ok: true });
}
