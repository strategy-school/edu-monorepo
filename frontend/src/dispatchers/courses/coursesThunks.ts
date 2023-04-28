import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  Course,
  CourseMutation,
  FullCourse,
  ValidationError,
} from '@/src/types';
import { isAxiosError } from 'axios';

interface FilterParam {
  level: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

export const fetchCourses = createAsyncThunk<
  ApiResponse<Course>,
  FilterParam | undefined
>('courses/fetchAll', async (param) => {
  if (param) {
    const { data } = await axiosApi.get<ApiResponse<Course>>(
      `/courses?level=${param.level}&category=${param.category}&minPrice=${param.minPrice}&maxPrice=${param.maxPrice}`,
    );
    return data;
  }

  const { data } = await axiosApi.get<ApiResponse<Course>>('/courses');
  return data;
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
    const formData = new FormData();

    const keys = Object.keys(courseMutation) as (keyof CourseMutation)[];

    keys.forEach((key) => {
      const value = courseMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/courses', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface UpdateCourseParams {
  id: string;
  course: CourseMutation;
}

export const updateCourse = createAsyncThunk<
  void,
  UpdateCourseParams,
  { rejectValue: ValidationError }
>('courses/update', async ({ id, course }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(course) as (keyof CourseMutation)[];

    keys.forEach((key) => {
      const value = course[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.put(`/courses/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteCourse = createAsyncThunk<void, string>(
  'courses/delete',
  async (id) => {
    await axiosApi.delete('/courses/' + id);
  },
);
