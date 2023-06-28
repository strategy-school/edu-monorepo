import { groupReducer } from '@/src/dispatchers/groups/groupsSlice';
import { notificationsReducer } from '@/src/dispatchers/notifications/notificationsSlice';
import { videoReviewsReducer } from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { categoriesReducer } from '../dispatchers/categories/categoriesSlice';
import { commentsReducer } from '../dispatchers/comments/commentsSlice';
import { coursesReducer } from '../dispatchers/courses/coursesSlice';
import { lessonsReducer } from '../dispatchers/lessons/lessonsSlice';
import { teacherReducer } from '../dispatchers/teachers/teachersSlice';
import { testsReducer } from '../dispatchers/tests/testsSlice';
import { transactionsReducer } from '../dispatchers/transactions/transactionsSlice';
import { usersReducer } from '../dispatchers/users/usersSlice';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      users: usersReducer,
      courses: coursesReducer,
      teachers: teacherReducer,
      categories: categoriesReducer,
      comments: commentsReducer,
      transactions: transactionsReducer,
      tests: testsReducer,
      groups: groupReducer,
      notifications: notificationsReducer,
      videoReviews: videoReviewsReducer,
      lessons: lessonsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ['users.user'],
          compress: false,
        }),
      ),
  }),
);

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<RootStore>(makeStore);
