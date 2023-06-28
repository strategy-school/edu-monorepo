import mongoose, { Types } from 'mongoose';
import { ICourse } from '../types';
import Category from './Category';

const Schema = mongoose.Schema;

enum Type {
  Seminar = 'seminar',
  Training = 'training',
  CourseType = 'course',
  MiniMBA = 'miniMBA',
}

enum Level {
  WithoutLevel = 'without level',
  Basic = 'basic',
  Professional = 'professional',
  Managerial = 'managerial',
}

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) =>
          await Category.findById(value),
        message: 'Category does not exist',
      },
    },
    theme: String,
    targetAudience: String,
    programGoal: String,
    level: {
      type: String,
      required: true,
      enum: Level,
    },
    type: {
      type: String,
      required: true,
      enum: Type,
    },
    duration: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    exam: {
      type: String,
    },
    youtube: {
      type: Boolean,
      required: true,
    },
    zoom: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

const Course = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
