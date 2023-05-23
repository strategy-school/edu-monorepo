import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { createVideoReview } from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import VideoReviewForm from '@/src/features/videoReviews/VideoReviewForm/VideoReviewForm';
import { useAppDispatch } from '@/src/store/hooks';
import { IVideoReview } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewReview: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (reviewMutation: IVideoReview) => {
    await dispatch(createVideoReview(reviewMutation)).unwrap();
    void router.push('/admin/video-reviews');
  };

  return (
    <AdminLayout pageTitle="Добавить видео отзыв">
      <VideoReviewForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default NewReview;
