import { createAsyncThunk } from '@reduxjs/toolkit';
import { Test, TestMutation, ValidationError } from '@/src/types';
import { RootState } from '@/src/app/store';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

export const createTest = createAsyncThunk<
  void,
  TestMutation,
  { rejectValue: ValidationError; state: RootState }
>('tests/create', async (test, { rejectWithValue }) => {
  try {
    await axiosApi.post('/tests', test);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const fetchTests = createAsyncThunk<Test[]>(
  'tests/fetchAll',
  async () => {
    const response = await axiosApi.get<Test[]>('/tests');
    return response.data;
  },
);
