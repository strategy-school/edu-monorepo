import {
  CourseShort,
  ApiCourse,
  IPagination,
  ValidationError,
  GlobalError,
} from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/app/store';
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
  createLoading: boolean;
  createCourseError: ValidationError | null;
  updateLoading: boolean;
  updateCourseError: ValidationError | null;
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
  createLoading: false,
  createCourseError: null,
  updateLoading: false,
  updateCourseError: null,
  deleteLoading: false,
  removeError: null,
  togglingIsDeleted: false,
  currentPage: 1,
  totalCount: 1,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(deleteCourse.rejected, (state, { payload: error }) => {
      window.alert(
        'Данный курс не может быть удален, так как с ним связаны транзакции. Курс можно сделать скрытым. Для этого нажмите на кнопку Скрыть в админ-панели',
      );
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
export const selectCoursePage = (state: RootState) => state.courses.currentPage;
export const selectCoursesCount = (state: RootState) =>
  state.courses.totalCount;
export const selectCourseTogglingDeleted = (state: RootState) =>
  state.courses.togglingIsDeleted;
