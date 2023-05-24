import { ApiCommentsResponse, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from '@/src/dispatchers/comments/commentsThunks';
import { HYDRATE } from 'next-redux-wrapper';

interface CommentsState {
  items: ApiCommentsResponse | null;
  fetchLoading: boolean;
  createLoading: boolean;
  createCommentError: ValidationError | null;
  updateLoading: boolean;
  updateCommentError: ValidationError | null;
  deleteLoading: string | false;
}

const initialState: CommentsState = {
  items: null,
  fetchLoading: false,
  createLoading: false,
  createCommentError: null,
  updateLoading: false,
  updateCommentError: null,
  deleteLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (_, action) => {
      //@ts-expect-error hydrate action's payload is not typed
      return action.payload.comments;
    });
    builder.addCase(fetchComments.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
      state.fetchLoading = false;
      state.items = comments;
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createComment.pending, (state) => {
      state.createCommentError = null;
      state.createLoading = true;
    });
    builder.addCase(createComment.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createComment.rejected, (state, { payload: error }) => {
      state.createCommentError = error || null;
      state.createLoading = false;
    });

    builder.addCase(updateComment.pending, (state) => {
      state.updateCommentError = null;
      state.updateLoading = true;
    });
    builder.addCase(updateComment.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateComment.rejected, (state, { payload: error }) => {
      state.updateCommentError = error || null;
      state.updateLoading = false;
    });

    builder.addCase(deleteComment.pending, (state, { meta: { arg: id } }) => {
      state.deleteLoading = id;
    });
    builder.addCase(deleteComment.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.items;
export const selectCommentsFetching = (state: RootState) =>
  state.comments.fetchLoading;
export const selectCommentCreating = (state: RootState) =>
  state.comments.createLoading;
export const selectCreateCommentError = (state: RootState) =>
  state.comments.createCommentError;
export const selectCommentUpdating = (state: RootState) =>
  state.comments.updateLoading;
export const selectUpdateCommentError = (state: RootState) =>
  state.comments.updateCommentError;
export const selectCommentDeleting = (state: RootState) =>
  state.comments.deleteLoading;
