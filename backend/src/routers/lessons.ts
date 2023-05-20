import { Router } from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { Error } from 'mongoose';
import Lesson from '../models/Lesson';
import { ILesson, PageLimit, Search } from '../types';
import { pdfUpload } from '../multer';

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
    const { page, limit, ...params }: QueryParams = req.query;
    const p: number = page ? parseInt(page) : 1;
    const l: number = limit ? parseInt(limit) : 10;

    const totalCount = await Lesson.count(params);
    const skip = (p - 1) * l;

    const lessons = await Lesson.find(params)
      .populate('course', 'title price type level image')
      .skip(skip)
      .limit(l);

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
  async (req, res, next) => {
    try {
      const lessonId = req.params.id;
      const { theme, video_link, document, course } = req.body;

      if (!lessonId) {
        return res.status(400).send({ error: 'Lesson id is required' });
      }

      const lesson = await Lesson.findByIdAndUpdate(
        lessonId,
        {
          theme,
          video_link,
          document,
          course,
        },
        { new: true, runValidators: true },
      ).populate('course', 'title price type level image');

      if (!lesson) {
        return res.status(404).send('Lesson is not found');
      }

      return res.send({ message: 'Lesson is found', result: lesson });
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
