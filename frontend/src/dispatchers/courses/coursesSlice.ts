import { RootState } from '@/src/store/store';
import {
  ApiCourse,
  CourseShort,
  GlobalError,
  IPagination,
  ValidationError,
} from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  courseToggleDeleted,
  createCourse,
  deleteCourse,
  fetchCourses,
  fetchOneCourse,
  updateCourse,
} from './coursesThunks';

interface CourseState {
  items: CourseShort[];
  fetchLoading: boolean;
  oneCourse: ApiCourse | null;
  fetchOneLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  removeError: GlobalError | null;
  togglingIsDeleted: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: CourseState = {
  items: [],
  fetchLoading: false,
  oneCourse: null,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  removeError: null,
  togglingIsDeleted: false,
  currentPage: 1,
  totalCount: 1,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      //@ts-expect-error hydrate action's payload is not typed
      return action.payload.courses;
    });
    builder.addCase(fetchCourses.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<CourseShort>;
      state.items = result.courses;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
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
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createCourse.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createCourse.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(updateCourse.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateCourse.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateCourse.rejected, (state, { payload: error }) => {
      state.submitting = false;
      state.error = error || null;
    });

    builder.addCase(deleteCourse.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteCourse.rejected, (state, { payload: error }) => {
      state.removeError = error || null;
      state.deleteLoading = false;
    });
    builder.addCase(courseToggleDeleted.pending, (state) => {
      state.togglingIsDeleted = true;
    });
    builder.addCase(courseToggleDeleted.fulfilled, (state) => {
      state.togglingIsDeleted = false;
    });
    builder.addCase(courseToggleDeleted.rejected, (state) => {
      state.togglingIsDeleted = false;
    });
  },
});

export const coursesReducer = coursesSlice.reducer;
export const { cleanError } = coursesSlice.actions;
export const selectCourses = (state: RootState) => state.courses.items;
export const selectCoursesFetching = (state: RootState) =>
  state.courses.fetchLoading;
export const selectOneCourse = (state: RootState) => state.courses.oneCourse;
export const selectOneCourseFetching = (state: RootState) =>
  state.courses.fetchOneLoading;
export const selectCourseSubmitting = (state: RootState) =>
  state.courses.submitting;
export const selectCourseError = (state: RootState) => state.courses.error;
export const selectCourseDeleting = (state: RootState) =>
  state.courses.deleteLoading;
export const selectCoursePage = (state: RootState) => state.courses.currentPage;
export const selectCoursesCount = (state: RootState) =>
  state.courses.totalCount;
export const selectCourseTogglingDeleted = (state: RootState) =>
  state.courses.togglingIsDeleted;
