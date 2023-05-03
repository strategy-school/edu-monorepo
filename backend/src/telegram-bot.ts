import telegramBopApi from 'node-telegram-bot-api';

const token = '6126198813:AAEpozXlUlsPWI5UMaGcAX0CxY5S3Xf1NVU';

const bot = new telegramBopApi(token, { polling: true });

bot.on('message', (msg) => {
  console.log(msg);
});
