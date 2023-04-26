import axiosApi from '@/src/axiosApi';
import { TransactionResponse } from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSingleTransaction = createAsyncThunk<
  TransactionResponse,
  string
>('transactions/fetchSingle', async (id) => {
  const { data } = await axiosApi.get<TransactionResponse>(
    `transactions/${id}`,
  );
  return data;
});

export const fetchTransactions = createAsyncThunk<
  TransactionResponse,
  { page: number | undefined; limit: number | undefined }
>('transactions/fetch', async ({ page, limit }) => {
  const { data } = await axiosApi.get<TransactionResponse>(
    `/transactions?page=${page}&limit=${limit}`,
  );
  return data;
});

export const markTransactionAsPaid = createAsyncThunk(
  'transactions/markAsPaid',
  async (id: string) => {
    await axiosApi.patch(`/transactions/${id}/markAsPaid`);
  },
);

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id: string) => {
    await axiosApi.delete(`/transactions/${id}`);
  },
);
