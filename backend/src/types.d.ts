import { Types } from 'mongoose';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  token: string;
  phoneNumber: string;
  role: string;
  avatar: string | null;
  googleId: string | null;
  facebookId: string | null;
  linkedinId: string | null;
  isBanned: boolean;
}

export interface ICourse {
  title: string;
  duration: string;
  price: number;
  description: string;
  type: string;
  theme: string;
  targetAudience: string;
  programGoal: string;
  level: string;
  image: string;
}

export interface ICategory {
  title: string;
  description: string;
  image: string | null;
}

export interface ITransaction {
  user: Types.ObjectId;
  course: Types.ObjectId;
  isPaid: 'pending' | 'paid';
}

export interface ICourse {
  title: string;
  duration: string;
  price: number;
  description: string;
  type: string;
  theme: string;
  targetAudience: string;
  programGoal: string;
  level: string;
  image: string;
}

export interface ICategory {
  title: string;
  description: string;
  image: string | null;
}

export interface IComment {
  user: Types.ObjectId;
  course: Types.ObjectId;
  rating: number;
  text: string;
}

export interface ITelegramBotResponse {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text: string;
  entities: Entity[];
}

export interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  username: string;
  language_code: string;
}

export interface Chat {
  id: number;
  first_name: string;
  username: string;
  type: string;
}

export interface Entity {
  offset: number;
  length: number;
  type: string;
}
