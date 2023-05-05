import { ApiGroup, IPagination } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchGroups } from '@/src/dispatchers/groups/groupsThunks';
import { RootState } from '@/src/app/store';

interface GroupState {
  items: ApiGroup[];
  oneItem: ApiGroup | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: GroupState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  currentPage: 1,
  totalCount: 1,
};

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const groupReducer = groupSlice.reducer;

export const selectGroups = (state: RootState) => state.groups.items;
export const selectGroupsFetching = (state: RootState) =>
  state.groups.fetchLoading;
export const selectGroupsCount = (state: RootState) => state.groups.totalCount;
export const selectGroupPage = (state: RootState) => state.groups.currentPage;
