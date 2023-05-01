import express from 'express';
import Course from '../models/Course';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { ICourse } from '../types';
import { imageUpload } from '../multer';
import { promises as fs } from 'fs';

const coursesRouter = express.Router();

interface CourseSearchParam {
  level?: string;
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

coursesRouter.get('/', async (req, res, next) => {
  try {
    const level = req.query.level as string;
    const category = req.query.category as string;
    const minPrice = req.query.minPrice as string;
    const maxPrice = req.query.maxPrice as string;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const searchParam: CourseSearchParam = {};

    if (level) {
      searchParam.level = level;
    }

    if (category) {
      searchParam.category = category;
    }

    if (minPrice || maxPrice) {
      searchParam.price = {
        ...(searchParam.price || {}),
        $gte: parseFloat(minPrice),
        $lte: parseFloat(maxPrice),
      };
    }

    const totalCount = await Course.count(searchParam);
    const skip = (page - 1) * limit;

    const courses = await Course.find(searchParam, 'title duration image')
      .skip(skip)
      .limit(limit);

    return res.send({
      message: 'Courses are found',
      result: { courses, currentPage: page, totalCount },
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
    await Course.deleteOne({ _id: req.params.id });
    return res.send({ message: 'Deleted' });
  } catch (e) {
    return next(e);
  }
});

export default coursesRouter;
