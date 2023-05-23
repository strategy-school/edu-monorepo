import { RootState } from '@/src/store/store';
import {
  ApiCategory,
  GlobalError,
  IPagination,
  ValidationError,
} from '@/src/types';
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
  submitting: boolean;
  togglingIsDeleted: boolean;
  error: ValidationError | null;
  removeError: GlobalError | null;
  deleteLoading: false | string;
  currentPage: number;
  totalCount: number;
}

const initialState: CategoryState = {
  items: [],
  oneItem: null,
  fetchLoading: false,
  fetchOneLoading: false,
  submitting: false,
  togglingIsDeleted: false,
  error: null,
  removeError: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
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
      state.submitting = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createCategory.rejected, (state, { payload: error }) => {
      state.submitting = false;
      state.error = error || null;
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
    builder.addCase(removeCategory.rejected, (state, { payload: error }) => {
      window.alert(
        'Категория не может быть удалена, так как у нее есть связанные курсы',
      );
      state.deleteLoading = false;
      state.removeError = error || null;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateCategory.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateCategory.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
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
export const { cleanError } = categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectCategoriesFetching = (state: RootState) =>
  state.categories.fetchLoading;
export const selectOneCategory = (state: RootState) => state.categories.oneItem;
export const selectOneCategoryFetching = (state: RootState) =>
  state.categories.fetchOneLoading;
export const selectCategorySubmitting = (state: RootState) =>
  state.categories.submitting;
export const selectCategoryError = (state: RootState) => state.categories.error;
export const selectCategoryDeleting = (state: RootState) =>
  state.categories.deleteLoading;
export const selectCategoriesCount = (state: RootState) =>
  state.categories.totalCount;
export const selectCategoriesPage = (state: RootState) =>
  state.categories.currentPage;
export const selectCategoryTogglingDeleted = (state: RootState) =>
  state.categories.togglingIsDeleted;
