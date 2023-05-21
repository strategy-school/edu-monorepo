import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectOneVideoReview } from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import {
  fetchOneVideoReview,
  updateVideoReview,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import VideoReviewForm from '@/src/features/videoReviews/VideoReviewForm/VideoReviewForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { IVideoReview } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const review = useAppSelector(selectOneVideoReview);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneVideoReview(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (ReviewMutation: IVideoReview) => {
    await dispatch(
      updateVideoReview({ id, videoReview: ReviewMutation }),
    ).unwrap();
    void router.push('/admin/video-reviews');
  };

  const existingReview = review && {
    title: review.title,
    youtubeURL: review.youtubeURL,
    previewImage: null,
  };

  return (
    <AdminLayout pageTitle="Редактировать видео отзыв">
      {existingReview && (
        <VideoReviewForm onSubmit={onSubmit} existingReview={existingReview} />
      )}
    </AdminLayout>
  );
};

export default Id;
