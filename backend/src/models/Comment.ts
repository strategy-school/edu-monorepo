import { model, Schema, Types } from 'mongoose';
import User from './User';
import Course from './Course';
import { IComment } from '../types';

const CommentSchema = new Schema<IComment>(
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
    rating: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Comment = model<IComment>('Comment', CommentSchema);
export default Comment;
