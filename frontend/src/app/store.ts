import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../dispatchers/users/usersSlice';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { transacionsReducer } from '../dispatchers/transactions/transactionsSlice';
import { categoriesReducer } from '../dispatchers/categories/categoriesSlice';
import { coursesReducer } from '../dispatchers/courses/coursesSlice';
import { teacherReducer } from '../dispatchers/teachers/teachersSlice';
import { commentsReducer } from '@/src/dispatchers/comments/commentsSlice';
import { testsReducer } from '@/src/dispatchers/tests/testsSlice';
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
