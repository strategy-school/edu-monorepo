import { model, Schema, Types } from 'mongoose';
import { ILesson } from '../types';
import Course from './Course';

const LessonSchema = new Schema<ILesson>({
  theme: {
    type: String,
    required: true,
  },
  video_link: String,
  document: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Course.findById(value),
      message: 'Course does not exist',
    },
  },
  number: {
    type: Number,
    required: true,
  },
});

const Lesson = model<ILesson>('Lesson', LessonSchema);
export default Lesson;
