import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import {
  Course,
  CourseMutation,
  FullCourse,
  ValidationError,
} from '@/src/types';
import { isAxiosError } from 'axios';

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  const response = await axiosApi.get<Course[]>('/courses');
  return response.data;
});

export const fetchOneCourse = createAsyncThunk<FullCourse, string>(
  'courses/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/courses/' + id);
    return response.data;
  },
);

export const createCourse = createAsyncThunk<
  void,
  CourseMutation,
  { rejectValue: ValidationError }
>('courses/create', async (courseMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post('/courses', courseMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
