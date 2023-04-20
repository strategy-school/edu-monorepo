import { model, Schema, Types } from 'mongoose';
import { ITransaction } from '../types';
import Course from './Course';
import User from './User';

const TransactionSchema = new Schema<ITransaction>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => await User.findById(value),
        message: 'User does not exist',
      },
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) =>
          await Course.findById(value),
        message: 'Course does not exist',
      },
    },
    isPaid: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
      required: true,
    },
  },
  { timestamps: true },
);

const Transaction = model<ITransaction>('Transaction', TransactionSchema);
export default Transaction;
