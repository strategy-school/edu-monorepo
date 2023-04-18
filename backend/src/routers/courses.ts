import express from 'express';
import Course from '../models/Course';
import mongoose, { HydratedDocument } from 'mongoose';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import { ICourse } from '../types';

const coursesRouter = express.Router();

coursesRouter.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({}, 'title duration');
    return res.send(courses);
  } catch (e) {
    return next(e);
  }
});

coursesRouter.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.sendStatus(404);
    }

    return res.send(course);
  } catch (e) {
    return next(e);
  }
});

coursesRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const course = await Course.create({
      title: req.body.title,
      description: req.body.description,
      price: parseFloat(req.body.price),
      type: req.body.type,
      duration: req.body.duration,
    });
    return res.send(course);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

coursesRouter.put('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const course: HydratedDocument<ICourse> | null = await Course.findById(
      req.params.id,
    );

    if (!course) {
      return res.sendStatus(404);
    }

    course.title = req.body.title;
    course.description = req.body.description;
    course.price = parseFloat(req.body.price);
    course.type = req.body.type;
    course.duration = req.body.duration;

    await course.save();
    return res.send(course);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

coursesRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Course.deleteOne({ _id: req.params.id });
    return res.send({ message: 'Deleted' });
  } catch (e) {
    return next(e);
  }
});

export default coursesRouter;
