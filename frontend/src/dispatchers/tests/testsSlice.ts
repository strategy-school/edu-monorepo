import { Test, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { createTest, fetchTests } from '@/src/dispatchers/tests/testsThunks';
import { RootState } from '@/src/app/store';

interface TestsState {
  tests: Test[];
  test: Test | null;
  fetchLoading: boolean;
  createLoading: boolean;
  createTestError: ValidationError | null;
  updateLoading: boolean;
  updateTestError: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: TestsState = {
  tests: [],
  test: null,
  fetchLoading: false,
  createLoading: false,
  createTestError: null,
  updateLoading: false,
  updateTestError: null,
  deleteLoading: false,
};

const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTest.pending, (state) => {
      state.createTestError = null;
      state.createLoading = true;
    });
    builder.addCase(createTest.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTest.rejected, (state, { payload: error }) => {
      state.createTestError = error || null;
      state.createLoading = false;
    });
    builder.addCase(fetchTests.pending, (state) => {
      state.tests = [];
      state.fetchLoading = true;
    });
    builder.addCase(fetchTests.fulfilled, (state, { payload: tests }) => {
      state.fetchLoading = false;
      state.tests = tests;
    });
    builder.addCase(fetchTests.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});
export const testsReducer = testsSlice.reducer;
export const selectTests = (state: RootState) => state.tests.tests;
export const selectOneTest = (state: RootState) => state.tests.test;
export const selectTestsFetching = (state: RootState) =>
  state.tests.fetchLoading;
export const selectTestCreating = (state: RootState) =>
  state.tests.createLoading;
export const selectTestUpdating = (state: RootState) =>
  state.tests.updateLoading;
export const selectTestDeleting = (state: RootState) =>
  state.tests.deleteLoading;
export const selectTestCreatingError = (state: RootState) =>
  state.tests.createTestError;
export const selectTestUpdatingError = (state: RootState) =>
  state.tests.updateTestError;
