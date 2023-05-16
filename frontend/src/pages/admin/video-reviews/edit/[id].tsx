import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { IVideoReview } from '@/src/types';
import {
  selectOneVideoReview,
  selectOneVideoReviewFetching,
  selectUpdateVideoReviewError,
  selectVideoReviewUpdating,
} from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import {
  fetchOneVideoReview,
  updateVideoReview,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import VideoReviewForm from '@/src/features/videoReviews/VideoReviewForm/VideoReviewForm';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const review = useAppSelector(selectOneVideoReview);
  const fetchOneLoading = useAppSelector(selectOneVideoReviewFetching);
  const updateLoading = useAppSelector(selectVideoReviewUpdating);
  const error = useAppSelector(selectUpdateVideoReviewError);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneVideoReview(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (ReviewMutation: IVideoReview) => {
    await dispatch(
      updateVideoReview({ id, videoReview: ReviewMutation }),
    ).unwrap();
    void router.back();
  };

  const existingReview = review && {
    title: review.title,
    youtubeURL: review.youtubeURL,
    previewImage: null,
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia edit video review">
        {existingReview && (
          <VideoReviewForm
            onSubmit={onSubmit}
            loading={updateLoading}
            error={error}
            existingReview={existingReview}
            isEdit
            fetchReviewLoading={fetchOneLoading}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Id;
