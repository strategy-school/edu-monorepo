import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  Category,
  CategoryMutation,
  ValidationError,
} from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

interface SeacrhParam {
  limit?: number;
  page?: number;
}

export const fetchCategories = createAsyncThunk<
  ApiResponse<Category>,
  SeacrhParam | undefined
>('categories/fetch', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  const url = `/categories${queryString ? `?${queryString}` : ''}`;

  const { data } = await axiosApi.get<ApiResponse<Category>>(url);
  return data;
});

export const fetchOneCategory = createAsyncThunk<Category, string>(
  'categories/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/categories/' + id);
    return response.data;
  },
);

export const createCategory = createAsyncThunk<
  void,
  CategoryMutation,
  { rejectValue: ValidationError }
>('categories/create', async (categoryMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(categoryMutation) as (keyof CategoryMutation)[];
    keys.forEach((key) => {
      const value = categoryMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post('/categories', formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const updateCategory = createAsyncThunk<
  void,
  { id: string; categoryMutation: CategoryMutation },
  { rejectValue: ValidationError }
>(
  'categories/update',
  async ({ id, categoryMutation }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(categoryMutation) as (keyof CategoryMutation)[];

      keys.forEach((key) => {
        const value = categoryMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.put('/categories/' + id, formData);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data as ValidationError);
      }
      throw e;
    }
  },
);

export const removeCategory = createAsyncThunk<void, string>(
  'categories/remove',
  async (id) => {
    await axiosApi.delete('/categories/' + id);
  },
);
