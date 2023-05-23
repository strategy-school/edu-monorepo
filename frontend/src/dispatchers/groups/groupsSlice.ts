import {
  createGroup,
  fetchGroups,
  fetchOneGroup,
  removeGroup,
  updateGroup,
} from '@/src/dispatchers/groups/groupsThunks';
import { RootState } from '@/src/store/store';
import { ApiGroup, IPagination, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface GroupState {
  items: ApiGroup[];
  oneItem: ApiGroup | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: GroupState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      //@ts-expect-error hydrate action's payload is not typed
      return action.payload.groups;
    });
    builder.addCase(fetchGroups.pending, (state) => {
      state.fetchLoading = true;
      state.items = [];
    });
    builder.addCase(fetchGroups.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ApiGroup>;
      state.items = result.groups;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchGroups.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(fetchOneGroup.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneGroup.fulfilled, (state, { payload }) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneGroup.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createGroup.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createGroup.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createGroup.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });
    builder.addCase(updateGroup.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateGroup.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateGroup.rejected, (state, { payload: error }) => {
      state.submitting = false;
      state.error = error || null;
    });
    builder.addCase(removeGroup.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(removeGroup.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(removeGroup.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const groupReducer = groupSlice.reducer;
export const { cleanError } = groupSlice.actions;
export const selectGroups = (state: RootState) => state.groups.items;
export const selectGroupsFetching = (state: RootState) =>
  state.groups.fetchLoading;
export const selectGroupsCount = (state: RootState) => state.groups.totalCount;
export const selectGroupPage = (state: RootState) => state.groups.currentPage;
export const selectOneGroup = (state: RootState) => state.groups.oneItem;
export const selectOneGroupFetching = (state: RootState) =>
  state.groups.fetchOneLoading;
export const selectGroupSubmitting = (state: RootState) =>
  state.groups.submitting;
export const selectGroupError = (state: RootState) => state.groups.error;
export const selectGroupRemoving = (state: RootState) =>
  state.groups.deleteLoading;
