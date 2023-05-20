import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  Test,
  TestMini,
  TestMutation,
  ValidationError,
} from '@/src/types';
import { RootState } from '@/src/store/store';
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

interface SearchParam {
  page?: number;
  limit?: number;
  user?: string;
}

export const fetchTests = createAsyncThunk<
  ApiResponse<TestMini>,
  SearchParam | undefined
>('tests/fetchAll', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  const url = `/tests/${queryString ? `?${queryString}` : ''}`;
  const response = await axiosApi.get<ApiResponse<TestMini>>(url);
  return response.data;
});

export const fetchOneTest = createAsyncThunk<Test, string>(
  'tests/OneTest',
  async (id) => {
    const response = await axiosApi.get<Test>('/tests/' + id);
    return response.data;
  },
);
export const fetchTestByCategory = createAsyncThunk<TestMini[], string>(
  'tests/fetchByCategory',
  async (id) => {
    const response = await axiosApi.get<Test[]>('/tests/category/' + id);
    return response.data;
  },
);

export const editTest = createAsyncThunk<
  void,
  { id: string; test: TestMutation },
  { rejectValue: ValidationError; state: RootState }
>('tests/update', async ({ id, test }, { rejectWithValue }) => {
  try {
    await axiosApi.patch(`/tests/${id}`, test);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteTest = createAsyncThunk<void, string>(
  'tests/delete',
  async (id) => {
    await axiosApi.delete('/tests/' + id);
  },
);
