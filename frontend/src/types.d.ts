export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
  role: string;
  isBanned: boolean;
  courses: string[];
  avatar: string | null;
  googleId?: string;
}

export interface RegisterMutation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
  phoneNumber: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Course {
  _id: string;
  title: string;
  duration: string;
}

export interface CourseMutation {
  title: string;
  duration: string;
  price: string;
  description: string;
  type: string;
}

export interface FullCourse extends Course {
  price: number;
  description: string;
  type: string;
}

export interface TeacherMutation {
  user_id: string;
  info: string;
  photo: File | null;
  portfolio: string[];
}
export interface TeacherShort {
  _id: string;
  user_id: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  photo: string;
}
export interface Teacher extends TeacherShort {
  info: string;
  portfolio: string[];
  created_at: string;
}
