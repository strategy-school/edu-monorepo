import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { HydratedDocument, model, Model, Schema } from 'mongoose';
import { IUser } from '../types';
import validate from 'deep-email-validator';

const SALT_WORK_FACTOR = 10;

export interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

enum Role {
  User = 'user',
  Teacher = 'teacher',
  Admin = 'admin',
}

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: async function (
            this: HydratedDocument<IUser>,
            email: string,
          ): Promise<boolean> {
            if (!this.isModified('email')) return true;
            const user = await User.findOne({
              email,
            });
            return !user;
          },
          message: 'Пользователь под таким email-ом уже зарегистрирован!',
        },
        {
          validator: async function (
            this: HydratedDocument<IUser>,
            email: string,
          ): Promise<boolean> {
            try {
              if (this.telegramId && email.slice(-8) === 'test.com') {
                return true;
              }
              const { valid } = await validate(email);
              return valid;
            } catch {
              return false;
            }
          },
          message: 'Некорректный адрес электронной почты',
        },
      ],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (password: string): boolean {
            if (!password) {
              return true;
            }

            return password.length >= 8;
          },
          message: 'Пароль должен содержать не менее 8 символов.',
        },
        {
          validator: function (
            this: HydratedDocument<IUser>,
            password: string,
          ): boolean {
            if (
              !this.isModified('password') ||
              this.googleId ||
              this.telegramId
            )
              return true;
            if (!password) {
              return true;
            }

            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            return regex.test(password);
          },
          message: 'Пароль должен содержать как минимум 1 букву и 1 цифру.',
        },
      ],
    },
    token: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      validate: [
        {
          validator: async function (
            this: HydratedDocument<IUser>,
            phoneNumber: string,
          ): Promise<boolean> {
            if (!phoneNumber) {
              return true;
            }

            if (!this.isModified('phoneNumber')) {
              return true;
            }

            const user = await User.findOne({
              phoneNumber,
            });

            return !user;
          },
          message: 'Пользователь с таким номером телефона уже зарегистрирован!',
        },
        {
          validator: function (phoneNumber: string): boolean {
            if (!phoneNumber) {
              return true;
            }

            const regex = /^\+996\d{9}$/;
            return regex.test(phoneNumber);
          },
          message: 'Неверный формат номера телефона!',
        },
      ],
    },
    role: {
      type: String,
      required: true,
      enum: Role,
      default: Role.User,
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: String,
    googleId: String,
    facebookId: String,
    linkedinId: String,
    telegramId: String,
    telegramUsername: String,
    isTelegramUpdated: {
      type: Boolean,
      default: null,
    },
    verifyEmailToken: {
      type: String,
      default: null,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    newEmail: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const User = model<IUser, UserModel>('User', UserSchema);
export default User;
