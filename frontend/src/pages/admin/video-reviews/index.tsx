import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectVideoReviewDeleting,
  selectVideoReviews,
  selectVideoReviewsCount,
  selectVideoReviewsPage,
} from '@/src/dispatchers/videoReviews/videoReviewsSlice';
import {
  deleteVideoReview,
  fetchVideoReviews,
} from '@/src/dispatchers/videoReviews/videoReviewsThunks';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectVideoReviews);
  const deleting = useAppSelector(selectVideoReviewDeleting);
  const currentPage = useAppSelector(selectVideoReviewsPage);
  const totalCount = useAppSelector(selectVideoReviewsCount);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchVideoReviews({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление видео отзыва')) {
      await dispatch(deleteVideoReview(id));
      dispatch(fetchVideoReviews({ page, limit }));
    }
  };

  const openOneReview = (id: string) => {
    void router.push(`video-reviews/${id}`);
  };

  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Видео отзывы</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="video-reviews/new-review"
              color="primary"
              variant="contained"
            >
              Добавить новый отзыв
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  <TableCell>Видео отзывы</TableCell>
                  <TableCell align="right">Изменить</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review._id} hover>
                    <TableCell
                      sx={{ cursor: 'pointer' }}
                      onClick={() => openOneReview(review._id)}
                    >
                      {review.title}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        href={`video-reviews/edit/${review._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(review._id)}
                        disabled={review._id === deleting}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={totalCount}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={(_, newPage) => setPage(newPage + 1)}
                    onRowsPerPageChange={(e) =>
                      setLimit(parseInt(e.target.value))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Index;
