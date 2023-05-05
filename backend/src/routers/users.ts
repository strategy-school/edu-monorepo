import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import User from '../models/User';
import { imageUpload } from '../multer';
import config from '../config';
import { downloadFile } from '../helper';
import { randomUUID } from 'crypto';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import * as crypto from 'crypto';
import nodemailer from 'nodemailer';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
      avatar: req.file ? req.file.filename : null,
    });

    user.generateToken();
    await user.save();
    return res.send({ message: 'Registered successfully!', user });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/sessions', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).send({ error: 'Email не найден!' });
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({ error: 'Неверный email и/или пароль' });
  }

  try {
    user.generateToken();
    await user.save();
    return res.send({ message: 'Email and password correct!', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = { message: 'OK' };

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();
    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({ error: 'Wrong Google token!' });
    }

    const email = payload['email'];
    const googleId = payload['sub'];
    const firstName = payload['given_name'];
    const lastName = payload['family_name'];
    const avatarUrl = payload['picture'];

    if (!email) {
      return res.status(400).send({ error: 'Not enough user data' });
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      const avatar =
        'images/' + (await downloadFile(avatarUrl as string, 'images'));

      user = new User({
        email,
        password: randomUUID(),
        firstName,
        lastName,
        avatar,
        googleId,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch(
  '/',
  auth,
  imageUpload.single('avatar'),
  async (req, res, next) => {
    try {
      const { user } = req as RequestWithUser;

      if (!user) {
        return res
          .status(500)
          .send({ error: 'Учетная запись пользователя не найдена!' });
      }

      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      if (req.file) {
        user.avatar = req.file.filename;
      }

      await user.save();

      return res.send({
        message: 'Информация пользователя обновлена!',
        user,
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

usersRouter.get('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const { role, email, firstName, lastName, phoneNumber, isBanned } =
      req.query;
    const page: number = parseInt(req.query.page as string) || 1;
    const limit: number = parseInt(req.query.limit as string) || 10;

    const searchParam: {
      role?: string;
      email?: string;
      firstName?: string;
      lastName?: string;
      phoneNumber?: string;
      isBanned?: boolean;
    } = {};

    if (role) {
      searchParam.role = role as string;
    }

    if (email) {
      searchParam.email = email as string;
    }

    if (firstName) {
      searchParam.firstName = firstName as string;
    }

    if (lastName) {
      searchParam.lastName = lastName as string;
    }

    if (phoneNumber) {
      searchParam.phoneNumber = phoneNumber as string;
    }

    if (isBanned) {
      searchParam.isBanned = Boolean(parseInt(isBanned as string));
    }

    const totalCount = await User.count(searchParam);
    const skip = (page - 1) * limit;

    const users = await User.find(searchParam).skip(skip).limit(limit);

    if (users.length === 0) {
      return res.status(500).send({ error: 'Пользователи не найдены!' });
    }

    return res.send({
      message: 'Users are found',
      result: { users, currentPage: page, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/basic/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const user = await User.findOne({ role: 'user', _id: req.params.id });
    if (!user) {
      return res.status(500).send({ error: 'Студент не найден!' });
    }
    return res.send(user);
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch(
  '/isBanned/:id',
  auth,
  permit('admin'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(500).send({ error: 'Пользователь не найден!' });
      }
      user.isBanned = !user.isBanned;
      await user.save();
      return res.send({
        message: `Статус 'isBanned' обновлен на ${user.isBanned}`,
        user,
      });
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

usersRouter.post('/change-password', auth, async (req, res, next) => {
  try {
    const { user } = req as RequestWithUser;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const isMatch = await user.checkPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).send({ error: 'Текущий пароль указан неверно' });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .send({ error: 'Пароль подтверждения не совпадает с новым паролем' });
    }

    user.password = newPassword;
    await user.generateToken();
    await user.save();
    return res.send({
      message: 'Password has been changed successfully',
      result: user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});
usersRouter.post('/forgot-password', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const generateRandomString = () => {
      return crypto.randomBytes(4).toString('hex');
    };

    const token = generateRandomString();
    user.resetPasswordToken = token;
    await user.save();

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
      to: user.email,
      subject: 'Password reset request',
      html: `
    <div style="font-family: Arial, sans-serif; font-size: 14px;">
      <p>Дорогой/ая ${user.firstName},</p>
      <p>Команда Strategia School получила ваш запрос на сброс пароля. Пройдите по нижеуказанной ссылке для сброса пароля.</p>
       <p><a href="${process.env.APP_URL}/reset-password/${token}" target="_blank" rel="noopener noreferrer">${process.env.APP_URL}/reset-password/${token}</a></p>

      <p>Если вы не отправляли вышеуказанный запрос, пожалуйста, проигнорируйте это сообщение.</p>
      <p style="margin-top: 20px">С уважением,</p>
      <p style="font-weight: bold">Команда Strategia School</p>
    </div> `,
    };

    await transporter.sendMail(mailOptions);

    return res.send({
      message: 'Запрос на сброс пароля отправлен',
      result: user,
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

usersRouter.post('/reset-password/:token', async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
    });

    if (!user) {
      return res.status(404).send({ message: 'Неверный токен' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    await user.generateToken();
    await user.save();

    return res.status(200).send({ message: 'Пароль обновлен!' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    return next(e);
  }
});

export default usersRouter;
