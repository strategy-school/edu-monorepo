import { createAsyncThunk } from '@reduxjs/toolkit';
import { IVideoReview, ApiVideoReview, ValidationError } from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

export const fetchVideoReviews = createAsyncThunk(
  'videoReviews/fetchAll',
  async () => {
    const response = await axiosApi.get<ApiVideoReview[]>(`/video-reviews`);
    return response.data;
  },
);

export const createVideoReview = createAsyncThunk<
  void,
  IVideoReview,
  { rejectValue: ValidationError }
>('videoReviews/create', async (videoReviewMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post('/video-reviews', videoReviewMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface UpdateVideoReviewParams {
  id: string;
  videoReview: IVideoReview;
}

export const updateVideoReview = createAsyncThunk<
  void,
  UpdateVideoReviewParams,
  { rejectValue: ValidationError }
>('videoReviews/update', async ({ id, videoReview }, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/video-reviews/${id}`, videoReview);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteVideoReview = createAsyncThunk<void, string>(
  'video-reviews/delete',
  async (id) => {
    await axiosApi.delete('/videoReviews/' + id);
  },
);
