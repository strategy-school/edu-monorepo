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
import { PageLimit, IUser, SearchParam, SwitchToString } from '../types';

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
      user: process.env.VERIFY_EMAIL_USER,
      pass: process.env.VERIFY_EMAIL_PASS,
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
      `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table class="m_67968070139110097mail-sections" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${req.body.firstName}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Вы зарегистрировали аккаунт на Strategy School. Прежде чем начать пользоваться своей учетной записью, Вам необходимо подтвердить, что это Ваш адрес электронной почты, нажав на кнопку:
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><a rel="noopener noreferrer" href="${process.env.APP_URL}/verify-email/${token}" style="margin-top:0;margin-bottom:0;color:white;text-decoration:none;display:inline-block;font-size:16px;font-weight:400;line-height:24px;text-transform:initial;letter-spacing:initial;background-color:#008060;border-radius:4px;padding:0;border-color:#008060;border-style:solid;border-width:10px 20px" target="_blank">Подтвердить email</a></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`,
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
      `<div style="height:100%;width:100%;font-size:14px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;color:#202223;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Segoe UI,Roboto,Helvetica Neue,sans-serif;margin:0;padding:0">
      <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0">
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
        <td style="margin-top:0;margin-bottom:0;width:470px;padding:0;border-width:0"><table style="width:100%;border-collapse:initial;border-spacing:0;max-width:470px;text-align:left;border-radius:8px;overflow:hidden;margin:32px auto 0;padding:0;border:1px solid #c9cccf"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><table class="m_67968070139110097mail-sections" style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:20px;border-width:0">
          <table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody><tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0 0 20px;border-width:0"><table style="width:100%;border-collapse:collapse;border-spacing:0;margin-top:0;margin-bottom:0;padding:0"><tbody>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"><h1 style="margin-top:0;margin-bottom:0;font-size:16px;font-weight:600;line-height:24px;text-transform:initial;letter-spacing:initial;padding:0">
            Здравствуйте, ${user.firstName}
          </h1></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><h2 style="margin-top:0;margin-bottom:0;font-size:15px;font-weight:400;line-height:20px;text-transform:initial;letter-spacing:initial;padding:0">
            Вы зарегистрировали аккаунт на Strategy School. Прежде чем начать пользоваться своей учетной записью, Вам необходимо подтвердить, что это Ваш адрес электронной почты, нажав на кнопку:
          </h2></td></tr>
          <tr style="margin-top:0;margin-bottom:0;padding:0"><td style="margin-top:0;margin-bottom:0;padding:16px 0 0;border-width:0"><a rel="noopener noreferrer" href="${process.env.APP_URL}/verify-email/${token}" style="margin-top:0;margin-bottom:0;color:white;text-decoration:none;display:inline-block;font-size:16px;font-weight:400;line-height:24px;text-transform:initial;letter-spacing:initial;background-color:#008060;border-radius:4px;padding:0;border-color:#008060;border-style:solid;border-width:10px 20px" target="_blank">Подтвердить email</a></td></tr>
          </tbody></table></td></tr></tbody></table>
        </td></tr></tbody></table></td></tr></tbody></table></td>
        <td style="margin-top:0;margin-bottom:0;padding:0;border-width:0"></td>
      </tr>
        </tbody>
      </table>
    </div>`,
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
      const avatar =
        'images/' + (await downloadFile(req.body.avatar as string, 'images'));

      user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: crypto.randomUUID(),
        avatar,
        telegramId: req.body.telegramId,
        verified: true,
      });
    }
    user.generateToken();
    await user.save();
    return res.send({ message: 'Login with Telegram successful', user });
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
      return res.status(400).send({ error: 'Email адрес не найден' });
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
      return res.status(404).send({ error: 'Неверный токен' });
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res
        .status(400)
        .send({ error: 'Пароль подтверждения не совпадает с новым паролем' });
    }

    user.password = req.body.newPassword;
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

usersRouter.post('/verify-email/:token', async (req, res, next) => {
  try {
    const user = await User.findOne({
      verifyEmailToken: req.params.token,
    });

    if (!user) {
      return res
        .status(404)
        .send({ error: 'Неверный токен, вам было вышлено новое ' });
    }

    user.verified = true;
    user.generateToken();
    await user.save();
    return res
      .status(200)
      .send({ message: 'Почта успешно подтверждена!', user });
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;
