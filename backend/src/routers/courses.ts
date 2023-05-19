import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Course from '../models/Course';
import Transaction from '../models/Transactions';
import { imageUpload } from '../multer';
import { promises as fs } from 'fs';
import { ICourse, PageLimit, SearchParam, SwitchToString } from '../types';

type QueryParams = SwitchToString<
  Pick<
    ICourse,
    | 'title'
    | 'description'
    | 'type'
    | 'theme'
    | 'targetAudience'
    | 'programGoal'
    | 'level'
    | 'isDeleted'
    | 'category'
  > &
    PageLimit
>;

const coursesRouter = express.Router();

coursesRouter.get('/', async (req, res, next) => {
  try {
    const { page, limit, ...params }: QueryParams = req.query;

    const l: number = parseInt(limit as string) || 10;
    const p: number = parseInt(page as string) || 1;

    const searchParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .reduce<SearchParam>((acc, [key, value]) => {
        if (
          [
            'title',
            'description',
            'type',
            'theme',
            'targetAudience',
            'programGoal',
          ].includes(key)
        ) {
          acc[key] = { $regex: value, $options: 'i' };
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

    const totalCount = await Course.count(searchParam);
    const skip = (p - 1) * l;

    const courses = await Course.find(searchParam, 'title duration image')
      .skip(skip)
      .limit(l);

    return res.send({
      message: 'Courses are found',
      result: { courses, currentPage: p, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'category',
      'title',
    );

    if (!course) {
      return res.sendStatus(404);
    }

    return res.send(course);
  } catch (e) {
    return next(e);
  }
});

coursesRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        theme: req.body.theme,
        targetAudience: req.body.targetAudience,
        programGoal: req.body.programGoal,
        level: req.body.level,
        price: parseFloat(req.body.price),
        type: req.body.type,
        duration: req.body.duration,
        image: req.file ? req.file.filename : null,
        exam: req.body.exam ? req.body.exam : null,
        youtube: req.body.youtube,
        zoom: req.body.zoom,
      });
      return res.send(course);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

coursesRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imageUpload.single('image'),
  async (req, res, next) => {
    try {
      const course: HydratedDocument<ICourse> | null = await Course.findById(
        req.params.id,
      );

      if (!course) {
        return res.sendStatus(404);
      }

      course.title = req.body.title;
      course.description = req.body.description;
      course.theme = req.body.theme;
      course.targetAudience = req.body.targetAudience;
      course.programGoal = req.body.programGoal;
      course.level = req.body.level;
      course.price = parseFloat(req.body.price);
      course.type = req.body.type;
      course.duration = req.body.duration;
      course.exam = req.body.exam;
      course.youtube = req.body.youtube;
      course.zoom = req.body.zoom;

      if (req.file) {
        course.image = req.file.filename;
      }

      await course.save();
      return res.send(course);
    } catch (e) {
      if (req.file) {
        await fs.unlink(req.file.path);
      }

      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

coursesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const removingCourse = await Course.findById(req.params.id);
    const relatedTransactions = await Transaction.find({
      course: req.params.id,
    });

    if (!removingCourse) {
      return res.status(404).send({ error: 'Course not found' });
    } else if (relatedTransactions.length) {
      return res.status(403).send({
        error: 'Courses having related transactions cannot be removed',
      });
    } else {
      await Course.deleteOne({ _id: req.params.id });
      return res.send({ message: 'Deleted' });
    }
  } catch (e) {
    return next(e);
  }
});

coursesRouter.patch(
  '/:id/toggleIsDeleted',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const currentCourse = await Course.findById(req.params.id);
      if (!currentCourse) {
        return res.status(404).send({ error: 'Course not found' });
      }

      if (!currentCourse.isDeleted) {
        await Course.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: true } },
        );
      } else {
        await Course.updateOne(
          { _id: req.params.id },
          { $set: { isDeleted: false } },
        );
      }

      return res.send({
        message: `isDeleted status was updated for ${currentCourse.isDeleted}`,
        currentCourse,
      });
    } catch (e) {
      return next(e);
    }
  },
);

export default coursesRouter;
