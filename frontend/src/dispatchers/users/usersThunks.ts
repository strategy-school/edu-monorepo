import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  GlobalError,
  IChangePassword,
  LoginMutation,
  PageLimit,
  RegisterMutation,
  RegisterResponse,
  TelegramLogin,
  UpdateUserMutation,
  User,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';
import { unsetUser } from './usersSlice';
import { destroyCookie, setCookie } from 'nookies';
import { strategiaToken } from '@/src/constants';

export const register = createAsyncThunk<
  void,
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

    await axiosApi.post('/users', formData);
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
    const { data } = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    const { user } = data;

    setCookie(null, strategiaToken, user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return user;
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
    destroyCookie(null, strategiaToken);
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
    const { user } = data;

    setCookie(null, strategiaToken, user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return user;
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

type SearchParam = Partial<
  Pick<
    User,
    'role' | 'email' | 'firstName' | 'lastName' | 'isBanned' | 'phoneNumber'
  > &
    PageLimit
>;

export const fetchUsers = createAsyncThunk<
  ApiResponse<User>,
  SearchParam | undefined
>('users/fetch', async (params) => {
  const { data } = await axiosApi.get<ApiResponse<User>>('/users', { params });
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

export const changePassword = createAsyncThunk<
  User,
  IChangePassword,
  { rejectValue: GlobalError }
>('users/changePassword', async (passwords, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<ApiResponse<User>>(
      '/users/change-password',
      passwords,
    );
    return data.result as User;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

interface ForgotPasswordPayload {
  email: string;
}

export const forgotPassword = createAsyncThunk<
  void,
  ForgotPasswordPayload,
  { rejectValue: GlobalError }
>('users/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    await axiosApi.post('/users/forgot-password', email);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

interface ResetPassword {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export const resetPassword = createAsyncThunk<
  void,
  ResetPassword,
  { rejectValue: GlobalError }
>('users/resetPassword', async (data, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post(
      `/users/reset-password/${data.token}`,
      {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      },
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }
    throw error;
  }
});

export const verifyEmail = createAsyncThunk<User, string>(
  'users/verifyEmail',
  async (token) => {
    const { data } = await axiosApi.post<RegisterResponse>(
      `/users/verify-email/${token}`,
    );
    const { user } = data;

    setCookie(null, strategiaToken, user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return user;
  },
);

export const getMe = createAsyncThunk(
  'users/getSelf',
  async (token: string) => {
    const { data } = await axiosApi.get<ApiResponse<User>>('/users/me', {
      headers: { Authorization: token },
    });

    const user = <User>data.result;

    setCookie(null, 'token', user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return user;
  },
);

export const telegramLogin = createAsyncThunk<
  RegisterResponse,
  TelegramLogin,
  { rejectValue: ValidationError }
>('users/telegramLogin', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.post<RegisterResponse>(
      '/users/telegram',
      userData,
    );

    const { user } = data;

    setCookie(null, strategiaToken, user.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface PatchUserData {
  id: string;
  email: string;
  lastName: string;
}

export const updateTelegramUser = createAsyncThunk<
  User,
  PatchUserData,
  { rejectValue: GlobalError }
>('users/updateTelegramUser', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.patch<RegisterResponse>(
      `/users/telegram/${userData.id}`,
      {
        email: userData.email,
        lastName: userData.lastName,
      },
    );
    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});

export const removeUserAvatar = createAsyncThunk<User>(
  'user/removeAvatar',
  async () => {
    const { data } = await axiosApi.patch<RegisterResponse>(
      `users/remove-avatar`,
    );
    return data.user;
  },
);
export const uploadUserAvatar = createAsyncThunk<
  User,
  { avatar: FormData },
  { rejectValue: GlobalError }
>('user/sendAvatar', async ({ avatar }, { rejectWithValue }) => {
  try {
    const { data } = await axiosApi.patch<RegisterResponse>(
      `/users/add-avatar`,
      avatar,
    );

    return data.user;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as GlobalError);
    }
    throw e;
  }
});
