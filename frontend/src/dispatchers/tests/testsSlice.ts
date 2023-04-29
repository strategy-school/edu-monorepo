import { Test, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';

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
});
export const testsReducer = testsSlice.reducer;
