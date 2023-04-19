import { GlobalError, User, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBasicUsers,
  googleLogin,
  login,
  register,
} from '@/src/features/users/usersThunks';
import { RootState } from '@/src/app/store';

interface UsersState {
  user: User | null;
  basicUsersList: User[];
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  basicUsersList: [],
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload: user }) => {
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
      state.registerLoading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.user = user;
    });
    builder.addCase(googleLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(fetchBasicUsers.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchBasicUsers.fulfilled, (state, { payload: users }) => {
      state.fetchLoading = false;
      state.basicUsersList = users;
    });
    builder.addCase(fetchBasicUsers.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectBasicUsers = (state: RootState) =>
  state.users.basicUsersList;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
