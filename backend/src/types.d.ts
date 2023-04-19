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

export interface ITransaction {
  user: Types.ObjectId;
  course: Types.ObjectId;
  isPaid: 'pending' | 'paid';
}
