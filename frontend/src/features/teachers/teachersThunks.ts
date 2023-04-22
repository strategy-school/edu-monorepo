import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import {
  Teacher,
  TeacherMutation,
  TeacherShort,
  ValidationError,
} from '@/src/types';
import { isAxiosError } from 'axios';
import { RootState } from '@/src/app/store';

export const fetchTeachers = createAsyncThunk<TeacherShort[]>(
  'teachers/fetchAll',
  async () => {
    const response = await axiosApi.get<TeacherShort[]>('/teachers');
    return response.data;
  },
);
export const fetchOneTeacher = createAsyncThunk<Teacher, string>(
  'teachers/fetchOne',
  async (id) => {
    const response = await axiosApi.get<Teacher>('/teachers/' + id);
    return response.data;
  },
);

export const createTeacher = createAsyncThunk<
  void,
  TeacherMutation,
  { rejectValue: ValidationError; state: RootState }
>('teachers/create', async (teacherData, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(teacherData) as (keyof TeacherMutation)[];

  keys.forEach((key) => {
    const value: File | null | string | string[] = teacherData[key] as
      | File
      | string
      | null
      | string[];
    if (value !== null) {
      if (key === 'portfolio') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as File | string);
      }
    }
  });

  try {
    await axiosApi.post('/teachers', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const editTeacher = createAsyncThunk<
  void,
  { id: string; teacherData: TeacherMutation },
  { rejectValue: ValidationError; state: RootState }
>('teachers/edit', async ({ id, teacherData }, { rejectWithValue }) => {
  const formData = new FormData();
  const keys = Object.keys(teacherData) as (keyof TeacherMutation)[];

  keys.forEach((key) => {
    const value: File | null | string | string[] = teacherData[key] as
      | File
      | string
      | null
      | string[];
    if (value !== null) {
      if (key === 'portfolio') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as File | string);
      }
    }
  });

  try {
    await axiosApi.put(`/teachers/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteTeacher = createAsyncThunk<void, string>(
  'teachers/delete',
  async (id) => {
    await axiosApi.delete('/teachers/' + id);
  },
);
