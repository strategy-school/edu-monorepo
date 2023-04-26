import { RootState } from '@/src/app/store';
import { ApiTransaction } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchSingleTransaction } from './transactionsThunk';

interface TransitionsState {
  loadingAll: boolean;
  loadingOne: boolean;
  items: ApiTransaction[];
  item: ApiTransaction | null;
}

const initialState: TransitionsState = {
  loadingAll: false,
  loadingOne: false,
  items: [],
  item: null,
};

const transactionsSlice = createSlice({
  name: 'transacions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSingleTransaction.pending, (state) => {
        state.loadingOne = true;
      })
      .addCase(
        fetchSingleTransaction.fulfilled,
        (state, { payload: transaction }) => {
          state.loadingOne = false;
          state.item = transaction;
        },
      )
      .addCase(fetchSingleTransaction.rejected, (state) => {
        state.loadingOne = false;
      });
  },
});

export const transacionsReducer = transactionsSlice.reducer;
export const selectTransactions = (state: RootState) =>
  state.transactions.items;
export const selectSingleTransaction = (state: RootState) =>
  state.transactions.item;
export const selectTransactionsLoading = (state: RootState) =>
  state.transactions.loadingAll;
export const selectSingleTransactionLoading = (state: RootState) =>
  state.transactions.loadingOne;
