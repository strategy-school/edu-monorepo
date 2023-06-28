import React, { useEffect, useState } from 'react';
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

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  let sliceStart, sliceEnd;

  if (windowWidth >= 900 && windowWidth <= 1200) {
    sliceStart = 0;
    sliceEnd = 3;
  } else {
    sliceStart = 0;
    sliceEnd = 4;
  }

  const slicedReviews = reviews.slice(sliceStart, sliceEnd);

  return (
    <Grid container spacing={4} direction="column">
      <Grid item textAlign="center">
        <Typography
          variant={isAll ? 'h3' : 'h4'}
          fontSize={{ xs: '2rem', sm: '3rem' }}
        >
          Видео отзывы о Школе Маркетинга Strategia
        </Typography>
      </Grid>
      <Grid item container spacing={3} alignItems="center">
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
          slicedReviews.map((review) => (
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
