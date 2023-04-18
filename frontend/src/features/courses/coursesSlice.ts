import { Course, FullCourse, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/app/store';
import {
  createCourse,
  deleteCourse,
  fetchCourses,
  fetchOneCourse,
  updateCourse,
} from '@/src/features/courses/coursesThunks';

interface CourseState {
  items: Course[];
  fetchLoading: boolean;
  oneCourse: FullCourse | null;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createCourseError: ValidationError | null;
  updateLoading: boolean;
  updateCourseError: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: CourseState = {
  items: [],
  fetchLoading: false,
  oneCourse: null,
  fetchOneLoading: false,
  createLoading: false,
  createCourseError: null,
  updateLoading: false,
  updateCourseError: null,
  deleteLoading: false,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, { payload: courses }) => {
      state.fetchLoading = false;
      state.items = courses;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneCourse.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneCourse.fulfilled, (state, { payload: course }) => {
      state.fetchOneLoading = false;
      state.oneCourse = course;
    });
    builder.addCase(fetchOneCourse.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createCourse.pending, (state) => {
      state.createCourseError = null;
      state.createLoading = true;
    });
    builder.addCase(createCourse.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCourse.rejected, (state, { payload: error }) => {
      state.createCourseError = error || null;
      state.createLoading = false;
    });

    builder.addCase(updateCourse.pending, (state) => {
      state.updateCourseError = null;
      state.updateLoading = true;
    });
    builder.addCase(updateCourse.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateCourse.rejected, (state, { payload: error }) => {
      state.updateCourseError = error || null;
      state.updateLoading = false;
    });

    builder.addCase(deleteCourse.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCourse.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const coursesReducer = coursesSlice.reducer;

export const selectCourses = (state: RootState) => state.courses.items;
export const selectCoursesFetching = (state: RootState) =>
  state.courses.fetchLoading;
export const selectOneCourse = (state: RootState) => state.courses.oneCourse;
export const selectOneCourseFetching = (state: RootState) =>
  state.courses.fetchOneLoading;
export const selectCourseCreating = (state: RootState) =>
  state.courses.createLoading;
export const selectCreateCourseError = (state: RootState) =>
  state.courses.createCourseError;
export const selectCourseUpdating = (state: RootState) =>
  state.courses.updateLoading;
export const selectUpdateCourseError = (state: RootState) =>
  state.courses.updateCourseError;
export const selectCourseDeleting = (state: RootState) =>
  state.courses.deleteLoading;
