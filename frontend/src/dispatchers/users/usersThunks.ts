import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  UpdateUserMutation,
  User,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';

export const register = createAsyncThunk<
  User,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (registerMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(registerMutation) as (keyof RegisterMutation)[];

    keys.forEach((key) => {
      const value = registerMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const login = createAsyncThunk<
  User,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(unsetUser());
  },
);

export const googleLogin = createAsyncThunk<
  User,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<RegisterResponse>('/users/google', {
      credential,
    });
    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

interface UpdateUserParams {
  user: UpdateUserMutation;
}

export const updateUser = createAsyncThunk<
  User,
  UpdateUserParams,
  { rejectValue: ValidationError }
>('users/update', async (params, { rejectWithValue }) => {
  const formData = new FormData();

  const keys = Object.keys(params.user) as (keyof UpdateUserMutation)[];

  keys.forEach((key) => {
    const value = params.user[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const response = await axiosApi.patch('/users', formData);
    return response.data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface SearchParam {
  role?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isBanned?: string;
  page?: number;
  limit?: number;
}

export const fetchUsers = createAsyncThunk<
  ApiResponse<User>,
  SearchParam | undefined
>('users/fetch', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const url = `/users/${queryString ? `?${queryString}` : ''}`;
  const { data } = await axiosApi.get<ApiResponse<User>>(url);
  return data;
});

export const fetchOneBasicUser = createAsyncThunk<User, string>(
  'users/fetchOneBasicUser',
  async (id) => {
    const response = await axiosApi.get<User>('/users/basic/' + id);
    return response.data;
  },
);

export const updateIsBannedStatus = createAsyncThunk<void, string>(
  'users/updateIsBannedStatus',
  async (id) => {
    await axiosApi.patch('/users/isBanned/' + id);
  },
);