import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  Category,
  CategoryMutation,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

export const fetchCategories = createAsyncThunk<ApiResponse<Category>>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<ApiResponse<Category>>('/categories');
    return response.data;
  },
);

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
