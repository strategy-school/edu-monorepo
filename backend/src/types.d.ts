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