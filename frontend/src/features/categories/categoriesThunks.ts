import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '@/src/types';
import axiosApi from '@/src/axiosApi';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get('/categories');
    return response.data;
  },
);
