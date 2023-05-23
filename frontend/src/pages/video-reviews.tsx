import React from 'react';
import Layout from '@/src/components/UI/Layout/Layout';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';

const VideoReviews = () => {
  return (
    <Layout title="Школа Маркетинга Strategia: Видео-отзывы">
      <VideoReviewsWrapper isAll />
    </Layout>
  );
};

export default VideoReviews;
