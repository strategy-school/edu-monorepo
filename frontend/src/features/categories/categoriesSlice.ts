import { Category, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createCategory,
  fetchCategories,
  fetchOneCategory,
  removeCategory,
  updateCategory,
} from '@/src/features/categories/categoriesThunks';
import { RootState } from '@/src/app/store';

interface CategoryState {
  items: Category[];
  oneItem: Category | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createCategoryError: ValidationError | null;
  updateCategoryError: ValidationError | null;
  deleteLoading: false | string;
  updateLoading: boolean;
}

const initialState: CategoryState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createCategoryError: null,
  updateCategoryError: null,
  deleteLoading: false,
  updateLoading: false,
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
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneCategory.fulfilled, (state, { payload }) => {
      state.fetchOneLoading = false;
      state.oneItem = payload;
    });
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state, { payload: error }) => {
      state.createLoading = false;
      state.createCategoryError = error || null;
    });
    builder.addCase(removeCategory.pending, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(
      removeCategory.fulfilled,
      (state, { meta: { arg: categoryId } }) => {
        state.deleteLoading = categoryId;
      },
    );
    builder.addCase(removeCategory.rejected, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.updateCategoryError = null;
      state.updateLoading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateCategory.rejected, (state, { payload: error }) => {
      state.updateCategoryError = error || null;
      state.updateLoading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetching = (state: RootState) =>
  state.categories.fetchLoading;
export const selectOneCategory = (state: RootState) => state.categories.oneItem;
export const selectOneCategoryFetching = (state: RootState) =>
  state.categories.fetchOneLoading;
export const selectCategoryCreating = (state: RootState) =>
  state.categories.createLoading;
export const selectCreateCategoryError = (state: RootState) =>
  state.categories.createCategoryError;
export const selectCategoryDeleting = (state: RootState) =>
  state.categories.deleteLoading;
export const selectCategoryUpdating = (state: RootState) =>
  state.categories.updateLoading;
export const selectUpdateCategoryError = (state: RootState) =>
  state.categories.updateCategoryError;
