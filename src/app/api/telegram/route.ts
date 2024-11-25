// import TelegramBot from 'node-telegram-bot-api';
// import { NextResponse } from 'next/server';
// import { flashcards } from '@/lib/flashcardService';

// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);

// export async function POST(req: Request) {
//   const update = await req.json();
  
//   if (update.message) {
//     const chatId = update.message.chat.id;
//     const text = update.message.text;
//     if (text.startsWith('/create')) {
//       const [question, answer] = text.slice(8).split('|');
//       if (question && answer) {
//         flashcards.push({ question, answer });
//         await bot.sendMessage(chatId, 'Флеш-карточка создана!');
//       }
//     }
//   }

//   return NextResponse.json({ ok: true });
// }
// import TelegramBot from 'node-telegram-bot-api';
// import { NextResponse } from 'next/server';
// import { flashcards } from '@/lib/flashcardService';

// const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);
// const webAppUrl = 'https://flashclearn.netlify.app/';

// export async function POST(req: Request) {
//   const update = await req.json();
  
//   if (update.message) {
//     const chatId = update.message.chat.id;
//     const text = update.message.text;

//     if (text === '/start') {
//       await bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn!', {
//         reply_markup: {
//           inline_keyboard: [[{
//             text: 'Открыть веб-приложение',
//             url: webAppUrl
//           }]]
//         }
//       });
//     }

//     if (text.startsWith('/create')) {
//       const [question, answer] = text.slice(8).split('|');
//       if (question && answer) {
//         flashcards.push({ question, answer });
//         await bot.sendMessage(chatId, 'Флеш-карточка создана!');
//       }
//     }
//   }

//   return NextResponse.json({ ok: true });
// }

import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';
import { flashcards } from '@/lib/flashcardService';

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);
const webAppUrl = 'https://flashclearn.netlify.app/';

export async function POST(req: Request) {
  const update = await req.json();
  
  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    // Обработка команды /start
    if (text === '/start') {
      await bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn! Нажмите на кнопку ниже, чтобы открыть веб-приложение.', {
        reply_markup: {
          inline_keyboard: [[{
            text: 'Открыть веб-приложение',
            url: webAppUrl
          }], [{
            text: 'Запустить',
            callback_data: 'start_game' // Используем callback_data для обработки нажатия кнопки
          }]]
        }
      });
    }

    // Обработка создания флеш-карточки
    if (text.startsWith('/create')) {
      const [question, answer] = text.slice(8).split('|');
      if (question && answer) {
        flashcards.push({ question, answer });
        await bot.sendMessage(chatId, 'Флеш-карточка создана!');
      } else {
        await bot.sendMessage(chatId, 'Пожалуйста, используйте формат: /create вопрос|ответ');
      }
    }
  }

  return NextResponse.json({ ok: true });
}

// Обработка callback_query
bot.on('callback_query', async (callbackQuery) => {
  // Проверяем, есть ли сообщение в callbackQuery
  if (!callbackQuery.message) {
    console.error('Ошибка: callbackQuery.message is undefined');
    return; // Выходим, если message отсутствует
  }

  const chatId = callbackQuery.message.chat.id;
  const callbackData = callbackQuery.data;

  if (callbackData === 'start_game') {
    await bot.sendMessage(chatId, 'Бот запущен! Теперь вы можете использовать команды.');
    // Здесь вы можете добавить дополнительную логику или команды
  }
});