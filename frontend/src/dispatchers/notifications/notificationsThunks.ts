import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiNotification, ApiResponse } from '@/src/types';
import axiosApi from '@/src/axiosApi';

interface SearchParam {
  page?: number;
  limit?: number;
}

export const fetchNotifications = createAsyncThunk<
  ApiResponse<ApiNotification>,
  SearchParam | undefined
>('notifications/fetchAll', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  const url = `/notifications${queryString ? `?${queryString}` : ''}`;
  const response = await axiosApi.get(url);
  return response.data;
});
