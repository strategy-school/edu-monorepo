import * as crypto from 'crypto';
import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import config from '../config';
import { downloadFile } from '../helper';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import nodemailer from 'nodemailer';
import User from '../models/User';
import { imageUpload } from '../multer';
import { IUser, PageLimit, SearchParam, SwitchToString } from '../types';
import validate from 'deep-email-validator';
import path from 'path';
import fs from 'fs';
import constants, { REGEX_PASSWORD } from '../constants';

type QueryParams = SwitchToString<
  Pick<
    IUser,
    'email' | 'role' | 'firstName' | 'lastName' | 'phoneNumber' | 'isBanned'
  >
> &
  PageLimit;

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

const sendEmail = async (email: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
      user: config.emailData.emailUser,
      pass: config.emailData.emailVerifyPass,
    },
  });

  const mailOptions = {
    from: `"Strategia School" <do-not-reply@strategia.school>`,
    to: email,
    subject: subject,
    html: html,
  };

  await transporter.sendMail(mailOptions);
};

usersRouter.post('/', imageUpload.single('avatar'), async (req, res, next) => {
  try {
    const token = crypto.randomBytes(4).toString('hex');
    const user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
      avatar: req.file ? req.file.filename : null,
      verifyEmailToken: token,
    });

    user.generateToken();
    await user.save();

    await sendEmail(
      req.body.email,
      'Подтверджение почты',
      constants.EMAIL_VERIFICATION(token, req.body.firstName),
    );

    return res.send({ message: 'Registered successfully!' });
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

  if (!user.verified) {
    const token = crypto.randomBytes(4).toString('hex');
    user.verifyEmailToken = token;
    await user.save();
    await sendEmail(
      req.body.email,
      'Подтверджение почты',
      constants.EMAIL_VERIFICATION(token, user.firstName),
    );
    return res.status(400).send({
      error: 'Email не подтвержден, на вашу почту было выслано письмо!',
    });
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
        password: crypto.randomUUID(),
        firstName,
        lastName,
        avatar,
        googleId,
        phoneNumber: null,
      });
    }

    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Google successful', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/telegram', async (req, res, next) => {
  try {
    let user = await User.findOne({ telegramId: req.body.telegramId });

    if (!user) {
      let avatar = null;
      if (req.body.avatar) {
        avatar =
          'images/' + (await downloadFile(req.body.avatar as string, 'images'));
      }

      user = new User({
        email: crypto.randomUUID() + '@test.com',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: crypto.randomUUID(),
        avatar,
        telegramId: req.body.telegramId,
        telegramUsername: req.body.telegramUsername,
        isTelegramUpdated: false,
        phoneNumber: null,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Telegram successful', user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.patch('/telegram/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({ telegramId: req.params.id });
    const token = crypto.randomBytes(4).toString('hex');

    if (!user) {
      return res.status(400).send({ error: 'Пользователь не найден!' });
    }

    if (!req.body.email) {
      return res
        .status(400)
        .send({ error: 'Поле email является обязательным!' });
    }

    if (!user.lastName && !req.body.lastName) {
      return res
        .status(400)
        .send({ error: 'Поле фамилию является обязательным!' });
    }

    const emailValid = await validate(req.body.email);
    if (!emailValid.valid) {
      return res
        .status(400)
        .send({ error: 'Некорректный адрес электронной почты' });
    }

    user.email = req.body.email;
    user.lastName = req.body.lastName;
    user.isTelegramUpdated = true;
    user.verifyEmailToken = token;

    await sendEmail(
      req.body.email,
      'Подтверджение почты',
      constants.EMAIL_VERIFICATION(token, user.firstName),
    );

    await user.save();
    return res.send({ message: 'Telegram login updated successful', user });
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
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      if (req.file) {
        if (user.avatar) {
          const imagePath = path.join(config.publicPath, user.avatar);
          fs.unlink(imagePath, (err) => {
            if (err) {
              console.error('Error removing avatar:', err);
            }
          });
        }
        user.avatar = req.file.filename;
      }

      if (req.body.email) {
        user.newEmail = req.body.email;
        const token = crypto.randomBytes(4).toString('hex');
        user.verifyEmailToken = token;

        await sendEmail(
          req.body.email,
          'Подтверджение новой почты',
          constants.EMAIL_NEW_VERIFICATION(
            token,
            user.firstName,
            user.email,
            req.body.email,
          ),
        );
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
    const { page, limit, ...params }: Partial<QueryParams> = req.query;
    const p: number = parseInt(page as string) || 1;
    const l: number = parseInt(limit as string) || 10;

    const searchParam = Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .reduce<SearchParam>((acc, [key, value]) => {
        if (['lastName', 'firstName', 'email'].includes(key)) {
          acc[key] = { $regex: value, $options: 'i' };
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});

    const totalCount = await User.count(searchParam);
    const skip = (p - 1) * l;

    const users = await User.find(searchParam).skip(skip).limit(l);

    if (users.length === 0) {
      return res.status(500).send({ error: 'Пользователи не найдены!' });
    }

    return res.send({
      message: 'Users are found',
      result: { users, currentPage: p, totalCount },
    });
  } catch (e) {
    return next(e);
  }
});

usersRouter.get('/me', auth, async (req, res, next) => {
  try {
    const { user } = <RequestWithUser>req;

    return res.send({
      message: 'User found',
      result: user,
    });
  } catch (error) {
    return next();
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

    if (!REGEX_PASSWORD.test(newPassword)) {
      return res.status(400).send({
        error:
          'Пароль должен содержать минимум 8 символов, из них минимум 1 букву и 1 цифру.',
      });
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
      return res.status(400).send({ error: 'Email адрес не найден' });
    }

    const token = crypto.randomBytes(4).toString('hex');
    user.resetPasswordToken = token;
    await user.save();

    await sendEmail(
      user.email,
      'Сброс пароля',
      constants.EMAIL_FORGOT_PASS(user.firstName, token),
    );

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
      return res.status(404).send({ error: 'Неверный токен' });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ error: 'Пароль подтверждения не совпадает с новым паролем' });
    }

    if (!REGEX_PASSWORD.test(req.body.newPassword)) {
      return res.status(400).send({
        error:
          'Пароль должен содержать минимум 8 символов, из них минимум 1 букву и 1 цифру.',
      });
    }

    user.password = req.body.newPassword;
    user.resetPasswordToken = null;
    user.verified = true;
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

usersRouter.post('/verify-email/:token', async (req, res, next) => {
  try {
    const user = await User.findOne({
      verifyEmailToken: req.params.token,
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: 'Неверный токен, вам было выслан новое' });
    }

    if (user.newEmail) {
      user.email = user.newEmail;
      user.newEmail = null;
    }

    user.verified = true;
    user.verifyEmailToken = null;
    user.generateToken();
    await user.save();
    return res
      .status(200)
      .send({ message: 'Почта успешно подтверждена!', user });
  } catch (e) {
    return next(e);
  }
});
usersRouter.patch('/remove-avatar', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.avatar) {
      const imagePath = path.join(config.publicPath, user.avatar);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error removing avatar:', err);
        }
      });

      user.avatar = null;
      await user.save();
    }

    return res.send({ message: 'Avatar removed successfully!', user });
  } catch (error) {
    return next(error);
  }
});

usersRouter.patch(
  '/add-avatar',
  auth,
  imageUpload.single('avatar'),

  async (req, res, next) => {
    try {
      const user = (req as RequestWithUser).user;

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      user.avatar = req.file ? req.file.filename : null;
      await user.save();

      return res.send({ message: 'Avatar uploaded successfully!', user });
    } catch (error) {
      return next(error);
    }
  },
);

export default usersRouter;
