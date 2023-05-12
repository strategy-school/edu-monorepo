import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  ApiVideoReview,
  IVideoReview,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

interface SeacrhParam {
  limit?: number;
  page?: number;
}

export const fetchVideoReviews = createAsyncThunk<
  ApiResponse<ApiVideoReview>,
  SeacrhParam | undefined
>('videoReviews/fetchAll', async (params) => {
  const queryString =
    params &&
    Object.entries(params)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  const url = `/video-reviews${queryString ? `?${queryString}` : ''}`;
  const response = await axiosApi.get<ApiResponse<ApiVideoReview>>(url);
  return response.data;
});

export const fetchOneVideoReview = createAsyncThunk<ApiVideoReview, string>(
  'videoReviews/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ApiVideoReview>(`/video-reviews/${id}`);
    return response.data;
  },
);

export const createVideoReview = createAsyncThunk<
  void,
  IVideoReview,
  { rejectValue: ValidationError }
>('videoReviews/create', async (videoReviewMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    const keys = Object.keys(videoReviewMutation) as (keyof IVideoReview)[];

    keys.forEach((key) => {
      const value = videoReviewMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/video-reviews', formData);
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
    const formData = new FormData();

    const keys = Object.keys(videoReview) as (keyof IVideoReview)[];

    keys.forEach((key) => {
      const value = videoReview[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.put(`/video-reviews/${id}`, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteVideoReview = createAsyncThunk<void, string>(
  'videoReviews/delete',
  async (id) => {
    await axiosApi.delete('/video-reviews/' + id);
  },
);
