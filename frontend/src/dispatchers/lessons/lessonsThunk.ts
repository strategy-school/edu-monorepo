import axiosApi from '@/src/axiosApi';
import {
  ApiLesson,
  ApiResponse,
  ILesson,
  IPagination,
  SearchLesson,
  ValidationError,
} from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const fetchLessons = createAsyncThunk<
  IPagination<ApiLesson>,
  SearchLesson
>('lessons/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiLesson>>('/lessons', {
    params,
  });
  return data.result as IPagination<ApiLesson>;
});

export const createLesson = createAsyncThunk<
  void,
  ILesson,
  { rejectValue: ValidationError }
>('lessons/create', async (lesson, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(lesson) as (keyof ILesson)[];
    keys.forEach((key) => {
      const value = lesson[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/lessons', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async (id: string) => {
    await axiosApi.delete(`/lessons/${id}`);
  },
);

export const fetchOneLesson = createAsyncThunk<ApiLesson, string>(
  'lessons/fetchOne',
  async (id) => {
    const { data } = await axiosApi.get<ApiResponse<ApiLesson>>(
      `lessons/${id}`,
    );
    return data.result as ApiLesson;
  },
);

export const editLesson = createAsyncThunk<
  void,
  { lesson: ILesson; id: string },
  { rejectValue: ValidationError }
>('lessons/edit', async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(data.lesson) as (keyof ILesson)[];
    keys.forEach((key) => {
      const value = data.lesson[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.put(`lessons/${data.id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
