import axiosApi from '@/src/axiosApi';
import { ApiTransaction } from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSingleTransaction = createAsyncThunk<ApiTransaction, string>(
  'transactions/fetchSingle',
  async (id) => {
    const { data } = await axiosApi.get(`transactions/${id}`);
    return data;
  },
);
