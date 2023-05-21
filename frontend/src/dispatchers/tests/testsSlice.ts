import { IPagination, Test, TestMini, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createTest,
  deleteTest,
  editTest,
  fetchOneTest,
  fetchTestByCategory,
  fetchTests,
} from '@/src/dispatchers/tests/testsThunks';
import { RootState } from '@/src/store/store';

interface TestsState {
  tests: TestMini[];
  test: Test | null;
  fetchLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: TestsState = {
  tests: [],
  test: null,
  fetchLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    cleanError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createTest.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createTest.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createTest.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(fetchTests.pending, (state) => {
      state.tests = [];
      state.fetchLoading = true;
    });
    builder.addCase(fetchTests.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<TestMini>;
      state.tests = result.tests;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchTests.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneTest.pending, (state) => {
      state.fetchLoading = true;
      state.test = null;
    });
    builder.addCase(fetchOneTest.fulfilled, (state, { payload: test }) => {
      state.fetchLoading = false;
      state.test = test;
    });
    builder.addCase(fetchOneTest.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchTestByCategory.pending, (state) => {
      state.tests = [];
      state.fetchLoading = true;
    });
    builder.addCase(
      fetchTestByCategory.fulfilled,
      (state, { payload: tests }) => {
        state.fetchLoading = false;
        state.tests = tests;
      },
    );
    builder.addCase(fetchTestByCategory.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(editTest.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(editTest.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(editTest.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(deleteTest.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteTest.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteTest.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const testsReducer = testsSlice.reducer;
export const { cleanError } = testsSlice.actions;
export const selectTests = (state: RootState) => state.tests.tests;
export const selectOneTest = (state: RootState) => state.tests.test;
export const selectTestsFetching = (state: RootState) =>
  state.tests.fetchLoading;
export const selectTestSubmitting = (state: RootState) =>
  state.tests.submitting;
export const selectTestDeleting = (state: RootState) =>
  state.tests.deleteLoading;
export const selectTestError = (state: RootState) => state.tests.error;
export const selectTestCount = (state: RootState) => state.tests.totalCount;
export const selectTestPage = (state: RootState) => state.tests.currentPage;
