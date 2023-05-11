import { ApiNotification, IPagination } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from '@/src/dispatchers/notifications/notificationsThunks';
import { RootState } from '@/src/app/store';

interface NotificationsState {
  items: ApiNotification[];
  oneItem: ApiNotification | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: NotificationsState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  currentPage: 1,
  totalCount: 1,
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
