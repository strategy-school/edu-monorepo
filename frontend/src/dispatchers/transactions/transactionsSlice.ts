import { RootState } from '@/src/app/store';
import { ApiTransaction, IPagination } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createTransaction,
  deleteTransaction,
  fetchSingleTransaction,
  fetchTransactions,
  markTransactionAsPaid,
} from './transactionsThunk';

interface TransitionsState {
  loadingAll: boolean;
  loadingOne: boolean;
  items: ApiTransaction[];
  item: ApiTransaction | null;
  currentPage: number;
  totalCount: number;
  MarkingAsPaid: boolean;
  deleting: boolean;
  creating: boolean;
}

const initialState: TransitionsState = {
  loadingAll: false,
  loadingOne: false,
  items: [],
  item: null,
  currentPage: 1,
  totalCount: 1,
  MarkingAsPaid: false,
  deleting: false,
  creating: false,
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
      .addCase(fetchSingleTransaction.fulfilled, (state, { payload }) => {
        state.loadingOne = false;
        const result = payload.result as ApiTransaction;
        state.item = result;
      })
      .addCase(fetchSingleTransaction.rejected, (state) => {
        state.loadingOne = false;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loadingOne = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, { payload }) => {
        state.loadingAll = false;
        const result = payload.result as IPagination<ApiTransaction>;
        state.items = result.transactions;
        state.currentPage = result.currentPage;
        state.totalCount = result.totalCount;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loadingAll = false;
      })
      .addCase(markTransactionAsPaid.pending, (state) => {
        state.MarkingAsPaid = true;
      })
      .addCase(markTransactionAsPaid.fulfilled, (state) => {
        state.MarkingAsPaid = false;
      })
      .addCase(markTransactionAsPaid.rejected, (state) => {
        state.MarkingAsPaid = false;
      })
      .addCase(deleteTransaction.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.deleting = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.deleting = false;
      })
      .addCase(createTransaction.pending, (state) => {
        state.creating = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.creating = false;
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
export const selectTransactionPaying = (state: RootState) =>
  state.transactions.MarkingAsPaid;
export const selectTransactionDeleting = (state: RootState) =>
  state.transactions.deleting;
export const selectTransactionCreating = (state: RootState) =>
  state.transactions.creating;
