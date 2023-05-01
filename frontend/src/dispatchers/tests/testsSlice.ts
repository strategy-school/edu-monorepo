import { Test, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createTest,
  fetchTests,
  editTest,
  fetchOneTest,
} from '@/src/dispatchers/tests/testsThunks';
import { RootState } from '@/src/app/store';
import {
  editTeacher,
  fetchOneTeacher,
} from '@/src/dispatchers/teachers/teachersThunks';

interface TestsState {
  test: Test | null;
  fetchLoading: boolean;
  createLoading: boolean;
  createTestError: ValidationError | null;
  updateLoading: boolean;
  updateTestError: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: TestsState = {
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

    builder.addCase(editTest.pending, (state) => {
      state.updateTestError = null;
      state.updateLoading = true;
    });
    builder.addCase(editTest.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(editTest.rejected, (state, { payload: error }) => {
      state.updateTestError = error || null;
      state.updateLoading = false;
    });
  },
});
export const testsReducer = testsSlice.reducer;
