import axiosApi from '@/src/axiosApi';
import {
  ApiResponse,
  ApiTransaction,
  ITransaction,
  PageLimit,
} from '@/src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSingleTransaction = createAsyncThunk<
  ApiResponse<ApiTransaction>,
  string
>('transactions/fetchSingle', async (id) => {
  const { data } = await axiosApi.get<ApiResponse<ApiTransaction>>(
    `transactions/${id}`,
  );
  return data;
});

type SearchParam = Partial<
  ITransaction & PageLimit & { isPaid: 'paid' | 'pending' }
>;

export const fetchTransactions = createAsyncThunk<
  ApiResponse<ApiTransaction>,
  SearchParam | undefined
>('transactions/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiTransaction>>(
    '/transactions',
    { params },
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

export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (transaction: ITransaction) => {
    await axiosApi.post('/transactions', transaction);
  },
);

export const editTransaction = createAsyncThunk<
  void,
  { transaction: ITransaction; id: string }
>('transactions/edit', async ({ transaction, id }) => {
  await axiosApi.put(`/transactions/${id}`, transaction);
});

export const fetchTransactionsByUser = createAsyncThunk<
  ApiTransaction[],
  string
>('transactions/fetchTransactionsByUser', async (userId) => {
  const response = await axiosApi.get<ApiTransaction[]>(
    `/transactions/${userId}`,
  );
  return response.data;
});
