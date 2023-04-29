import express from 'express';
import Test from '../models/Test';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import Course from '../models/Course';

const testsRouter = express.Router();

testsRouter.post('/', auth, permit('admin'), async (req, res) => {
  try {
    const { course, title, description, questions } = req.body;

    const existingCourse = await Course.findById(course);

    if (!existingCourse) {
      return res.status(500).send({ error: 'Курс не найден!' });
    }

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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default testsRouter;
