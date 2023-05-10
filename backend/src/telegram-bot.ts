import telegramBopApi, { Message } from 'node-telegram-bot-api';
import { Express } from 'express';
import mongoose from 'mongoose';
import config from './config';

const bot = new telegramBopApi(config.telegramApi as string, { polling: true });

const initialMessage = `
        Здравствуйте! Вас приветствует чат-бот Школы Маркетинга Strategia.\n\nЕсли вам интересно узнать:
        - о наших курсах, программах и ценах, то перейдите по ссылке: <a href="${config.website}/courses">"Курсы"</a>
        - о школе Маркетинга Strategia, то перейдите по ссылке: <a href="${config.website}/about-us">"О Нас"</a>
        - о тренерах Школы Маркетинга Strategia, то перейдите по ссылке: <a href="${config.website}/teachers">"Тренеры"</a> \n\nЕсли вы хотите связаться с нами, вот наша ссылка на <a href="${config.website}/contact-with-us">форму обратной связи</a>.`;
let message = ``;
const additionalInfo = `Вы можете узнать более подробную информацию на нашем <a href="${config.website}"><b>сайте</b></a> или связавшись с нами по телефону <a href="tel${config.phone}"><b>${config.phone}</b></a> или по электронной почте ${config.email}`;

export default function attachTelegramBot(app: Express, db: mongoose.Mongoose) {
  void bot.setMyCommands([
    { command: '/start', description: 'Старт бота и все важные ссылки' },
    {
      command: '/how_to_register',
      description: 'Как зарегистрироваться на курс?',
    },
    {
      command: '/price_payment',
      description: 'Какая стоимость курсов и способы оплаты?',
    },
    {
      command: '/format_duration',
      description: 'Какой формат обучения и длительность?',
    },
    {
      command: '/after_course',
      description: 'Что я получу после оканчания курса?',
    },
    {
      command: '/discount',
      description: 'Могу ли я получить скидку на курс?',
    },
    {
      command: '/languages',
      description: 'Какие языки преподавания доступны?',
    },
    {
      command: '/consultation',
      description: 'Могу ли я получить индивидуальные консультации?',
    },
  ]);

  bot.on('message', async (msg: Message) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    switch (text) {
      case '/start':
        return bot.sendMessage(chatId, initialMessage, { parse_mode: 'HTML' });

      case '/how_to_register':
        message = ` Вы можете зарегистрироваться на наши курсы на нашем <a href="${config.website}"><b>сайте</b></a>, связавшись с нами по телефону <a href="tel${config.phone}"><b>${config.phone}</b></a> или написав на электронную почту ${config.email}`;

        return bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

      case '/price_payment':
        message = `Стоимость курсов в Школе Маркетинга Strategia зависит от конкретного курса.\n\nОплатить курс можно банковской картой на сайте, электронным кошельком на номер +996 709 67 77 77 на О!деньги, Баланс.кг, Мбанк, или наличными в нашем офисе или банковским переводом.\n\n${additionalInfo}`;

        return bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

      case '/format_duration':
        message = `Мы предлагаем различные форматы обучения, включая очные и онлайн-курсы, вебинары, мастер-классы и индивидуальное обучение. Длительность курсов может варьироваться в зависимости от конкретного курса.\n\n${additionalInfo}`;

        return bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

      case '/after_course':
        message = `Вы получите актуальные знания от бизнес-экспертов, официальный сертификат, подтверждающий ваши знания и навыки, тренинговый материал, членство в клубе выпускников и привилегии.`;

        return bot.sendMessage(chatId, message);

      case '/discount':
        message = `Для наших постоянных клиентов и студентов доступны скидки на курсы. Также мы проводим акции и специальные предложения.`;

        return bot.sendMessage(chatId, message);

      case '/languages':
        message = `Преподавание ведется на русском и кыргызском языках.`;

        return bot.sendMessage(chatId, message);

      case '/consultation':
        message = `Вы можете заказать индивидуальные консультации с нашими тренерами.\n\nСвяжитесь с нами по телефону <a href="tel${config.phone}"><b>${config.phone}</b></a> или написав на электронную почту ${config.email}\n\n А также, вы можете заполнить <a href="${config.website}/contact-with-us">форму обратной связи</a> на нашем сайте.`;
        return bot.sendMessage(chatId, message, { parse_mode: 'HTML' });

      default:
        return bot.sendMessage(
          chatId,
          `Неизвестная команда, для того, чтобы ознакомиться с доступными командами откройте <b>"Меню команд"</b>\n\n${additionalInfo}`,
          { parse_mode: 'HTML' },
        );
    }
  });

  process.on('exit', () => {
    db.connection.close();
  });
}
