import React, { useEffect } from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectOneVideoReview } from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import {
  deleteVideoReview,
  fetchOneVideoReview,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import YouTube, { YouTubeProps } from 'react-youtube';

const ReviewId = () => {
  const router = useRouter();
  const { reviewId } = router.query as { reviewId: string };
  const dispatch = useAppDispatch();
  const review = useAppSelector(selectOneVideoReview);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление видео отзыва')) {
      await dispatch(deleteVideoReview(id));
      void router.push('/admin/video-reviews');
    }
  };

  useEffect(() => {
    dispatch(fetchOneVideoReview(reviewId));
  }, [dispatch, reviewId]);

  const opts: YouTubeProps['opts'] = {
    height: '460',
    width: '300',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <AdminLayout>
      {review && (
        <Grid container direction="column" spacing={2}>
          <Grid container justifyContent="space-between" item>
            <Grid item>
              <Typography variant="h5">
                Видео отзыв <b>{review.title}</b>
              </Typography>
            </Grid>
            <Grid item>
              <Button component={Link} href={'edit/' + reviewId}>
                Редактировать
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(reviewId)}
              >
                Удалить
              </Button>
            </Grid>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={4}>
              <Box>
                <Typography variant="h6" mb={2}>
                  Отображаемая картинка:{' '}
                </Typography>
                <Image
                  width="230"
                  height="355"
                  src={`http://localhost:8000/${review.previewImage}`}
                  alt={review.title}
                  style={{ borderRadius: '7%' }}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6" mb={2}>
                Видео отзыв:{' '}
              </Typography>
              <Box style={{ maxWidth: '200px' }}>
                <YouTube videoId={review.youtubeURL} opts={opts} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default ReviewId;
