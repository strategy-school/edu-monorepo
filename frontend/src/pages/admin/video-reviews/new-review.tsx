import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import {
  selectCreateVideoReviewError,
  selectVideoReviewCreating,
} from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import { IVideoReview } from '@/src/types';
import { createVideoReview } from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import VideoReviewForm from '@/src/features/videoReviews/VideoReviewForm/VideoReviewForm';

const NewReview = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectVideoReviewCreating);
  const error = useAppSelector(selectCreateVideoReviewError);
  const user = useAppSelector(selectUser);

  const onSubmit = async (reviewMutation: IVideoReview) => {
    await dispatch(createVideoReview(reviewMutation)).unwrap();
    void router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia new video review">
        <VideoReviewForm
          onSubmit={onSubmit}
          loading={createLoading}
          error={error}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default NewReview;
