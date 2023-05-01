import { GlobalError, IPagination, User, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchOneBasicUser,
  googleLogin,
  login,
  register,
  updateIsBannedStatus,
  updateUser,
} from '@/src/dispatchers/users/usersThunks';
import { RootState } from '@/src/app/store';

interface UsersState {
  user: User | null;
  users: User[];
  oneBasicUser: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
  fetchOneUserLoading: boolean;
  updateUserLoading: false | string;
  updateUserError: ValidationError | null;
  currentPage: number;
  totalCount: number;
}

const initialState: UsersState = {
  user: null,
  users: [],
  oneBasicUser: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
  fetchOneUserLoading: false,
  updateUserLoading: false,
  updateUserError: null,
  currentPage: 1,
  totalCount: 1,
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
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserError = null;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload: user }) => {
      state.user = user;
    });
    builder.addCase(updateUser.rejected, (state, { payload: error }) => {
      state.updateUserError = error || null;
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
    builder.addCase(fetchUsers.pending, (state) => {
      state.fetchLoading = true;
      state.users = [];
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<User>;
      state.users = result.users;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(
      updateIsBannedStatus.pending,
      (state, { meta: { arg: id } }) => {
        state.updateUserLoading = id;
      },
    );
    builder.addCase(updateIsBannedStatus.fulfilled, (state) => {
      state.updateUserLoading = false;
    });
    builder.addCase(updateIsBannedStatus.rejected, (state) => {
      state.updateUserLoading = false;
    });

    builder.addCase(fetchOneBasicUser.pending, (state) => {
      state.fetchOneUserLoading = true;
      state.users = [];
    });
    builder.addCase(fetchOneBasicUser.fulfilled, (state, { payload: user }) => {
      state.fetchOneUserLoading = false;
      state.oneBasicUser = user;
    });
    builder.addCase(fetchOneBasicUser.rejected, (state) => {
      state.fetchOneUserLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectOneBasicUser = (state: RootState) =>
  state.users.oneBasicUser;
export const selectRegisterLoading = (state: RootState) =>
  state.users.registerLoading;
export const selectRegisterError = (state: RootState) =>
  state.users.registerError;
export const selectLoginLoading = (state: RootState) =>
  state.users.loginLoading;
export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectUpdateUserLoading = (state: RootState) =>
  state.users.updateUserLoading;
export const selectUpdateUserError = (state: RootState) =>
  state.users.updateUserError;
export const selectFetchingOneUser = (state: RootState) =>
  state.users.fetchOneUserLoading;
export const selectUsersCount = (state: RootState) => state.users.totalCount;
export const selectUserPage = (state: RootState) => state.users.currentPage;
