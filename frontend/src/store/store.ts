import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { usersReducer } from '../dispatchers/users/usersSlice';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { categoriesReducer } from '../dispatchers/categories/categoriesSlice';
import { commentsReducer } from '../dispatchers/comments/commentsSlice';
import { coursesReducer } from '../dispatchers/courses/coursesSlice';
import { teacherReducer } from '../dispatchers/teachers/teachersSlice';
import { testsReducer } from '../dispatchers/tests/testsSlice';
import { transacionsReducer } from '../dispatchers/transactions/transactionsSlice';
import { groupReducer } from '@/src/dispatchers/groups/groupsSlice';
import { videoReviewsReducer } from '@/src/dispatchers/videoReviews/videoReviewsSlice';

const usersPersistConfig = {
  key: 'strategia:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, usersReducer),
  courses: coursesReducer,
  teachers: teacherReducer,
  categories: categoriesReducer,
  comments: commentsReducer,
  transactions: transacionsReducer,
  tests: testsReducer,
  groups: groupReducer,
  videoReviews: videoReviewsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
