import { RootState } from '@/src/store/store';
import { ApiLesson } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { createLesson, fetchLessons } from './lessonsThunk';

interface LessonsState {
  items: ApiLesson[];
  loading: boolean;
  submitting: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: LessonsState = {
  items: [],
  loading: false,
  submitting: false,
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
      });
  },
});

export const lessonsReducer = lessonsSlice.reducer;
export const selectLessons = (state: RootState) => state.lessons.items;
export const selectLessonsLoading = (state: RootState) => state.lessons.loading;
export const selectLessonsSubmitting = (state: RootState) =>
  state.lessons.submitting;
export const selectLessonsPage = (state: RootState) =>
  state.lessons.currentPage;
export const selectLessonsCount = (state: RootState) =>
  state.lessons.totalCount;
