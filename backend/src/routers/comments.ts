import express from 'express';
import Comment from '../models/Comment';
import auth, { RequestWithUser } from '../middleware/auth';
import { Error, HydratedDocument } from 'mongoose';
import Transaction from '../models/Transactions';
import { IComment, ITransaction } from '../types';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;
    const course = req.query.course as string;
    const searchParam: { course?: string } = {};

    if (course) {
      searchParam.course = course;
    }

    const skip = (page - 1) * limit;

    const comments = await Comment.find(searchParam)
      .populate('user', 'firstName lastName')
      .skip(skip)
      .limit(limit);

    return res.send(comments);
  } catch (e) {
    return next(e);
  }
});

commentsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const transaction: HydratedDocument<ITransaction> | null =
      await Transaction.findOne({ user: user._id, course: req.body.course });

    if (
      !(transaction && transaction.isPaid === 'paid') &&
      user.role !== 'admin'
    ) {
      return res.status(403).send({
        error:
          'Вы не можете отправить комментарий, так как вы не покупали этот курс!',
      });
    }

    const comment = await Comment.create({
      user: user._id,
      course: req.body.course,
      rating: req.body.rating,
      text: req.body.text,
    });

    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

commentsRouter.put('/:id', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const comment: HydratedDocument<IComment> | null = await Comment.findById(
      req.params.id,
    );

    if (!comment) {
      return res.sendStatus(404);
    }

    if (comment.user.toString() !== user._id.toString()) {
      return res
        .status(403)
        .send({ error: 'Вы не можете изменить не свой комментарий!' });
    }

    comment.rating = req.body.rating;
    comment.text = req.body.text;

    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

commentsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const comment: HydratedDocument<IComment> | null = await Comment.findById(
      req.params.id,
    );

    if (!comment) {
      return res.sendStatus(404);
    }

    if (
      comment.user.toString() !== user._id.toString() &&
      user.role !== 'admin'
    ) {
      return res
        .status(403)
        .send({ error: 'Вы не можете удалить не свой комментарий!' });
    }

    await Comment.deleteOne({ _id: req.params.id });
    return res.send({ message: 'Удалено' });
  } catch (e) {
    return next(e);
  }
});

export default commentsRouter;
