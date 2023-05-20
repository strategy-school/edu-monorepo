import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Course from './models/Course';
import * as crypto from 'crypto';
import Category from './models/Category';
import Teacher from './models/Teacher';
import Transaction from './models/Transactions';
import Comment from './models/Comment';
import Test from './models/Test';
import Group from './models/Group';
import Notification from './models/Notification';
import VideoReview from './models/VideoReview';
import Lesson from './models/Lesson';

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('courses');
    await db.dropCollection('teachers');
    await db.dropCollection('categories');
    await db.dropCollection('transactions');
    await db.dropCollection('comments');
    await db.dropCollection('tests');
    await db.dropCollection('groups');
    await db.dropCollection('notifications');
    await db.dropCollection('videoreviews');
    await db.dropCollection('lessons');
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
      avatar: null,
      verified: true,
    },
    {
      email: 'teacher@gmail.com',
      firstName: 'Улан',
      lastName: 'Мухамед',
      password: 'teacher',
      token: crypto.randomUUID(),
      phoneNumber: '+996701888789',
      role: 'teacher',
      avatar: null,
      verified: true,
    },
    {
      email: 'teacher2@gmail.com',
      firstName: 'Султан-Мурат',
      lastName: 'Хашимов',
      password: 'teacher2',
      token: crypto.randomUUID(),
      phoneNumber: '+996702702702',
      role: 'teacher',
      avatar: null,
      verified: true,
    },
    {
      email: 'teacher3@gmail.com',
      firstName: 'Васлидин',
      lastName: 'Атаханов',
      password: 'teacher3',
      token: crypto.randomUUID(),
      phoneNumber: '+996703703703',
      role: 'teacher',
      avatar: null,
      verified: true,
    },
    {
      email: 'user@gmail.com',
      firstName: 'Walter',
      lastName: 'White',
      password: 'user',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902644',
      avatar: null,
      verified: true,
    },
    {
      email: 'user1@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'user',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902645',
      avatar: null,
      verified: true,
    },
    {
      email: 'user2@gmail.com',
      firstName: 'Tony',
      lastName: 'Stark',
      password: 'user',
      token: crypto.randomUUID(),
      phoneNumber: '+996550902646',
      avatar: null,
      verified: true,
    },
  );

  const [marketing, SMM] = await Category.create(
    {
      title: 'Marketing',
      description:
        'Маркетинг – наука, которая рассматривает процессы сбыта продукции или услуг как управляемую рыночную деятельность.',
      image: 'fixtures/marketingCtg.jpg',
      isDeleted: false,
    },
    {
      title: 'SMM',
      description:
        'SMM - это комплекс мероприятий по использованию социальных медиа в качестве каналов для продвижения компаний или бренда и решения других бизнес-задач.',
      image: 'fixtures/smmCtg.jpg',
      isDeleted: false,
    },
  );

  await Teacher.create(
    {
      user: teacher._id,
      info:
        'Улан Мухамед – Тренер по маркетингу. Основатель Школы Маркетинга Strategia,\n' +
        'сертифицированный консультант по маркетингу, тренер. Опыт работы более 15 лет. Возглавлял Управление маркетинга в Бакай Банке, МФК Компаньон, SapatCom.\n' +
        'Разработал и внедрил стратегии маркетинга такие “Буфет”, “Sierra coffee”, “Исламский Финансовый Центр”, “Academia Business Center”. Дополнительное образование получал в Германии и Японии.\n',
      portfolio: [
        'Разработка и реализация маркетинговой стратегии для стартапа в области технологий: включала исследование рынка, определение целевой аудитории, разработку бренд-концепции, создание цифровой маркетинговой кампании и анализ ее эффективности.',
        'Проведение ребрендинга для крупной компании в сфере FMCG: включала анализ текущей маркетинговой стратегии, исследование рынка и аудит бренда, разработку нового бренд-идентитета, создание маркетингового плана и внедрение ребрендинговых мероприятий.',
        'Организация и проведение масштабной промо-акции для розничной сети магазинов: включала разработку маркетингового плана, выбор оптимальных промо-механик, организацию рекламной кампании, координацию работы с поставщиками и анализ результатов.',
      ],
      photo: 'fixtures/UlanMukhamed.jpg',
    },
    {
      user: teacher2._id,
      info: 'Султан-Мурат Хашимов - Тренер по маркетингу.  Заместитель генерального директора/Финансовый директор компании Текстиль-транс (Бренд Меники). Бизнес-консультант, тренер Бизнес-школы Альфа. Опыт работы более 15 лет. Возглавлял финансовые подразделения в таких компаниях как Red petroleum, Кыргызтелеком. Награждаем многочисленными наградами и дипломами. Имеет степень магистра МВА с отличием от АУПКР.',
      portfolio: [
        'Проведение успешной кампании по локализации международного бренда на рынке Восточной Европы: включала разработку локальной маркетинговой стратегии, адаптацию контента под местные особенности, организацию рекламных кампаний в социальных сетях и поисковых системах, а также анализ результатов и оптимизацию кампании.',
        'Успешное внедрение контент-маркетинговой стратегии для стартапа в сфере фитнес-технологий: включала разработку контент-плана, создание качественного контента, его распространение на различных онлайн-платформах, анализ эффективности контент-маркетинговых мероприятий и внесение корректировок для оптимизации результатов.',
        'Проведение успешной ребрендинговой кампании для ритейл-бренда: включала проведение аудита бренда, разработку нового бренд-идентитета, создание маркетинговых материалов, организацию рекламных кампаний и мероприятий по укреплению позиции бренда на рынке.',
      ],
      photo: 'fixtures/SultanMuratKhashimov.jpeg',
    },
    {
      user: teacher3._id,
      info: 'Васлидин Атаханов - Тренер по маркетингу.  Директор по развитию МКК Pocket.kg. Эксперт развитию удалённых и цифровых сервисов. Опыт работы более 15 лет. Возглавлял колл-центр Бакай Банка, награжден грамотой “лучший бэк-офисов 2018 г.”, а также работал в таких копаниях как: Нуртелеком (Бренд О!), Альфа-Телеком (Бренд МегаКом), Tezcom ltd (Китай). Образование получал в Китае, владеет китайским языком, изучает языки программирования.\n',
      portfolio: [
        'Разработка и внедрение интегрированной цифровой стратегии для международного бренда: включала исследование конкурентов, анализ целевой аудитории, разработку креативных решений, настройку рекламных кампаний в социальных сетях и поисковых системах, а также мониторинг и оптимизацию результатов.',
        'Проведение аудита маркетинговой деятельности для малого бизнеса: включал анализ маркетинговых каналов, определение слабых мест и разработку рекомендаций по их улучшению, а также создание маркетингового плана на основе бюджетных ограничений и ресурсов компании.',
        'Организация и проведение онлайн-мероприятий для привлечения новых клиентов: включала выбор платформы, разработку контента и креативных решений, настройку рекламных кампаний, а также анализ эффективности и оптимизацию стратегии в реальном времени.',
      ],
      photo: 'fixtures/silhouette.jpg',
    },
  );

  const [marketing1, marketing2, marketing3, marketing4] = await Course.create(
    {
      title: 'Не маркетолог',
      price: 0,
      description: `Текст текст текст текст текст текст текст текст`,
      category: marketing._id,
      theme: `“Что такое маркетинг и как стать маркетологом”, “Что такое реклама, PR, продвижение“, "Что такое брендинг”`,
      targetAudience: `Не маркетологи, выпускники университетов, специалисты без опыта,  все те, кто хочет начать карьеру  маркетолога`,
      programGoal: `Ознакомление с основными понятиями и принципами маркетинга, рекламы, PR, продвижения и брендинга;`,
      level: 'without level',
      image: 'fixtures/marketing1.jpg',
      type: 'seminar',
      duration: 'до 2 часов',
      isDeleted: false,
      exam: null,
      youtube: false,
      zoom: true,
    },
    {
      title: 'Специалист по маркетингу',
      price: 15000,
      description: `Текст текст текст текст текст текст текст текст`,
      category: marketing._id,
      theme: `“Специалист по маркетингу” “Специалист PR” “Пресс-секретарь” (для госслужащих) “Специалист по инере маркетингу” “SMM-специалист”`,
      targetAudience: `Начинающие специалисты отдела маркетинга и/или коммерческого блока`,
      programGoal: `Повышение профессиональных компетенций в области интернет-маркетинга`,
      level: 'basic',
      image: 'fixtures/marketing2.jpeg',
      type: 'training',
      duration: '1 месяц',
      isDeleted: false,
      exam: 'https://docs.google.com/forms/d/e/1FAIpQLSftAUjjZSGH7CZfCd9mh9Vo1XP8zPXVngY4d9fJDDXmVUvA2A/viewform?usp=sharing',
      youtube: true,
      zoom: true,
    },
    {
      title: 'Менеджер по маркетингу',
      price: 30000,
      description: `Текст Текст Текст Текст ТекстТекст Текст Текст Текст ТекстТекст Текст Текст Текст ТекстТекст Текст Текст Текст ТекстТекст Текст Текст Текст Текст`,
      category: SMM._id,
      theme: `“Построение и эффективное управление отделом маркетинга”`,
      targetAudience: `Менеджеры отдела маркетинга, коммерческого блока, руководители среднего звена`,
      programGoal: `Реализация маркетинговых компаний, увеличивать продажи и прибыль компании.`,
      level: 'professional',
      image: 'fixtures/marketing3.png',
      type: 'course',
      duration: '2 месяца',
      isDeleted: true,
      exam: 'https://docs.google.com/forms/d/e/1FAIpQLSftAUjjZSGH7CZfCd9mh9Vo1XP8zPXVngY4d9fJDDXmVUvA2A/viewform?usp=sharing',
      youtube: true,
      zoom: true,
    },
    {
      title: 'Директор по маркетингу',
      price: 75000,
      description: `Текст Текст Текст Текст ТекстТекст Текст Текст Текст Текст `,
      category: marketing._id,
      theme: `“Стратегический маркетинг и управление коммерческим блоком”`,
      targetAudience: `Собственники бизнеса, топ-менеджеры, руководители среднего звена`,
      programGoal: `Разработка стратегии маркетинга и ее реализация в коммерческом блоке компании.`,
      level: 'managerial',
      image: 'fixtures/marketing4.jpg',
      type: 'miniMBA',
      duration: '3 месяца',
      isDeleted: true,
      exam: 'https://docs.google.com/forms/d/e/1FAIpQLSftAUjjZSGH7CZfCd9mh9Vo1XP8zPXVngY4d9fJDDXmVUvA2A/viewform?usp=sharing',
      youtube: true,
      zoom: true,
    },
  );

  await Transaction.create(
    {
      user: admin._id,
      course: marketing1._id,
    },
    {
      user: teacher._id,
      course: marketing2._id,
    },
    {
      user: teacher2._id,
      course: marketing3._id,
      isPaid: 'paid',
    },
    {
      user: teacher3._id,
      course: marketing4._id,
    },
    {
      user: user._id,
      course: marketing1._id,
      isPaid: 'paid',
    },
  );

  await Comment.create(
    {
      user: user._id,
      course: marketing1._id,
      rating: 5,
      text: 'Мне очень понравился вебинар, все было четко и понятно!',
    },
    {
      user: admin._id,
      course: marketing3._id,
      rating: 2,
      text: 'Проверка от админа',
    },
    {
      user: admin._id,
      course: marketing3._id,
      rating: 3,
      text: 'Проверка от админа',
    },
    {
      user: admin._id,
      course: marketing3._id,
      rating: 5,
      text: 'Проверка от админа',
    },
    {
      user: admin._id,
      course: marketing3._id,
      rating: 5,
      text: 'Проверка от админа Проверка от админа Проверка от админа Проверка от админа Проверка от админа Проверка от админа Проверка от админа Проверка от админа Проверка от админа ',
    },
    {
      user: teacher2._id,
      course: marketing3._id,
      rating: 3,
      text: 'Неплохой курс, были некоторые косяки, но в принципе хорошо!',
    },
  );

  await Test.create(
    {
      category: marketing._id,
      title: 'Тестовые вопросы “Маркетинг”',
      description:
        'В каждом вопросе только один вариант может быть верным. За один правильный ответ 1 балл.',
      questions: [
        {
          question: 'Что такое “рынок”?',
          answers: [
            'Это место где, торгуются покупатель и продавец',
            'Это место где, торгуются покупатель и продавец в присутствии государства',
          ],
          correctAnswer:
            'Это место где, торгуются покупатель и продавец в присутствии государства',
        },
        {
          question: 'Кто такой “клиент”?',
          answers: [
            'Клиент – это тот, кто потребляет наши товары и услуги',
            'Клиент – это тот, кто покупает наши товары и услуги',
          ],
          correctAnswer: 'Клиент – это тот, кто покупает наши товары и услуги',
        },
        {
          question: 'Кто такой “конкурент”?',
          answers: [
            'Конкурентом является компания, чьи товары или услуги, соперничают с вашими товарами или услугами за конечного покупателя',
            'Конкурентом является компания, которая производит аналогичные товары или услуги на вашем рынке',
          ],
          correctAnswer:
            'Конкурентом является компания, чьи товары или услуги, соперничают с вашими товарами или услугами за конечного покупателя',
        },
        {
          question: 'Назовите пять базовых методов исследования рынка',
          answers: [
            'Интервью, фокус-группа, полевые исследования, опросы, наблюдения',
            'Анкетирование, тестирование, дегустация, тайный покупатель, телефонные опросы',
          ],
          correctAnswer:
            'Интервью, фокус-группа, полевые исследования, опросы, наблюдения',
        },
        {
          question: 'Назовите три уровня размера рынка',
          answers: [
            'Занятый, конкурентный, будущий',
            'Реальный, доступный, потенциальный',
          ],
          correctAnswer: 'Реальный, доступный, потенциальный',
        },
        {
          question: 'Что такое “маркетинг”?',
          answers: [
            'Маркетинг – это рекламная акция по привлечению клиентов с целью продать больше товаров и услуг',
            'Маркетинг – это распродажи товаров по цене ниже, чем у конкурентов с целью привлечения больше клиентов',
            'Маркетинг – это пиар кампания в СМИ и Интернете с целью повышению узнаваемости бренда',
            'Маркетинг – это комплекс мер по выявлению потребности рынка, вывод конкурентного продукта, разработки бренда и коммуникации с потребителем с целью получения выгоды',
          ],
          correctAnswer:
            'Маркетинг – это комплекс мер по выявлению потребности рынка, вывод конкурентного продукта, разработки бренда и коммуникации с потребителем с целью получения выгоды',
        },
        {
          question: 'Что такое реклама?',
          answers: [
            'Реклама это пиар продукта среди целевой аудитории',
            'Реклама это продвижение продукта',
            'Реклама это инструмент донесения информации о продукте ',
            'Реклама это формирование положительного имиджа о компании у целевой аудитории',
          ],
          correctAnswer:
            'Реклама это инструмент донесения информации о продукте',
        },
        {
          question: 'Что такое ROMI?',
          answers: [
            'Return of Marketing Investment – коэффициент рентабельности вложений в маркетинг',
            'Rebranding Of Marketing in Internet – ребррендинг маркетинга в интернете',
          ],
          correctAnswer:
            'Return of Marketing Investment – коэффициент рентабельности вложений в маркетинг',
        },
      ],
    },
    {
      category: SMM._id,
      title: 'Social Media Marketing Quiz',
      description: 'Test your knowledge of social media marketing concepts',
      questions: [
        {
          question: 'What is the best time to post on Facebook?',
          answers: [
            'Monday at 8am',
            'Wednesday at 1pm',
            'Saturday at 5pm',
            'It depends on your audience',
          ],
          correctAnswer: 'It depends on your audience',
        },
        {
          question: 'Which of the following is NOT a social media platform?',
          answers: ['Twitter', 'LinkedIn', 'Google Ads', 'Instagram'],
          correctAnswer: 'Google Ads',
        },
        {
          question:
            'What is the purpose of A/B testing in social media marketing?',
          answers: [
            'To increase engagement',
            'To improve ROI',
            'To test different ad creatives',
            'All of the above',
          ],
          correctAnswer: 'All of the above',
        },
      ],
    },
  );

  await Group.create(
    {
      title: 'Специалист по маркетингу - Группа 1',
      description:
        'Численность группы: 20 человек, учебное время - с 09:00 до 10:00, языки обучения - русский, кыргызский',
      course: marketing2,
      startDate: new Date('May 1, 2023, 09:00'),
      endDate: new Date('June 1, 2023, 10:00'),
      startsAt: '09:00',
      duration: '1 час',
      telegramLink: 'https://t.me/+12345',
    },
    {
      title: 'Менеджер по маркетингу - Группа 2',
      description:
        'Численность группы: 15 человек, учебное время - с 13:00 до 14:00, языки обучения - русский, кыргызский',
      course: marketing3,
      startDate: new Date('May 3, 2023, 13:00'),
      endDate: new Date('July 3, 2023, 14:00'),
      startsAt: '13:00',
      duration: '1 час',
      telegramLink: 'https://t.me/+abcd',
    },
  );

  await Notification.create(
    {
      name: 'Joe Biden',
      email: 'joe@gmail.com',
      phoneNumber: '+996555111222',
      message: 'Могут ли здесь учиться иностранцы?',
      isChecked: false,
    },
    {
      name: 'Max Martin',
      email: 'maxmartin@gmail.com',
      phoneNumber: '+996523112233',
      message: null,
      isChecked: true,
    },
  );

  await VideoReview.create(
    {
      title: 'Какое то имя',
      previewImage: 'fixtures/video-review1.webp',
      youtubeURL: 'B20UrosFLjU',
    },
    {
      title: 'Какое то имя',
      previewImage: 'fixtures/video-review2.webp',
      youtubeURL: 'IMgL-z4GX-c',
    },
    {
      title: 'Какое то имя',
      previewImage: 'fixtures/video-review1.webp',
      youtubeURL: 'B20UrosFLjU',
    },
    {
      title: 'Какое то имя',
      previewImage: 'fixtures/video-review2.webp',
      youtubeURL: 'IMgL-z4GX-c',
    },
  );

  await Lesson.create(
    {
      theme: 'Сложные логорифмы и их использование в программировании',
      course: marketing1._id,
      video_link: 'https://www.youtube.com/watch?v=GoNNW0iXc5s&t=2s',
      document: 'fixtures/example.pdf',
    },
    {
      theme: 'Алгоритм Дейкстры в алгоритме графов',
      course: marketing2._id,
      video_link: 'https://www.youtube.com/watch?v=6PLrFRzu6Xo',
      document: 'fixtures/exampl2.pdf',
    },
  );

  await db.close();
};

void run();
