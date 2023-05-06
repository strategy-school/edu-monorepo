import express from 'express';
import Test from '../models/Test';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';

const testsRouter = express.Router();

testsRouter.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { category, title, description, questions } = req.body;

    const test = await Test.create({
      category,
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
    const result = await Test.findById(req.params.id).populate(
      'category',
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

testsRouter.get('/category/:id', async (req, res) => {
  try {
    const result = await Test.find({ category: req.params.id })
      .select('title  category')
      .populate('category', 'title');
    if (!result) {
      return res.status(404).send({ error: 'Тесты не найдены!' });
    }
    return res.send(result);
  } catch {
    return res.sendStatus(500);
  }
});

testsRouter.get('/', async (req, res) => {
  try {
    const userId = req.query.user as string;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const searchParam: { user?: string } = {};

    if (userId) {
      searchParam.user = userId;
    }

    const totalCount = await Test.count(searchParam);
    const skip = (page - 1) * limit;

    const tests = await Test.find(searchParam)
      .select('title  category')
      .populate('category', 'title')
      .skip(skip)
      .limit(limit)
      .exec();

    return res.send({
      message: 'Тесты найдены',
      result: { tests, currentPage: page, totalCount },
    });
  } catch {
    return res.sendStatus(500);
  }
});

testsRouter.patch('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, title, description, questions } = req.body;

    const test = await Test.findByIdAndUpdate(
      id,
      {
        category,
        title,
        description,
        questions,
      },
      { new: true },
    );

    if (!test) {
      return res.status(404).send({
        message: 'Тест не найден',
      });
    }

    return res.send({
      message: 'Тест успешно обновлен!',
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

testsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);

    if (!test) {
      return res.status(404).send({ message: 'Тест не найден' });
    }

    return res.send({ message: 'Тест успешно удален!', test });
  } catch (e) {
    return next(e);
  }
});

export default testsRouter;
