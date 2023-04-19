import { Router } from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Transaction from '../models/Transactions';

const transactionsRouter = Router();

transactionsRouter.get('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const userId = req.query.user as string;
    const courseId = req.query.course as string;
    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;

    const searchParam: { user?: string; course?: string } = {};

    if (userId) {
      searchParam.user = userId;
    }

    if (courseId) {
      searchParam.course = courseId;
    }

    const totalTransactionsCount = await Transaction.count(searchParam);
    const totalPages = Math.ceil(totalTransactionsCount / limit);

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(searchParam)
      .populate('user', 'email firstName lastName phoneNumber')
      .populate('course', 'title price type start_date end_date duration')
      .skip(skip)
      .limit(limit);

    return res.send({
      message: 'Transactions are found',
      result: { transactions, currentPage: page, totalPages },
    });
  } catch (e) {
    return next(e);
  }
});

transactionsRouter.get(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const transaction = await Transaction.findById(transactionId)
        .populate('course', 'title price type start_date end_date duration')
        .populate('user', 'email firstName lastName phoneNumber');

      if (!transaction) {
        return res.status(404).send({ error: 'Transaction is not found' });
      }

      return res.send({ message: 'Transaction is found', result: transaction });
    } catch (e) {
      return next(e);
    }
  },
);

transactionsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const courseId = req.body.course;

    const transaction = await Transaction.create({
      user: user._id,
      course: courseId,
    });

    await transaction.populate(
      'course',
      'title price type start_date end_date duration',
    );
    await transaction.populate('user', 'email firstName lastName phoneNumber');

    return res.send({ message: 'Transaction is created', result: transaction });
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

transactionsRouter.put(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const { user, course, isPaid } = req.body;

      if (!transactionId) {
        return res.status(404).send({ error: 'Transaction ID is required' });
      }

      const transaction = await Transaction.findByIdAndUpdate(
        transactionId,
        { user, course, isPaid },
        { new: true, runValidators: true },
      )
        .populate('course', 'title price type start_date end_date duration')
        .populate('user', 'email firstName lastName phoneNumber');

      if (!transaction) {
        return res.status(404).send('Transaction not found');
      }

      return res.send({
        message: 'Transaction is updated',
        result: transaction,
      });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

transactionsRouter.patch(
  '/:id/markAsPaid',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const transactionId = req.params.id;

      if (!transactionId) {
        return res.status(404).send({ error: 'Transaction ID is required' });
      }

      const transaction = await Transaction.findById(transactionId)
        .populate('course', 'title price type start_date end_date duration')
        .populate('user', 'email firstName lastName phoneNumber');

      if (!transaction) {
        return res.status(404).send({ error: 'Transaction not found' });
      }

      transaction.isPaid = 'paid';

      await transaction.save();

      return res.send({
        message: 'Transaction is marked as paid',
        result: transaction,
      });
    } catch (e) {
      if (e instanceof Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

transactionsRouter.delete(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const transactionId = req.params.id;

      if (!transactionId) {
        return res.status(400).send({ error: 'Transaction ID is required' });
      }

      const transaction = await Transaction.findByIdAndDelete(transactionId);

      if (!transaction) {
        return res.status(404).send({ error: 'Transaction is not found' });
      }

      return res.send({ message: 'Task is deleted' });
    } catch (e) {
      return next(e);
    }
  },
);

export default transactionsRouter;
