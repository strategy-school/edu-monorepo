import { RootState } from '@/src/store/store';
import { ApiLesson } from '@/src/types';
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
  submitting: boolean;
  deleting: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: LessonsState = {
  items: [],
  item: null,
  loading: false,
  submitting: false,
  deleting: false,
  currentPage: 1,
  totalCount: 1,
};

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {},
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
      })
      .addCase(createLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createLesson.rejected, (state) => {
        state.submitting = false;
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
      })
      .addCase(editLesson.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(editLesson.rejected, (state) => {
        state.submitting = false;
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
