import { RootState } from '@/src/app/store';
import { ApiTransaction, TransactionPagination } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchSingleTransaction, fetchTransactions } from './transactionsThunk';

interface TransitionsState {
  loadingAll: boolean;
  loadingOne: boolean;
  items: ApiTransaction[];
  item: ApiTransaction | null;
  currentPage: number;
  totalCount: number;
}

const initialState: TransitionsState = {
  loadingAll: false,
  loadingOne: false,
  items: [],
  item: null,
  currentPage: 1,
  totalCount: 1,
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
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loadingOne = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state.loadingAll = false;
        const result = payload.result as TransactionPagination;
        state.items = result.transactions;
        state.currentPage = result.currentPage;
        state.totalCount = result.totalCount;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loadingAll = false;
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
export const selectTransactionsPage = (state: RootState) =>
  state.transactions.currentPage;
export const selectTransactionsTotalCount = (state: RootState) =>
  state.transactions.totalCount;
