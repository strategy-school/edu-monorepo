import mongoose from 'mongoose';

const Schema = mongoose.Schema;

enum Type {
  Seminar = 'seminar',
  Training = 'training',
  CourseType = 'course',
  MiniMBA = 'miniMBA',
}

const CourseSchema = new Schema({
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
  type: {
    type: String,
    required: true,
    enum: Type,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
