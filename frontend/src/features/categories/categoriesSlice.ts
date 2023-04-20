import { Category } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '@/src/features/categories/categoriesThunks';
import { RootState } from '@/src/app/store';

interface CategoryState {
  items: Category[];
  oneItem: Category | null;
  fetchLoading: boolean;
}

const initialState: CategoryState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      state.items = payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetching = (state: RootState) =>
  state.categories.fetchLoading;
