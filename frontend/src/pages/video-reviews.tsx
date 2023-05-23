import Layout from '@/src/components/UI/Layout/Layout';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';
import React from 'react';

const VideoReviews: React.FC = () => {
  return (
    <Layout title="Strategia School: Video Reviews">
      <VideoReviewsWrapper isAll />
    </Layout>
  );
};

export default VideoReviews;
