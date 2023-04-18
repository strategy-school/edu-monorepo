import mongoose, { Types } from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'There is no such user',
    },
  },
  info: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
  portfolio: {
    type: [String], //Предлагаю в дальнейшем обсудить и разбить портфолио на массив обьектов и придумать ключи по типу {workplace, duration, impact } итп
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);
export default Teacher;
