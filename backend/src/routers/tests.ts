import express from 'express';
import Test from '../models/Test';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Course from '../models/Course';
import mongoose from 'mongoose';

const testsRouter = express.Router();

testsRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { course, title, description, questions } = req.body;

    const test = await Test.create({
      course,
      title,
      description,
      questions,
    });

    return res.send({
      message: 'Тест успешно создан!',
      test,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

testsRouter.get('/:id', async (req, res) => {
  try {
    const result = await Test.findOne({ course: req.params.id }).populate(
      'course',
      'title',
    );
    if (!result) {
      return res.status(404).send({ error: 'Тест не найден!' });
    }
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

export default testsRouter;
