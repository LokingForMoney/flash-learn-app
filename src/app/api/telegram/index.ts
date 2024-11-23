import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';
// import { flashcards } from '@/lib/flashcardService';

const token = process.env.TELEGRAM_BOT_TOKEN!;
// const webAppUrl = 'https://flashclearn.netlify.app/';

const bot = new TelegramBot(token, { polling: false });

export async function POST(req: Request) {
  try {
    console.log('=== НОВЫЙ ЗАПРОС ===');
    const update = await req.json();
    console.log('ДАННЫЕ ЗАПРОСА:', JSON.stringify(update));

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      console.log('ПОЛУЧЕНО СООБЩЕНИЕ:', text);
      console.log('CHAT ID:', chatId);

      const response = await bot.sendMessage(chatId, 'Тестовое сообщение');
      console.log('ОТВЕТ ОТПРАВЛЕН:', response);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log('ОШИБКА:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
