import mongoose, { Types } from 'mongoose';
import Course from './Course';

const Schema = mongoose.Schema;

const TestSchema = new Schema(
  {
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
    title: String,
    description: String,
    questions: {
      type: [
        {
          question: {
            type: String,
            required: true,
          },
          answers: {
            type: [String],
            required: true,
          },
          correctAnswer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Test = mongoose.model('Test', TestSchema);

export default Test;
