export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
  role: string;
  isBanned: boolean;
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
  image: string;
}

export interface CourseMutation {
  title: string;
  duration: string;
  price: string;
  description: string;
  category: string;
  type: string;
  image: File | null;
  theme: string;
  targetAudience: string;
  programGoal: string;
  level: string;
}

export interface FullCourse extends Course {
  price: number;
  description: string;
  type: string;
  theme: string;
  category: {
    _id: string;
    title: string;
  };
  targetAudience: string;
  programGoal: string;
  level: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherMutation {
  user: string;
  info: string;
  photo: File | null;
  portfolio: string[];
}

export interface MiniUser {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface TeacherShort {
  photo: string;
  user: MiniUser;
  _id: string;
}

export interface Teacher extends TeacherShort {
  info: string;
  portfolio: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  title: string;
  description: string;
  image: string;
}

export interface CategoryMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComment {
  text: string;
  rating: number;
  course: string;
}

type CommentUser = Pick<User, '_id' | 'firstName' | 'lastName' | 'avatar'>;

export type ShortCommentMutation = Omit<IComment, 'course'>;

export interface ApiComment extends IComment {
  _id: string;
  user: CommentUser;
  createdAt: string;
}

export interface ITransaction {
  user: string;
  course: string;
}

export interface ApiTransaction {
  _id: string;
  user: Pick<User, '_id', 'email', 'firstName', 'lastName', 'phoneNumber'>;
  course: Pick<FullCourse, '_id', 'title', 'price', 'type', 'level', 'image'>;
  isPaid: 'pending' | 'paid';
  createdAt: string;
  updatedAt: string;
}

export interface IPagination<Type> {
  [key: string]: Type[];
  currentPage: number;
  totalCount: number;
}

export interface ApiResponse<Type> {
  message: 'string';
  result: Type | IPagination<Type>;
}

export interface CourseMini {
  _id: string;
  title: string;
}

export interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

export interface QuestionFull extends Question {
  _id: string;
}
export interface Test {
  _id: string;
  course: CourseMini;
  title: string;
  description: string;
  questions: QuestionFull[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TestMutation {
  course: string;
  title: string;
  description: string;
  questions: Question[];
}
