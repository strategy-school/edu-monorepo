import { RootState } from '@/src/store/store';
import { ApiLesson, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
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
  submitting: boolean;
  deleting: string | false;
  currentPage: number;
  totalCount: number;
  creatingError: ValidationError | null;
  editingError: ValidationError | null;
}

const initialState: LessonsState = {
  items: [],
  item: null,
  loading: false,
  submitting: false,
  deleting: false,
  currentPage: 1,
  totalCount: 1,
  creatingError: null,
  editingError: null,
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(HYDRATE, (_, action) => {
        //@ts-expect-error hydrate action's payload is not typed
        return action.payload.lessons;
      })
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
        state.creatingError = null;
      })
      .addCase(createLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createLesson.rejected, (state, { payload: error }) => {
        state.submitting = false;
        state.creatingError = error || null;
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
        state.editingError = null;
      })
      .addCase(editLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(editLesson.rejected, (state, { payload: error }) => {
        state.submitting = false;
        state.editingError = error || null;
      });
  },
});

export const lessonsReducer = lessonsSlice.reducer;
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
export const selectLessonCreatingError = (state: RootState) =>
  state.lessons.creatingError;
export const selectLessonEditingError = (state: RootState) =>
  state.lessons.editingError;
