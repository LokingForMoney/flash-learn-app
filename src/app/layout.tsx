import Script from 'next/script'
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru">
      <body>
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
        <header>
          <h1>Флеш-карточки</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;