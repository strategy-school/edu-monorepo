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
  { lesson: ILesson; id: string }
>('lessons/edit', async ({ lesson, id }) => {
  await axiosApi.put(`lessons/${id}`, lesson);
});
