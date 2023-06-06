import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://0.0.0.0/strategy-school',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  telegramApi: process.env.TELEGRAM_BOT_API,
  website: 'google.com', //Ссылка на локалхост не поддерживается апишкой и ссылки будут не кликабельные, пока для примера ссылка на гугл:)
  email: ' strategia.kg@gmail.com',
  phone: '+996555112233', //точно также с телефоном
  companyName: 'Школа маркетингка Strategia',
};

export default config;
