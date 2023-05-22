import { Router } from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { Error, HydratedDocument } from 'mongoose';
import Lesson from '../models/Lesson';
import { ILesson, PageLimit, Search } from '../types';
import { pdfUpload } from '../multer';
import Transaction from '../models/Transactions';

type QueryParams = Search<Pick<ILesson, 'theme' | 'course'>> & PageLimit;

const lessonsRouter = Router();

lessonsRouter.post(
  '/',
  auth,
  pdfUpload.single('document'),
  permit('admin', 'teacher'),
  async (req, res, next) => {
    try {
      const lesson = await Lesson.create({
        theme: req.body.theme,
        video_link: req.body.video_link,
        document: req.file ? req.file.filename : null,
        course: req.body.course,
        number: parseInt(req.body.number),
      });

      return res.send({ message: 'Lesson is created', result: lesson });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.send(400).send(e);
      }
      return next(e);
    }
  },
);

lessonsRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;
    const { page, limit, ...params }: QueryParams = req.query;
    const transaction = await Transaction.findOne({
      user: user._id,
      course: params.course,
      course_type: 'youtube',
      isPaid: 'paid',
    });
    const p: number = page ? parseInt(page) : 1;
    const l: number = limit ? parseInt(limit) : 10;

    if (!transaction && user.role !== 'admin') {
      console.log(transaction, user._id, params.course);
      return res.status(403).send({
        error:
          'Вы не покупали данный курс или ваша оплата еще не подтверждена!',
      });
    }

    const totalCount = await Lesson.count(params);
    const skip = (p - 1) * l;

    const lessons = await Lesson.find(params)
      .populate('course', 'title price type level image')
      .skip(skip)
      .limit(l)
      .sort({ number: 1 });

    return res.send({
      message: 'Lessons are found',
      result: { lessons, currentPage: p, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

lessonsRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const lessonId = req.params.id;

    const lesson = await Lesson.findById(lessonId).populate(
      'course',
      'title price type level image',
    );

    if (!lesson) {
      return res.status(404).send({ error: 'Lesson is not found' });
    }

    return res.send({ message: 'Lesson is found', result: lesson });
  } catch (e) {
    return next(e);
  }
});

lessonsRouter.put(
  '/:id',
  auth,
  permit('admin', 'teacher'),
  pdfUpload.single('document'),
  async (req, res, next) => {
    try {
      const lessonId = req.params.id;
      const { theme, video_link, course, number } = req.body;

      if (!lessonId) {
        return res.status(400).send({ error: 'Lesson id is required' });
      }

      const editedLesson: HydratedDocument<ILesson> | null =
        await Lesson.findById(lessonId);

      if (!editedLesson) {
        return res.status(404).send('Lesson is not found');
      }

      editedLesson.theme = theme;
      editedLesson.video_link = video_link;
      editedLesson.course = course;
      editedLesson.number = parseInt(number);

      if (req.file) {
        editedLesson.document = req.file.filename;
      }

      await editedLesson.save();

      return res.send({ message: 'Lesson is updated!', editedLesson });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.send(400).send(e);
      }
      return next(e);
    }
  },
);

lessonsRouter.delete(
  '/:id',
  auth,
  permit('admin', 'teacher'),
  async (req, res, next) => {
    try {
      const lessonId = req.params.id;

      if (!lessonId) {
        return res.status(400).send({ error: 'Lesson ID is required' });
      }

      const lesson = await Lesson.findByIdAndDelete(lessonId);

      if (!lesson) {
        return res.status(404).send('Lesson is not found');
      }

      return res.send({ message: 'Lesson is deleted' });
    } catch (e) {
      return next(e);
    }
  },
);
export default lessonsRouter;
