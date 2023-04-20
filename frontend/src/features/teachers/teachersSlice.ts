import { Teacher, TeacherShort, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/app/store';
import {
  createTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from '@/src/features/teachers/teachersThunks';

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
    builder.addCase(fetchTeachers.fulfilled, (state, { payload: teachers }) => {
      state.fetchLoading = false;
      state.teachersList = teachers;
    });
    builder.addCase(fetchTeachers.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneTeacher.pending, (state) => {
      state.fetchOneLoading = true;
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
