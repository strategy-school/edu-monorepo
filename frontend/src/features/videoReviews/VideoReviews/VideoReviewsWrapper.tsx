import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectVideoReviews,
  selectVideoReviewsFetching,
} from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import { fetchVideoReviews } from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import VideoReviewItem from '@/src/features/videoReviews/VideoReviewItem/VideoReviewItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

interface Props {
  isAll?: boolean;
}

const VideoReviewsWrapper: React.FC<Props> = ({ isAll = false }) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectVideoReviews);
  const loading = useAppSelector(selectVideoReviewsFetching);

  useEffect(() => {
    dispatch(fetchVideoReviews());
  }, [dispatch]);

  return (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Typography variant={isAll ? 'h3' : 'h4'}>
          Видео отзывы о школе Strategia School
        </Typography>
      </Grid>
      <Grid item container spacing={3} justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : isAll ? (
          reviews.map((review) => (
            <VideoReviewItem
              key={review._id}
              title={review.title}
              previewImage={review.previewImage}
              youtubeURL={review.youtubeURL}
            />
          ))
        ) : (
          reviews
            .slice(0, 4)
            .map((review) => (
              <VideoReviewItem
                key={review._id}
                title={review.title}
                previewImage={review.previewImage}
                youtubeURL={review.youtubeURL}
              />
            ))
        )}
      </Grid>
      {!isAll && (
        <Grid item container justifyContent="flex-end">
          <Grid item>
            <Typography component={Link} variant="h6" href={'/video-reviews'}>
              Смотреть все
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: '5px' }}>
            <ArrowForwardIosIcon />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoReviewsWrapper;
