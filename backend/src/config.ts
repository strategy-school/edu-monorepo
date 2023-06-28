import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://0.0.0.0/strategy-school',
  google: {
    clientId:
      '22734562658-0aa218i7sat9v9nbann739c1abi2n5je.apps.googleusercontent.com',
  },
  emailData: {
    emailVerifyPass: 'hksghesodejulvef',
    emailUser: 'strategia.kg@gmail.com',
  },
  telegramApi: '5938090504:AAEs58JZaZUD-OQ7lordB0rob7TNjJKg-5Q',
  appUrl: 'https://strategia.school',
  website: 'strategia.school',
  email: ' strategia.kg@gmail.com',
  phone: '+996709677777', // телефон липовый!
  companyName: 'Школа маркетинга Strategia',
};

export default config;
