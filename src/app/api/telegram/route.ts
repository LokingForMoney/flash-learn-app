// import TelegramBot from 'node-telegram-bot-api';
// import { NextResponse } from 'next/server';
// import { flashcards } from '@/lib/flashcardService';

// const token = process.env.TELEGRAM_BOT_TOKEN!;
// const bot = new TelegramBot(token, { polling: true });

// // Обработка сообщений от Telegram
// bot.onText(/\/start/, (msg) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, 'Добро пожаловать в бот флеш-карточек! Используйте /create для создания карточки.');
// });

// bot.onText(/\/create (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   const text = match[1];
//   const [question, answer] = text.split('|'); // Формат: вопрос|ответ

//   if (question && answer) {
//     flashcards.push({ question, answer });
//     bot.sendMessage(chatId, 'Флеш-карточка создана!');
//   } else {
//     bot.sendMessage(chatId, 'Пожалуйста, используйте формат: /create вопрос|ответ');
//   }
// });

// // Экспортируем API роут для Next.js
// export async function POST(req: Request) {
//   const data = await req.json();
//   // Здесь можно обрабатывать POST запросы, если нужно
//   return NextResponse.json({ message: 'Telegram bot is running' });
// }
// import TelegramBot from 'node-telegram-bot-api';
// import { NextResponse } from 'next/server';
// import { flashcards } from '@/lib/flashcardService';
// const token = process.env.TELEGRAM_BOT_TOKEN!;
// // const webAppUrl = process.env.NEXT_PUBLIC_WEBAPP_URL!;
// const webAppUrl = 'https://flashclearn.netlify.app/2';
// const bot = new TelegramBot(token, { polling: true });

// // bot.onText(/\/start/, (msg) => {
// //   const chatId = msg.chat.id;
// //   bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn!', {
// //     reply_markup: {
// //       inline_keyboard: [
// //         [{ text: 'Открыть веб-приложение', web_app: { url: webAppUrl } }]
// //       ]
// //     }
// //   });
// // });
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn!', {
//       reply_markup: {
//         inline_keyboard: [
//           [{
//             text: 'Открыть веб-приложение',
//             url: webAppUrl
//           }]
//         ]
//       }
//     });
//   });
// bot.onText(/\/create (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   if (match && match[1]) {
//     const text = match[1];
//     const [question, answer] = text.split('|');

//     if (question && answer) {
//       flashcards.push({ question, answer });
//       bot.sendMessage(chatId, 'Флеш-карточка создана!');
//     } else {
//       bot.sendMessage(chatId, 'Пожалуйста, используйте формат: /create вопрос|ответ');
//     }
//   } else {
//     bot.sendMessage(chatId, 'Пожалуйста, используйте формат: /create вопрос|ответ');
//   }
// });

// export async function POST(req: Request) {
//   try {
//       const update = await req.json();
//       // Обрабатываем входящее обновление
//       await bot.handleUpdate(update);
//       return NextResponse.json({ ok: true });
//   } catch (error) {
//       console.error('Error processing update:', error);
//       return NextResponse.json({ ok: false }, { status: 500 });
//   }
// }
import TelegramBot from 'node-telegram-bot-api';
import { NextResponse } from 'next/server';
import { flashcards } from '@/lib/flashcardService';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const webAppUrl = 'https://flashclearn.netlify.app/';

const bot = new TelegramBot(token);

export async function POST(req: Request) {
  try {
    const update = await req.json();
    
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;

      // Обработка команды /start
      if (text === '/start') {
        await bot.sendMessage(chatId, 'Добро пожаловать в FlashLearn!', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Открыть веб-приложение',
                url: webAppUrl
              }]
            ]
          }
        });
      }

      // Обработка команды /create
      const createMatch = text.match(/\/create (.+)/);
      if (createMatch) {
        const [question, answer] = createMatch[1].split('|');
        
        if (question && answer) {
          flashcards.push({ question, answer });
          await bot.sendMessage(chatId, 'Флеш-карточка создана!');
        } else {
          await bot.sendMessage(chatId, 'Пожалуйста, используйте формат: /create вопрос|ответ');
        }
      }
    }
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error processing update:', error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
