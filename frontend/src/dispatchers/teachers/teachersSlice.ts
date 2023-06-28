import { RootState } from '@/src/store/store';
import {
  ApiTeacher,
  IPagination,
  TeacherShort,
  ValidationError,
} from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  createTeacher,
  deleteTeacher,
  editTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from './teachersThunks';

interface TeacherState {
  teachersList: TeacherShort[];
  oneTeacher: ApiTeacher | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: TeacherState = {
  teachersList: [],
  oneTeacher: null,
  fetchLoading: false,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      //@ts-expect-error hydrate action's payload is not typed
      return action.payload.teachers;
    });
    builder.addCase(fetchTeachers.pending, (state) => {
      state.teachersList = [];
      state.fetchLoading = true;
    });
    builder.addCase(fetchTeachers.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<TeacherShort>;
      state.teachersList = result.teachers;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchTeachers.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneTeacher.pending, (state) => {
      state.fetchOneLoading = true;
      state.oneTeacher = null;
    });
    builder.addCase(
      fetchOneTeacher.fulfilled,
      (state, { payload: teacher }) => {
        state.fetchOneLoading = false;
        state.oneTeacher = teacher;
      },
    );
    builder.addCase(fetchOneTeacher.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createTeacher.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createTeacher.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createTeacher.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(editTeacher.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(editTeacher.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(editTeacher.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(deleteTeacher.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteTeacher.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTeacher.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const teacherReducer = teacherSlice.reducer;
export const { cleanError } = teacherSlice.actions;
export const selectTeachers = (state: RootState) => state.teachers.teachersList;
export const selectOneTeacher = (state: RootState) => state.teachers.oneTeacher;
export const selectTeachersFetching = (state: RootState) =>
  state.teachers.fetchLoading;
export const selectOneTeacherFetching = (state: RootState) =>
  state.teachers.fetchOneLoading;
export const selectTeacherSubmitting = (state: RootState) =>
  state.teachers.submitting;
export const selectTeacherError = (state: RootState) => state.teachers.error;
export const selectTeacherDeleting = (state: RootState) =>
  state.teachers.deleteLoading;
export const selectTeachersCount = (state: RootState) =>
  state.teachers.totalCount;
export const selectTeacherPage = (state: RootState) =>
  state.teachers.currentPage;
