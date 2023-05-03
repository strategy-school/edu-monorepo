import { RootState } from '@/src/app/store';
import { ApiCategory, IPagination, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  categoryToggleDeleted,
  createCategory,
  fetchCategories,
  fetchOneCategory,
  removeCategory,
  updateCategory,
} from './categoriesThunks';

interface CategoryState {
  items: ApiCategory[];
  oneItem: ApiCategory | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  togglingIsDeleted: boolean;
  createCategoryError: ValidationError | null;
  updateCategoryError: ValidationError | null;
  deleteLoading: false | string;
  updateLoading: boolean;
  currentPage: number;
  totalCount: number;
}

const initialState: CategoryState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  togglingIsDeleted: false,
  createCategoryError: null,
  updateCategoryError: null,
  deleteLoading: false,
  updateLoading: false,
  currentPage: 1,
  totalCount: 1,
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
      const result = payload.result as IPagination<ApiCategory>;
      state.items = result.categories;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
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
    builder.addCase(categoryToggleDeleted.pending, (state) => {
      state.togglingIsDeleted = true;
    });
    builder.addCase(categoryToggleDeleted.fulfilled, (state) => {
      state.togglingIsDeleted = false;
    });
    builder.addCase(categoryToggleDeleted.rejected, (state) => {
      state.togglingIsDeleted = false;
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
export const selectCategoriesCount = (state: RootState) =>
  state.categories.totalCount;
export const selectCategoriesPage = (state: RootState) =>
  state.categories.currentPage;
export const selectCategoryTogglingDeleted = (state: RootState) =>
  state.categories.togglingIsDeleted;
