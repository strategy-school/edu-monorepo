import express from 'express';
import Notification from '../models/Notification';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const notificationsRouter = express.Router();

notificationsRouter.get('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const limit: number = parseInt(req.query.limit as string) || 10;
    const page: number = parseInt(req.query.page as string) || 1;
    const totalCount = await Notification.count();
    const skip = (page - 1) * limit;

    const notifications = await Notification.find().skip(skip).limit(limit);

    return res.send({
      message: 'Notifications are found',
      result: { notifications, currentPage: page, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

notificationsRouter.get(
  '/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const notification = Notification.findById(req.params.id);

      return res.send(notification);
    } catch (e) {
      return next(e);
    }
  },
);

notificationsRouter.post('/', async (req, res, next) => {
  try {
    const notification = await Notification.create({
      name: req.body.name,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.VERIFY_EMAIL_USER,
        pass: process.env.VERIFY_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"Strategia School" <do-not-reply@strategia.school>',
      to: 'admin@gmail.com', //здесь будет рабочая почта администратора
      subject: 'New notification',
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 14px;">
      <p>Дорогой/ая Admin,</p>
      <p>Мы получили запрос от пользователя ${notification.name}</p>
      <p>Электронная почта: ${notification.email}, телефон: ${notification.phoneNumber}</p>
      <p>Пожалуйста, свяжитесь с пользователем. Он ждет вашего ответа</p>
      <p style="margin-top: 20px">С уважением,</p>
      <p style="font-weight: bold">Команда Strategia School</p>
    </div> `,
    };

    await transporter.sendMail(mailOptions);

    return res.send(notification);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

notificationsRouter.patch(
  '/:id/toggleIsChecked',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const currentNotification = await Notification.findById(req.params.id);

      if (!currentNotification) {
        return res.status(404).send({ error: 'Notification not found' });
      }

      if (!currentNotification.isChecked) {
        await Notification.updateOne(
          { _id: req.params.id },
          { $set: { isChecked: true } },
        );
      } else {
        await Notification.updateOne(
          { _id: req.params.id },
          { $set: { isChecked: false } },
        );
      }

      return res.send({
        message: `isChecked status was change into ${currentNotification.isChecked}`,
        currentNotification,
      });
    } catch (e) {
      return next(e);
    }
  },
);

export default notificationsRouter;
