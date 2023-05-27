import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiNotification,
  ApiResponse,
  INotification,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

interface SearchParam {
  page?: number;
  limit?: number;
}

export const fetchNotifications = createAsyncThunk<
  ApiResponse<ApiNotification>,
  SearchParam | undefined
>('notifications/fetchAll', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<ApiNotification>>(
    '/notifications',
    { params },
  );
  return data;
});

export const fetchUncheckedCount = createAsyncThunk<number, undefined>(
  'notifications/fetchUncheckedCount',
  async () => {
    const response = await axiosApi.get('/notifications/unchecked');
    return response.data.result;
  },
);

export const createNotification = createAsyncThunk<
  void,
  INotification,
  { rejectValue: ValidationError }
>('notification/create', async (notification, { rejectWithValue }) => {
  try {
    await axiosApi.post('/notifications', notification);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const notificationToggleChecked = createAsyncThunk<void, string>(
  'notifications/toggleIsChecked',
  async (id) => {
    await axiosApi.patch(`/notifications/${id}/toggleIsChecked`);
  },
);
