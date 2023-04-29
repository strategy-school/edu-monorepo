import mongoose, { Types } from 'mongoose';
import Course from './Course';
const Schema = mongoose.Schema;

const TestSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
      unique: true,
      validate: {
        async validator(value: Types.ObjectId) {
          const existingTest = await Test.findOne({ course: value });
          if (existingTest) {
            throw new Error('Такой тест уже существует');
          }

          const existingCourse = await Course.findById(value);
          if (!existingCourse) {
            throw new Error('Курс не найден');
          }
        },
      },
    },
    title: String,
    description: String,
    questions: [
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
  { timestamps: true },
);

const Test = mongoose.model('Test', TestSchema);

export default Test;
