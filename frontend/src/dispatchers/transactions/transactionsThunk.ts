import axiosApi from '@/src/axiosApi';
import { ApiTransaction, TransactionResponse } from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSingleTransaction = createAsyncThunk<ApiTransaction, string>(
  'transactions/fetchSingle',
  async (id) => {
    const { data } = await axiosApi.get(`transactions/${id}`);
    return data;
  },
);

export const fetchTransactions = createAsyncThunk<
  TransactionResponse,
  number | undefined
>('transactions/fetch', async (page = 1) => {
  const { data } = await axiosApi.get<TransactionResponse>(
    `/transactions?page=${page}`,
  );
  return data;
});
