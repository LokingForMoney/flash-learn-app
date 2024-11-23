import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token);

export async function POST(req: Request) {
  try {
    console.log('=== НОВЫЙ ЗАПРОС ===');
    const update = await req.json();
    console.log('ДАННЫЕ ЗАПРОСА:', JSON.stringify(update));

    if (update.message) {
      const chatId = update.message.chat.id;
      await bot.sendMessage(chatId, 'Тест работы бота');
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log('ОШИБКА:', error);
    return NextResponse.json({ ok: false });
  }
}
