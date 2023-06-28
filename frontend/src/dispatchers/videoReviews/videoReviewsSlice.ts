import { ApiVideoReview, IPagination, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createVideoReview,
  deleteVideoReview,
  fetchOneVideoReview,
  fetchVideoReviews,
  updateVideoReview,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import { RootState } from '@/src/store/store';

interface CommentsState {
  items: ApiVideoReview[];
  fetchLoading: boolean;
  oneVideoReview: ApiVideoReview | null;
  fetchOneLoading: boolean;
  submitting: boolean;
  error: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  oneVideoReview: null,
  fetchOneLoading: false,
  submitting: false,
  error: null,
  deleteLoading: false,
  currentPage: 1,
  totalCount: 1,
};

const videoReviewsSlice = createSlice({
  name: 'videoReviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVideoReviews.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchVideoReviews.fulfilled, (state, { payload }) => {
      state.fetchLoading = false;
      const result = payload.result as IPagination<ApiVideoReview>;
      state.items = result.videoReviews;
      state.currentPage = result.currentPage;
      state.totalCount = result.totalCount;
    });
    builder.addCase(fetchVideoReviews.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(fetchOneVideoReview.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(
      fetchOneVideoReview.fulfilled,
      (state, { payload: videoReview }) => {
        state.fetchOneLoading = false;
        state.oneVideoReview = videoReview;
      },
    );
    builder.addCase(fetchOneVideoReview.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createVideoReview.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(createVideoReview.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(createVideoReview.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(updateVideoReview.pending, (state) => {
      state.error = null;
      state.submitting = true;
    });
    builder.addCase(updateVideoReview.fulfilled, (state) => {
      state.submitting = false;
    });
    builder.addCase(updateVideoReview.rejected, (state, { payload: error }) => {
      state.error = error || null;
      state.submitting = false;
    });

    builder.addCase(
      deleteVideoReview.pending,
      (state, { meta: { arg: id } }) => {
        state.deleteLoading = id;
      },
    );
    builder.addCase(deleteVideoReview.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteVideoReview.rejected, (state) => {
      state.deleteLoading = false;
    });
  },
});

export const videoReviewsReducer = videoReviewsSlice.reducer;

export const selectVideoReviews = (state: RootState) =>
  state.videoReviews.items;
export const selectVideoReviewsFetching = (state: RootState) =>
  state.videoReviews.fetchLoading;
export const selectOneVideoReview = (state: RootState) =>
  state.videoReviews.oneVideoReview;
export const selectOneVideoReviewFetching = (state: RootState) =>
  state.videoReviews.fetchOneLoading;
export const selectVideoReviewSubmitting = (state: RootState) =>
  state.videoReviews.submitting;
export const selectVideoReviewError = (state: RootState) =>
  state.videoReviews.error;
export const selectVideoReviewsCount = (state: RootState) =>
  state.videoReviews.totalCount;
export const selectVideoReviewsPage = (state: RootState) =>
  state.videoReviews.currentPage;
export const selectVideoReviewDeleting = (state: RootState) =>
  state.videoReviews.deleteLoading;
