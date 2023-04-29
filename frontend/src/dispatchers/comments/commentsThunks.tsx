import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiCommentsResponse,
  IComment,
  ShortCommentMutation,
  ValidationError,
} from '@/src/types';
import axiosApi from '@/src/axiosApi';
import { isAxiosError } from 'axios';

export const fetchComments = createAsyncThunk<
  ApiCommentsResponse,
  string | undefined
>('comments/fetchAll', async (courseId) => {
  if (courseId) {
    const response = await axiosApi.get<ApiCommentsResponse>(
      `/comments?course=${courseId}`,
    );
    return response.data;
  }

  const response = await axiosApi.get<ApiCommentsResponse>('/comments');
  return response.data;
});

export const createComment = createAsyncThunk<
  void,
  IComment,
  { rejectValue: ValidationError }
>('comments/create', async (commentMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post('/comments', commentMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

interface UpdateCommentParams {
  id: string;
  comment: ShortCommentMutation;
}

export const updateComment = createAsyncThunk<
  void,
  UpdateCommentParams,
  { rejectValue: ValidationError }
>('comments/update', async ({ id, comment }, { rejectWithValue }) => {
  try {
    await axiosApi.put(`/comments/${id}`, comment);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data as ValidationError);
    }
    throw e;
  }
});

export const deleteComment = createAsyncThunk<void, string>(
  'comments/delete',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  },
);
