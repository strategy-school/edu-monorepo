import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users/usersSlice';
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
import { coursesReducer } from '@/src/features/courses/coursesSlice';
import { teacherReducer } from '@/src/features/teachers/teachersSlice';
import { categoriesReducer } from '@/src/features/categories/categoriesSlice';
import { commentsReducer } from '@/src/features/comments/commentsSlice';

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
