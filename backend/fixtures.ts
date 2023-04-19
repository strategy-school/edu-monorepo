import mongoose from 'mongoose';
import config from './src/config';
import User from './src/models/User';
import Course from './src/models/Course';
import * as crypto from 'crypto';
import Teacher from './src/models/Teacher';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('courses');
    await db.dropCollection('users');
    await db.dropCollection('teachers');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [admin, teacher, teacher2, teacher3, user] = await User.create(
    {
      email: 'admin@gmail.com',
      firstName: 'Admin',
      lastName: 'Admin',
      password: 'admin',
      token: crypto.randomUUID(),
      phoneNumber: '+996555555555',
      role: 'admin',
    },
    {
      email: 'teacher@gmail.com',
      firstName: 'Teacher',
      lastName: 'Teacher',
      password: 'teacher',
      token: crypto.randomUUID(),
      phoneNumber: '+996701888789',
      role: 'teacher',
    },
    {
      email: 'teacher2@gmail.com',
      firstName: 'Teacher2',
      lastName: 'Teacher2',
      password: 'teacher2',
      token: crypto.randomUUID(),
      phoneNumber: '+996702702702',
      role: 'teacher',
    },
    {
      email: 'teacher3@gmail.com',
      firstName: 'Teacher3',
      lastName: 'Teacher3',
      password: 'teacher3',
      token: crypto.randomUUID(),
      phoneNumber: '+996703703703',
      role: 'teacher',
    },
    {
      email: 'user@gmail.com',
      firstName: 'User',
      lastName: 'User',
      password: 'user',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902644',
    },
  );

  const [teacherPublished1, teacherPublished2, teacherPublished3] =
    await Teacher.create(
      {
        user_id: teacher._id,
        info: 'Teacher1 - настоящий эксперт в своей области. Он обладает богатым опытом работы в маркетинговом сообществе и имеет профессиональное образование в области маркетинга, что позволяет ему быть в курсе последних тенденций и инноваций в маркетинге. Teacher1 предлагает практический подход к обучению, предлагая реальные кейсы и примеры из реального бизнеса. Он поможет вам разработать план маркетинговых действий, определить вашу целевую аудиторию, провести исследование рынка, разработать маркетинговые кампании и многое другое.',
        portfolio: [
          'Разработка и реализация маркетинговой стратегии для стартапа в области технологий: включала исследование рынка, определение целевой аудитории, разработку бренд-концепции, создание цифровой маркетинговой кампании и анализ ее эффективности.',
          'Проведение ребрендинга для крупной компании в сфере FMCG: включала анализ текущей маркетинговой стратегии, исследование рынка и аудит бренда, разработку нового бренд-идентитета, создание маркетингового плана и внедрение ребрендинговых мероприятий.',
          'Организация и проведение масштабной промо-акции для розничной сети магазинов: включала разработку маркетингового плана, выбор оптимальных промо-механик, организацию рекламной кампании, координацию работы с поставщиками и анализ результатов.',
        ],
        photo: 'fixtures/teacherProfile.jpg',
      },
      {
        user_id: teacher2._id,
        info: 'Teacher2 - опытный маркетолог с глубокими знаниями в области цифрового маркетинга. Он прошел множество проектов, охватывающих различные отрасли и географии, и успешно реализовал маркетинговые стратегии, которые привели к значительному росту продаж и увеличению бренд-усознаваемости. Teacher2 всегда находит инновационные подходы и стратегии, чтобы достичь целей своих клиентов.',
        portfolio: [
          'Проведение успешной кампании по локализации международного бренда на рынке Восточной Европы: включала разработку локальной маркетинговой стратегии, адаптацию контента под местные особенности, организацию рекламных кампаний в социальных сетях и поисковых системах, а также анализ результатов и оптимизацию кампании.',
          'Успешное внедрение контент-маркетинговой стратегии для стартапа в сфере фитнес-технологий: включала разработку контент-плана, создание качественного контента, его распространение на различных онлайн-платформах, анализ эффективности контент-маркетинговых мероприятий и внесение корректировок для оптимизации результатов.',
          'Проведение успешной ребрендинговой кампании для ритейл-бренда: включала проведение аудита бренда, разработку нового бренд-идентитета, создание маркетинговых материалов, организацию рекламных кампаний и мероприятий по укреплению позиции бренда на рынке.',
        ],
        photo: 'fixtures/teacherProfile2.jpg',
      },
      {
        user_id: teacher3._id,
        info: 'Teacher3 - преподаватель с уникальным подходом к обучению. Он обладает богатым опытом работы в сфере цифрового маркетинга и имеет профессиональное образование в области маркетинга и аналитики. Teacher3 предлагает структурированный подход к разработке маркетинговых стратегий, с фокусом на анализе данных и определении ключевых показателей эффективности. Он поможет вам создать целостный маркетинговый план, оптимизировать рекламные кампании, провести A/B-тестирование и многое другое.',
        portfolio: [
          'Разработка и внедрение интегрированной цифровой стратегии для международного бренда: включала исследование конкурентов, анализ целевой аудитории, разработку креативных решений, настройку рекламных кампаний в социальных сетях и поисковых системах, а также мониторинг и оптимизацию результатов.',
          'Проведение аудита маркетинговой деятельности для малого бизнеса: включал анализ маркетинговых каналов, определение слабых мест и разработку рекомендаций по их улучшению, а также создание маркетингового плана на основе бюджетных ограничений и ресурсов компании.',
          'Организация и проведение онлайн-мероприятий для привлечения новых клиентов: включала выбор платформы, разработку контента и креативных решений, настройку рекламных кампаний, а также анализ эффективности и оптимизацию стратегии в реальном времени.',
        ],
        photo: 'fixtures/teacherProfile3.jpg',
      },
    );

  await Course.create(
    {
      title: 'Не маркетолог',
      price: 0,
      description: `Тема: “Что такое маркетинг и как стать маркетологом” “Что такое реклама, PR, продвижение, “Что такое брендинг”
      Задача программы: Получить новые знания и профессию маркетолога 
      Главный вопрос изучения: “Что это такое маркетинг?”
      Целевая аудитория: Не маркетологи, выпускники университетов, специалисты без опыта,  все те, кто хочет начать карьеру  маркетолога `,
      type: 'seminar',
      duration: 'до 2 часов',
    },
    {
      title: 'Специалист по маркетингу',
      price: 15000,
      description: `Тема: “Специалист по маркетингу” “Специалист PR” “Пресс-секретарь” (для госслужащих) “Специалист по инере маркетингу” “SMM-специалист” 
    Главный вопрос изучения: “Как управлять коммуникациями в маркетинге?”
    Целевая аудитория: Начинающие специалисты отдела маркетинга и/или коммерческого блока`,
      type: 'training',
      duration: '1 месяц',
    },
    {
      title: 'Менеджер по маркетингу',
      price: 30000,
      description: `Тема: Текст Текст Текст Текст Текст 
    Задача программы: Получить новые знания и навыки и опыт решения задач управления маркетинга
    Главный вопрос изучения:  “Как управлять и маркетингом и повышать эффективность продаж”
    Целевая аудитория: Опытные специалисты, менеджеры отдела маркетинга и/или коммерческого блока`,
      type: 'course',
      duration: '2 месяца',
    },
    {
      title: 'Директор по маркетингу',
      price: 75000,
      description: `Тема: Текст Текст Текст Текст Текст  
    Задача программы: Получить новые знания и навыки и опыт решения задач управления маркетинга
    Главный вопрос изучения: Текст Текст Текст Текст Текст 
    Целевая аудитория: Собственники бизнеса, топ-менеджеры, руководители среднего звена`,
      type: 'miniMBA',
      duration: '3 месяца',
    },
  );
  await db.close();
};

void run();
