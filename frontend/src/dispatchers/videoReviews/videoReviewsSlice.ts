import { ApiVideoReview, IPagination, ValidationError } from '@/src/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  createVideoReview,
  deleteVideoReview,
  fetchOneVideoReview,
  fetchVideoReviews,
  updateVideoReview,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import { RootState } from '@/src/app/store';

interface CommentsState {
  items: ApiVideoReview[];
  fetchLoading: boolean;
  oneVideoReview: ApiVideoReview | null;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createVideoReviewError: ValidationError | null;
  updateLoading: boolean;
  updateVideoReviewError: ValidationError | null;
  deleteLoading: string | false;
  currentPage: number;
  totalCount: number;
}

const initialState: CommentsState = {
  items: [],
  fetchLoading: false,
  oneVideoReview: null,
  fetchOneLoading: false,
  createLoading: false,
  createVideoReviewError: null,
  updateLoading: false,
  updateVideoReviewError: null,
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
      state.createVideoReviewError = null;
      state.createLoading = true;
    });
    builder.addCase(createVideoReview.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createVideoReview.rejected, (state, { payload: error }) => {
      state.createVideoReviewError = error || null;
      state.createLoading = false;
    });

    builder.addCase(updateVideoReview.pending, (state) => {
      state.updateVideoReviewError = null;
      state.updateLoading = true;
    });
    builder.addCase(updateVideoReview.fulfilled, (state) => {
      state.updateLoading = false;
    });
    builder.addCase(updateVideoReview.rejected, (state, { payload: error }) => {
      state.updateVideoReviewError = error || null;
      state.updateLoading = false;
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
export const selectVideoReviewCreating = (state: RootState) =>
  state.videoReviews.createLoading;
export const selectCreateVideoReviewError = (state: RootState) =>
  state.videoReviews.createVideoReviewError;
export const selectVideoReviewUpdating = (state: RootState) =>
  state.videoReviews.updateLoading;
export const selectUpdateVideoReviewError = (state: RootState) =>
  state.videoReviews.updateVideoReviewError;
export const selectVideoReviewsCount = (state: RootState) =>
  state.videoReviews.totalCount;
export const selectVideoReviewsPage = (state: RootState) =>
  state.videoReviews.currentPage;
export const selectVideoReviewDeleting = (state: RootState) =>
  state.videoReviews.deleteLoading;
