import { RootState } from '@/src/store/store';
import {
  changePassword,
  fetchOneBasicUser,
  fetchUsers,
  forgotPassword,
  getMe,
  googleLogin,
  login,
  register,
  removeUserAvatar,
  resetPassword,
  telegramLogin,
  updateIsBannedStatus,
  updateTelegramUser,
  updateUser,
  uploadUserAvatar,
  verifyEmail,
} from '@/src/dispatchers/users/usersThunks';
import { GlobalError, IPagination, User, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface UsersState {
  user: User | null;
  users: User[];
  telegramUser: User | null;
  oneBasicUser: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  verifyEmailLoading: boolean;
  loginLoading: boolean;
  loginError: GlobalError | null;
  fetchLoading: boolean;
  fetchOneUserLoading: boolean;
  updateUserLoading: false | string;
  updateUserError: ValidationError | null;
  passwordChanging: boolean;
  passwordChangeError: GlobalError | null;
  passwordForgetLoading: boolean;
  passwordForgetError: GlobalError | null;
  passwordResetLoading: boolean;
  passwordResetError: GlobalError | null;
  currentPage: number;
  totalCount: number;
}

const initialState: UsersState = {
  user: null,
  users: [],
  telegramUser: null,
  oneBasicUser: null,
  registerLoading: false,
  registerError: null,
  verifyEmailLoading: false,
  loginLoading: false,
  loginError: null,
  fetchLoading: false,
  fetchOneUserLoading: false,
  updateUserLoading: false,
  updateUserError: null,
  passwordChanging: false,
  passwordChangeError: null,
  passwordForgetLoading: false,
  passwordForgetError: null,
  passwordResetLoading: false,
  passwordResetError: null,
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
    builder.addCase(HYDRATE, (_, action) => {
      //@ts-expect-error hydrate action's payload is not typed
      return action.payload.users;
    });
    builder.addCase(register.pending, (state) => {
      state.registerError = null;
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.verifyEmailLoading = true;
    });
    builder.addCase(verifyEmail.fulfilled, (state, { payload: user }) => {
      state.verifyEmailLoading = false;
      state.user = user;
    });
    builder.addCase(verifyEmail.rejected, (state) => {
      state.verifyEmailLoading = false;
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

    builder.addCase(telegramLogin.pending, (state) => {
      state.loginLoading = true;
      state.registerLoading = true;
    });
    builder.addCase(telegramLogin.fulfilled, (state, { payload: response }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      if (response.user.verified && response.user.isTelegramUpdated) {
        state.user = response.user;
      } else {
        state.telegramUser = response.user;
      }
    });
    builder.addCase(telegramLogin.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.registerLoading = false;
      state.registerError = error || null;
    });

    builder.addCase(updateTelegramUser.pending, (state) => {
      state.loginLoading = true;
      state.loginError = null;
    });
    builder.addCase(
      updateTelegramUser.fulfilled,
      (state, { payload: user }) => {
        state.loginLoading = false;
        state.telegramUser = user;
      },
    );
    builder.addCase(
      updateTelegramUser.rejected,
      (state, { payload: error }) => {
        state.loginLoading = false;
        state.loginError = error || null;
      },
    );

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

    builder.addCase(changePassword.pending, (state) => {
      (state.passwordChangeError = null), (state.passwordChanging = true);
    });
    builder.addCase(changePassword.fulfilled, (state, { payload: user }) => {
      state.passwordChangeError = null;
      state.passwordChanging = false;
      state.user = user;
    });
    builder.addCase(changePassword.rejected, (state, { payload: error }) => {
      state.passwordChanging = false;
      state.passwordChangeError = error || null;
    });

    builder.addCase(forgotPassword.pending, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.passwordForgetError = null;
      state.passwordForgetLoading = false;
    });
    builder.addCase(forgotPassword.rejected, (state, { payload: error }) => {
      state.passwordForgetError = error || null;
      state.passwordForgetLoading = false;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.passwordResetError = null;
      state.passwordResetLoading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.passwordResetError = null;
      state.passwordResetLoading = false;
    });
    builder.addCase(resetPassword.rejected, (state, { payload: error }) => {
      state.passwordResetError = error || null;
      state.passwordResetLoading = false;
    });
    builder.addCase(getMe.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(getMe.rejected, (state) => {
      state.loginLoading = false;
    });

    builder.addCase(removeUserAvatar.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(removeUserAvatar.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(removeUserAvatar.rejected, (state) => {
      state.loginLoading = false;
    });

    builder.addCase(uploadUserAvatar.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(uploadUserAvatar.fulfilled, (state, { payload: user }) => {
      state.loginLoading = false;
      state.user = user;
    });
    builder.addCase(uploadUserAvatar.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { unsetUser } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectUsers = (state: RootState) => state.users.users;
export const selectTelegramUser = (state: RootState) =>
  state.users.telegramUser;
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
export const selectPasswordChanging = (state: RootState) =>
  state.users.passwordChanging;
export const selectPasswordChangeError = (state: RootState) =>
  state.users.passwordChangeError;
export const selectVerifyEmailLoading = (state: RootState) =>
  state.users.verifyEmailLoading;
export const selectPasswordForgetLoading = (state: RootState) =>
  state.users.passwordForgetLoading;
export const selectPasswordForgetError = (state: RootState) =>
  state.users.passwordForgetError;
export const selectPasswordResetLoading = (state: RootState) =>
  state.users.passwordResetLoading;
export const selectPasswordResetError = (state: RootState) =>
  state.users.passwordResetError;
export const selectUsersCount = (state: RootState) => state.users.totalCount;
export const selectUserPage = (state: RootState) => state.users.currentPage;
