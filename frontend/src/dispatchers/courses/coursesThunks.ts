import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  CourseShort,
  ICourse,
  ApiCourse,
  ValidationError,
  GlobalError,
  PageLimit,
} from '@/src/types';
import { isAxiosError } from 'axios';

type SearchParam = Partial<
  Omit<ICourse, 'duration' | 'price' | 'category' | 'image'> &
    PageLimit & { minPrice: string; maxPrice: string }
>;

export const fetchCourses = createAsyncThunk<
  ApiResponse<CourseShort>,
  SearchParam | undefined
>('courses/fetchAll', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<CourseShort>>('/courses', {
    params,
  });
  return data;
});

export const fetchOneCourse = createAsyncThunk<ApiCourse, string>(
  'courses/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/courses/' + id);
    return response.data;
  },
);

export const createCourse = createAsyncThunk<
  void,
  ICourse,
  { rejectValue: ValidationError }
>('courses/create', async (courseMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(courseMutation) as (keyof ICourse)[];

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
  course: ICourse;
}

export const updateCourse = createAsyncThunk<
  void,
  UpdateCourseParams,
  { rejectValue: ValidationError }
>('courses/update', async ({ id, course }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(course) as (keyof ICourse)[];

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

export const deleteCourse = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('courses/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete('/courses/' + id);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const courseToggleDeleted = createAsyncThunk<void, string>(
  'courses/toggleIsDeleted',
  async (id) => {
    await axiosApi.patch(`/courses/${id}/toggleIsDeleted`);
  },
);
