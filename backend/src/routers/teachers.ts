import express from 'express';
import { imageUpload } from '../multer';
import permit from '../middleware/permit';
import Teacher from '../models/Teacher';
import mongoose from 'mongoose';
import User from '../models/User';
import auth from '../middleware/auth';

const teachersRouter = express.Router();

teachersRouter.post(
  '/',
  auth,
  permit('admin'),
  imageUpload.single('photo'),
  async (req, res, next) => {
    try {
      const existingTeacher = await Teacher.findOne({
        user_id: req.body.user_id,
      });
      if (existingTeacher) {
        return res
          .status(500)
          .send({ error: 'Преподаватель с данным id уже существует' });
      }
      const user = await User.findById(req.body.user);
      if (!user) {
        return res.status(500).send({ error: 'Пользователь не найден!' });
      }
      user.role = 'teacher';
      await user.save();

      const teacher = await Teacher.create({
        user: req.body.user_id,
        info: req.body.info,
        photo: req.file ? req.file.filename : null,
        portfolio: req.body.portfolio,
      });

      return res.send({
        message: 'Учетная запись преподавателя создана!',
        teacher,
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

teachersRouter.get('/', async (req, res) => {
  try {
    const results = await Teacher.find()
      .populate('user', 'firstName lastName')
      .select('user photo')
      .exec();
    return res.send(results);
  } catch {
    return res.sendStatus(500);
  }
});

teachersRouter.get('/:id', async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('user', 'firstName lastName')
      .exec();
    if (!teacher) {
      return res
        .status(500)
        .send({ error: 'Учетная запись преподавателя не найдена!' });
    }
    return res.send(teacher);
  } catch (e) {
    return next(e);
  }
});

teachersRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res
        .status(500)
        .send({ error: 'Учетная запись преподавателя не найдена!' });
    }

    const removedTeacher = await teacher.deleteOne();
    res.send({
      message: 'Учетная запись преподавателя удалена',
      removedTeacher,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

teachersRouter.put(
  '/:id',
  auth,
  permit('admin', 'teacher'),
  imageUpload.single('photo'),
  async (req, res, next) => {
    try {
      const teacherId = req.params.id;
      const updatedTeacher = await Teacher.findById(teacherId);

      if (!updatedTeacher) {
        return res
          .status(500)
          .send({ error: 'Учетная запись преподавателя не найдена!' });
      }

      updatedTeacher.info = req.body.info || updatedTeacher.info;
      updatedTeacher.portfolio = req.body.portfolio || updatedTeacher.portfolio;
      if (req.file) {
        updatedTeacher.photo = req.file.filename;
      }

      await updatedTeacher.save();

      return res.send({
        message: 'Информация преподавателя обновлена!',
        teacher: updatedTeacher,
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  },
);

export default teachersRouter;
