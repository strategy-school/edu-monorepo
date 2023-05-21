import { RootState } from '@/src/store/store';
import { ApiLesson, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createLesson,
  deleteLesson,
  editLesson,
  fetchLessons,
  fetchOneLesson,
} from './lessonsThunk';

interface LessonsState {
  items: ApiLesson[];
  item: ApiLesson | null;
  loading: boolean;
  error: ValidationError | null;
  submitting: boolean;
  deleting: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: LessonsState = {
  items: [],
  item: null,
  loading: false,
  error: null,
  submitting: false,
  deleting: false,
  currentPage: 1,
  totalCount: 1,
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, { payload: result }) => {
        state.loading = false;
        state.items = result.lessons;
        state.currentPage = result.currentPage;
        state.totalCount = result.totalCount;
      })
      .addCase(fetchLessons.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createLesson.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createLesson.rejected, (state, { payload: error }) => {
        state.submitting = false;
        state.error = error || null;
      })
      .addCase(deleteLesson.pending, (state, { meta }) => {
        state.deleting = meta.arg;
      })
      .addCase(deleteLesson.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteLesson.rejected, (state) => {
        state.deleting = false;
      })
      .addCase(fetchOneLesson.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneLesson.fulfilled, (state, { payload: lesson }) => {
        state.loading = false;
        state.item = lesson;
      })
      .addCase(fetchOneLesson.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editLesson.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(editLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(editLesson.rejected, (state, { payload: error }) => {
        state.submitting = false;
        state.error = error || null;
      });
  },
});

export const lessonsReducer = lessonsSlice.reducer;
export const { cleanError } = lessonsSlice.actions;
export const selectLessons = (state: RootState) => state.lessons.items;
export const selectOneLesson = (state: RootState) => state.lessons.item;
export const selectLessonsLoading = (state: RootState) => state.lessons.loading;
export const selectLessonsSubmitting = (state: RootState) =>
  state.lessons.submitting;
export const selectLessonsDeleting = (state: RootState) =>
  state.lessons.deleting;
export const selectLessonsPage = (state: RootState) =>
  state.lessons.currentPage;
export const selectLessonsCount = (state: RootState) =>
  state.lessons.totalCount;
export const selectLessonError = (state: RootState) => state.lessons.error;
