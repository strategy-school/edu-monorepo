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
  resetPasswordToken: string | null;
  verifyEmailToken: string | null;
  verified: boolean;
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
  isDeleted: boolean;
  category: Types.ObjectId;
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
  price: number;
  description: string;
  category: string;
  theme: string;
  targetAudience: string;
  programGoal: string;
  level: string;
  type: string;
  duration: string;
  image: string;
  isDeleted: boolean;
  exam: string;
  youtube: boolean;
  zoom: boolean;
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

export type SwitchToString<Type> = {
  [Property in keyof Type]?: string;
};

export type SearchParam = {
  [field: string]: string | { $regex: string; $options?: string };
};

export interface PageLimit {
  page?: string;
  limit?: string;
}

export interface IVideoReview {
  title: string;
  previewImage: string;
  youtubeURL: string;
}

export interface ILesson {
  theme: string;
  video_link: string;
  document: string;
  course: Types.ObjectId;
}

export type Search<T> = {
  [P in keyof T]?:
    | string
    | ({ $regex: string; $options?: string } & {
        $gte?: number;
        $lte?: number;
      });
};
