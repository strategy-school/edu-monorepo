import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGroup, ApiResponse, IGroup, ValidationError } from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

interface SearchParam {
  page?: number;
  limit?: number;
  course?: string;
  startsAt?: string;
}

export const fetchGroups = createAsyncThunk<
  ApiResponse<ApiGroup>,
  SearchParam | undefined
>('groups/fetchAll', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  const url = `/groups${queryString ? `?${queryString}` : ''}`;
  const { data } = await axiosApi.get(url);
  return data;
});

export const fetchOneGroup = createAsyncThunk<ApiGroup, string>(
  'groups/fetchOne',
  async (id) => {
    const response = await axiosApi.get(`/groups/${id}`);
    return response.data;
  },
);

export const createGroup = createAsyncThunk<
  void,
  IGroup,
  { rejectValue: ValidationError }
>('groups/create', async (groupMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post('/groups', groupMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});
