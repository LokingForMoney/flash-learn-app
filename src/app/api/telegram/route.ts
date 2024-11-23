import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';
import { flashcards } from '@/lib/flashcardService';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);

export async function POST(req: Request) {
  const update = await req.json();
  
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;
    if (text.startsWith('/create')) {
      const [question, answer] = text.slice(8).split('|');
      if (question && answer) {
        flashcards.push({ question, answer });
        await bot.sendMessage(chatId, 'Флеш-карточка создана!');
      }
    }
  }

  return NextResponse.json({ ok: true });
}
