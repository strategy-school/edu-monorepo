import {
  IPagination,
  Teacher,
  TeacherShort,
  ValidationError,
} from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/app/store';
import {
  createTeacher,
  deleteTeacher,
  editTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from './teachersThunks';

interface TeacherState {
  teachersList: TeacherShort[];
  oneTeacher: Teacher | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createTeacherError: ValidationError | null;
  updateLoading: boolean;
  updateTeacherError: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: TeacherState = {
  teachersList: [],
  oneTeacher: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createTeacherError: null,
  updateLoading: false,
  updateTeacherError: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      state.createTeacherError = null;
      state.createLoading = true;
    });
    builder.addCase(createTeacher.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTeacher.rejected, (state, { payload: error }) => {
      state.createTeacherError = error || null;
      state.createLoading = false;
    });

    builder.addCase(editTeacher.pending, (state) => {
      state.updateTeacherError = null;
      state.updateLoading = true;
    });
    builder.addCase(editTeacher.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(editTeacher.rejected, (state, { payload: error }) => {
      state.updateTeacherError = error || null;
      state.updateLoading = false;
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

export const selectTeachers = (state: RootState) => state.teachers.teachersList;
export const selectOneTeacher = (state: RootState) => state.teachers.oneTeacher;

export const selectTeachersFetching = (state: RootState) =>
  state.teachers.fetchLoading;
export const selectOneTeacherFetching = (state: RootState) =>
  state.teachers.fetchOneLoading;
export const selectTeacherCreating = (state: RootState) =>
  state.teachers.createLoading;
export const selectCreateTeacherError = (state: RootState) =>
  state.teachers.createTeacherError;
export const selectTeacherUpdating = (state: RootState) =>
  state.teachers.updateLoading;
export const selectUpdateTeacherError = (state: RootState) =>
  state.teachers.updateTeacherError;
export const selectTeacherDeleting = (state: RootState) =>
  state.teachers.deleteLoading;
export const selectTeachersCount = (state: RootState) =>
  state.teachers.totalCount;
export const selectTeacherPage = (state: RootState) =>
  state.teachers.currentPage;
