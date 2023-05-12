import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  ApiCategory,
  ICategory,
  ValidationError,
  PageLimit,
  GlobalError,
} from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

type SeacrhParam = Partial<Omit<ICategory, 'image'> & PageLimit>;

export const fetchCategories = createAsyncThunk<
  ApiResponse<ApiCategory>,
  SeacrhParam | undefined
>('categories/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiCategory>>('/categories', {
    params,
  });
  return data;
});

export const fetchOneCategory = createAsyncThunk<ApiCategory, string>(
  'categories/fetchOne',
  async (id) => {
    const response = await axiosApi.get('/categories/' + id);
    return response.data;
  },
);

export const createCategory = createAsyncThunk<
  void,
  ICategory,
  { rejectValue: ValidationError }
>('categories/create', async (categoryMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    const keys = Object.keys(categoryMutation) as (keyof ICategory)[];
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
  { id: string; categoryMutation: ICategory },
  { rejectValue: ValidationError }
>(
  'categories/update',
  async ({ id, categoryMutation }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(categoryMutation) as (keyof ICategory)[];

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

export const removeCategory = createAsyncThunk<
  void,
  string,
  { rejectValue: GlobalError }
>('categories/remove', async (id, { rejectWithValue }) => {
  try {
    await axiosApi.delete('/categories/' + id);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const categoryToggleDeleted = createAsyncThunk<void, string>(
  'categories/toggleIsDeleted',
  async (id) => {
    await axiosApi.patch(`/categories/${id}/toggleIsDeleted`);
  },
);
