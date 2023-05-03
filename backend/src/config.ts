import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/strategy-school',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  telegramApi: process.env.TELEGRAM_BOT_API,
};

export default config;
