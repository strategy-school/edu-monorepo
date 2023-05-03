import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import coursesRouter from './routers/courses';
import transactionsRouter from './routers/transactions';
import usersRouter from './routers/users';
import categoriesRouter from './routers/categories';
import teachersRouter from './routers/teachers';
import commentsRouter from './routers/comments';
import telegramBopApi from 'node-telegram-bot-api';

const app = express();
const port = 8000;

const token = '6126198813:AAEpozXlUlsPWI5UMaGcAX0CxY5S3Xf1NVU';

app.use(cors());
app.use(express.static('src/public'));
app.use(express.json());
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/teachers', teachersRouter);
app.use('/comments', commentsRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  app.listen(port, () => {
    console.log('We are live on', port);
  });

  const bot = new telegramBopApi(token, { polling: true });
  bot.on('message', (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      bot.sendMessage(chatId, 'Welcome to Strategia School bot');
    }
    if (text === '/info') {
      bot.sendMessage(chatId, `Student name: ${msg.from?.first_name}`);
    }
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
