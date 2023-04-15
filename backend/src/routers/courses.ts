import express from 'express';
import Course from '../models/Course';
import mongoose from 'mongoose';

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

coursesRouter.post(
  '/',
  /*permit*/ async (req, res, next) => {
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
  },
);

export default coursesRouter;
