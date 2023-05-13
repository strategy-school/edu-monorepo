import React from 'react';
import Layout from '@/src/components/UI/Layout/Layout';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';

const VideoReviews = () => {
  return (
    <Layout title="Strategia School: Video Reviews">
      <VideoReviewsWrapper isAll />
    </Layout>
  );
};

export default VideoReviews;
