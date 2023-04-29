import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  Teacher,
  TeacherMutation,
  TeacherShort,
  ValidationError,
} from '@/src/types';
import { isAxiosError } from 'axios';
import { RootState } from '@/src/app/store';

interface SearchParam {
  page?: number;
  limit?: number;
  user?: string;
}

export const fetchTeachers = createAsyncThunk<
  ApiResponse<TeacherShort>,
  SearchParam | undefined
>('teachers/fetch', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const url = `/teachers/${queryString ? `?${queryString}` : ''}`;
  const { data } = await axiosApi.get<ApiResponse<TeacherShort>>(url);
  return data;
});

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
