import mongoose, { Types } from 'mongoose';
import Category from './Category';

const Schema = mongoose.Schema;

const TestSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: {
        async validator(value: Types.ObjectId) {
          const existingCategory = await Category.findById(value);
          if (!existingCategory) {
            throw new Error('Курс не найден');
          }
        },
      },
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
