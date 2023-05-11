import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectVideoReviews } from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import { fetchVideoReviews } from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import { Grid, Typography } from '@mui/material';
import VideoReviewItem from '@/src/features/videoReviews/VideoReviewItem/VideoReviewItem';

const VideoReviews = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectVideoReviews);

  useEffect(() => {
    dispatch(fetchVideoReviews());
  }, [dispatch]);

  return (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Typography variant="h3">
          Видео отзывы о школе Strategia School
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          {reviews.map((review) => (
            <VideoReviewItem
              key={review._id}
              title={review.title}
              previewImage={review.previewImage}
              youtubeURL={review.youtubeURL}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoReviews;
