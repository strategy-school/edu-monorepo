import mongoose, { Types } from 'mongoose';
import Course from './Course';

const Schema = mongoose.Schema;
const GroupSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    startsAt: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    telegramLink: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Group = mongoose.model('Group', GroupSchema);
export default Group;
