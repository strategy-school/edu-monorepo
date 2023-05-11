import { ApiNotification, IPagination } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotifications,
  notificationToggleChecked,
} from '@/src/dispatchers/notifications/notificationsThunks';
import { RootState } from '@/src/app/store';

interface NotificationsState {
  items: ApiNotification[];
  fetchLoading: boolean;
  currentPage: number;
  totalCount: number;
  togglingIsChecked: boolean;
}

const initialState: NotificationsState = {
  items: [],
  fetchLoading: false,
  currentPage: 1,
  totalCount: 1,
  togglingIsChecked: false,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ApiNotification>;
      state.items = result.notifications;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(notificationToggleChecked.pending, (state) => {
      state.togglingIsChecked = true;
    });
    builder.addCase(notificationToggleChecked.fulfilled, (state) => {
      state.togglingIsChecked = false;
    });
    builder.addCase(notificationToggleChecked.rejected, (state) => {
      state.togglingIsChecked = false;
    });
  },
});

export const notificationsReducer = notificationsSlice.reducer;

export const selectNotifications = (state: RootState) =>
  state.notifications.items;
export const selectNotificationsFetching = (state: RootState) =>
  state.notifications.fetchLoading;
export const selectNotificationsCount = (state: RootState) =>
  state.notifications.totalCount;
export const selectNotificationsPage = (state: RootState) =>
  state.notifications.currentPage;
