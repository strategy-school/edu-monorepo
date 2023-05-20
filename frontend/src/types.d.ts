export enum UserRole {
  User = 'user',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  token: string;
  role: UserRole;
  isBanned: boolean;
  avatar: string | null;
  googleId?: string;
  verified: boolean;
}

export interface RegisterMutation {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
  phoneNumber: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UpdateUserMutation = Pick<
  RegisterMutation,
  'email' | 'phoneNumber' | 'lastName' | 'firstName' | 'avatar'
>;

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

export interface ICourse {
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
  exam: string;
  youtube: boolean;
  zoom: boolean;
}

export type CourseShort = Pick<
  ApiCourse,
  '_id' | 'title' | 'duration' | 'image' | 'isDeleted'
>;

export interface ApiCourse {
  _id: string;
  title: string;
  duration: string;
  image: string;
  price: number;
  description: string;
  type: string;
  theme: string;
  category: Pick<ApiCategory, '_id' | 'title'>;
  targetAudience: string;
  programGoal: string;
  level: string;
  isDeleted: boolean;
  exam: string;
  youtube: boolean;
  zoom: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CoursePrice {
  $gte?: number;
  $lte?: number;
}

export type SearchCourse = Partial<
  Omit<ICourse, 'duration' | 'price' | 'image'> & {
    price: CoursePrice;
  }
>;

export interface ITeacher {
  user: string;
  info: string;
  photo: File | null;
  portfolio: string[];
}

export interface ApiTeacher {
  _id: string;
  user: Pick<User, '_id' | 'firstName' | 'lastName'>;
  photo: string;
  info: string;
  portfolio: string[];
  createdAt: string;
  updatedAt: string;
}

export type TeacherShort = Pick<ApiTeacher, '_id' | 'user' | 'photo'>;

export interface ICategory {
  title: string;
  description: string;
  image: File | null;
}

export interface ApiCategory {
  _id: string;
  title: string;
  description: string;
  image: string;
  isDeleted: boolean;
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

export interface ApiCommentsResponse {
  comments: ApiComment[];
  payingUser: boolean;
  totalCount: number;
}

export interface ITransaction {
  user: string;
  course: string;
}

export interface ApiTransaction {
  _id: string;
  user: Pick<User, '_id' | 'email' | 'firstName' | 'lastName' | 'phoneNumber'>;
  course: Pick<
    ApiCourse,
    '_id' | 'title' | 'price' | 'type' | 'level' | 'image' | 'exam'
  >;
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

export interface CategoryMini {
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
  category: CategoryMini;
  title: string;
  description: string;
  questions: QuestionFull[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TestMutation {
  category: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface TestMini {
  _id: string;
  category: CategoryMini;
  title: string;
}

export interface PageLimit {
  page?: number;
  limit?: number;
}

export interface ApiGroup {
  _id: string;
  title: string;
  description: string;
  course: Pick<ApiCourse, '_id' | 'title' | 'duration'>;
  startDate: string;
  endDate: string;
  startsAt: string;
  duration: string;
  telegramLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGroup {
  title: string;
  description: string;
  course: string;
  startDate: string;
  endDate: string;
  startsAt: string;
  duration: string;
  telegramLink: string;
}

export interface ApiNotification {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string | null;
  isChecked: boolean;
}

export interface INotification {
  name: string;
  email: string;
  phoneNumber: string;
  message: string | null;
}

export interface IVideoReview {
  title: string;
  previewImage: File | null;
  youtubeURL: string;
}

export interface ApiVideoReview {
  _id: string;
  previewImage: string;
  title: string;
  youtubeURL: string;
}

export interface ApiLesson {
  _id: string;
  theme: string;
  video_link: string;
  document: string | null;
  course: Pick<
    ApiCourse,
    '_id' | 'title' | 'price' | 'type' | 'level' | 'image'
  >;
}

export interface ILesson {
  theme: string;
  video_link: string;
  course: string;
  document: File | null;
}

export interface RegexSearch {
  $regex: string;
  $options?: string;
}

export interface RangeSearch {
  $gte?: number;
  $lte?: number;
}

export interface SearchLesson extends PageLimit {
  theme?: RegexSearch;
  course?: string;
}
