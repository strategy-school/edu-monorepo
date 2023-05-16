import axiosApi from '@/src/axiosApi';
import {
  ApiLesson,
  ApiResponse,
  ILesson,
  IPagination,
  SearchLesson,
} from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLessons = createAsyncThunk<
  IPagination<ApiLesson>,
  SearchLesson
>('lessons/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiLesson>>('/lessons', {
    params,
  });
  return data.result as IPagination<ApiLesson>;
});

export const createLesson = createAsyncThunk(
  'lessons/create',
  async (lesson: ILesson) => {
    await axiosApi.post('/lessons', lesson);
  },
);
