import './globals.css'
import Script from 'next/script'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'FlashLearn - Изучай слова легко',
  description: 'Мини-приложение для изучения слов с помощью флеш-карточек',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className="telegram-viewport">
        {children}
      </body>
    </html>
  );
}
