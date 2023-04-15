import mongoose from 'mongoose';
import config from './src/config';
import User from "./src/models/User";
import Course from "./src/models/Course";
import * as crypto from "crypto";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('courses');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Admin',
      password: 'admin',
      token: crypto.randomUUID(),
      phoneNumber: '+996 555 555 555',
      role: 'admin',
    },
    {
      email: 'teacher@gmail.com',
      firstName: 'Teacher',
      lastName: 'Teacher',
      password: 'teacher',
      token: crypto.randomUUID(),
      phoneNumber: '+996 701 888 789',
      role: 'teacher',
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'User',
      password: 'user',
      token: crypto.randomUUID(),
      phoneNumber: '+996 550 902 644',
    },
  );

  await Course.create({
    title: 'Не маркетолог',
    price: 0,
    description: `Тема: “Что такое маркетинг и как стать маркетологом” “Что такое реклама, PR, продвижение, “Что такое брендинг”
      Задача программы: Получить новые знания и профессию маркетолога 
      Главный вопрос изучения: “Что это такое маркетинг?”
      Целевая аудитория: Не маркетологи, выпускники университетов, специалисты без опыта,  все те, кто хочет начать карьеру  маркетолога `,
    type: 'seminar',
    duration: 'до 2 часов'
  }, {
    title: 'Специалист по маркетингу',
    price: 15000,
    description: `Тема: “Специалист по маркетингу” “Специалист PR” “Пресс-секретарь” (для госслужащих) “Специалист по инере маркетингу” “SMM-специалист” 
    Главный вопрос изучения: “Как управлять коммуникациями в маркетинге?”
    Целевая аудитория: Начинающие специалисты отдела маркетинга и/или коммерческого блока`,
    type: 'training',
    duration: '1 месяц'
  }, {
    title: 'Менеджер по маркетингу',
    price: 30000,
    description: `Тема: Текст Текст Текст Текст Текст 
    Задача программы: Получить новые знания и навыки и опыт решения задач управления маркетинга
    Главный вопрос изучения:  “Как управлять и маркетингом и повышать эффективность продаж”
    Целевая аудитория: Опытные специалисты, менеджеры отдела маркетинга и/или коммерческого блока`,
    type: 'course',
    duration: '2 месяца'
  }, {
    title: 'Директор по маркетингу',
    price: 75000,
    description: `Тема: Текст Текст Текст Текст Текст  
    Задача программы: Получить новые знания и навыки и опыт решения задач управления маркетинга
    Главный вопрос изучения: Текст Текст Текст Текст Текст 
    Целевая аудитория: Собственники бизнеса, топ-менеджеры, руководители среднего звена`,
    type: 'miniMBA',
    duration: '3 месяца'
  });
  await db.close();
};

void run();
