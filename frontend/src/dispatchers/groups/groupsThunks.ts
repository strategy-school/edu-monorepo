import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiGroup, ApiResponse } from '@/src/types';
import axiosApi from '@/src/axiosApi';

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
