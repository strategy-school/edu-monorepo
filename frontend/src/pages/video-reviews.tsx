import Layout from '@/src/components/UI/Layout/Layout';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';
import React from 'react';

const VideoReviews: React.FC = () => {
  return (
    <Layout title="Школа Маркетинга Strategia: Видео-отзывы">
      <VideoReviewsWrapper isAll />
    </Layout>
  );
};

export default VideoReviews;
