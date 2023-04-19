import { Teacher } from '@/src/types';
import { ValidationError } from 'json-schema';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/app/store';

interface TeacherState {
  teachersList: Teacher[];
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
