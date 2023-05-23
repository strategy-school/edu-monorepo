import { Router } from 'express';
import { Error } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import Transaction from '../models/Transactions';
import { PageLimit, ITransaction, SearchParam, SwitchToString } from '../types';
import User from '../models/User';

type QueryParams = SwitchToString<ITransaction> & PageLimit;

const transactionsRouter = Router();

transactionsRouter.get('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { page, limit, ...params }: Partial<QueryParams> = req.query;
    const l: number = parseInt(limit as string) || 10;
    const p: number = parseInt(page as string) || 1;

    const searchParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .reduce<SearchParam>((acc, [key, value]) => {
        if (key === 'isPaid') {
          acc[key] = value as ITransaction['isPaid'];
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

    const totalCount = await Transaction.count(searchParam);
    const skip = (p - 1) * l;

    const transactions = await Transaction.find(searchParam)
      .populate('user', 'email firstName lastName phoneNumber')
      .populate('course', 'title price type level image')
      .sort([['createdAt', -1]])
      .skip(skip)
      .limit(l);

    return res.send({
      message: 'Transactions are found',
      result: { transactions, currentPage: p, totalCount },
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
        .populate('course', 'title price type level image exam')
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

transactionsRouter.get('/by-user/:id', auth, async (req, res, next) => {
  try {
    const userId = req.params.id;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ error: 'User not found!' });
    }

    const transactions = await Transaction.find({ user: userId })
      .populate('course', 'title price type level image exam')
      .populate('user', 'email firstName lastName phoneNumber');
    if (!transactions) {
      return res.status(404).send({ error: 'Transaction not found' });
    }

    return res.send(transactions);
  } catch (e) {
    return next(e);
  }
});

transactionsRouter.post('/', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const userId = req.body.user || user._id;
    const courseId = req.body.course;

    const transaction = await Transaction.create({
      user: userId,
      course: courseId,
      course_type: req.body.course_type,
    });

    await transaction.populate('course', 'title price type level image');
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
        .populate('course', 'title price type level image')
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
        .populate('course', 'title price type level image')
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
