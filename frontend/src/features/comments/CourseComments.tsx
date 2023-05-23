import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ShortCommentMutation } from '@/src/types';
import {
  selectCommentCreating,
  selectComments,
  selectCommentsFetching,
  selectCreateCommentError,
} from '@/src/dispatchers/comments/commentsSlice';
import {
  createComment,
  fetchComments,
} from '@/src/dispatchers/comments/commentsThunks';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import CommentItem from '@/src/features/comments/components/CommentItem/CommentItem';
import MyModal from '@/src/components/UI/Modal/MyModal';
import CommentForm from '@/src/features/comments/components/CommentForm/CommentForm';
import { selectUser } from '@/src/dispatchers/users/usersSlice';

interface Props {
  courseId: string;
}

const CourseComments: React.FC<Props> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const commentsLoading = useAppSelector(selectCommentsFetching);
  const createLoading = useAppSelector(selectCommentCreating);
  const error = useAppSelector(selectCreateCommentError);
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const [page, setPage] = useState(1);
  const limit = 4;

  const handleClose = () => {
    setOpen(!open);
  };

  const onSubmit = async (commentMutation: ShortCommentMutation) => {
    await dispatch(
      createComment({
        ...commentMutation,
        course: courseId,
      }),
    ).unwrap();
    void dispatch(fetchComments({ page, limit, courseId }));
    handleClose();
  };

  useEffect(() => {
    void dispatch(fetchComments({ page, limit, courseId }));
  }, [dispatch, page, limit, courseId]);

  return (
    <>
      {comments && (
        <Grid item m={4}>
          <Grid container spacing={2} mb={2}>
            <Grid item>
              <Typography variant="h5" mb={2}>
                Отзывы
              </Typography>
            </Grid>
            <Grid item>
              <Alert severity="success">Оставлены покупателями курса!</Alert>
            </Grid>
          </Grid>

          {comments.comments.length > 0 ? (
            <Grid container spacing={3}>
              {commentsLoading ? (
                <CircularProgress />
              ) : (
                comments?.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    courseId={courseId}
                    page={page}
                    limit={limit}
                  />
                ))
              )}
            </Grid>
          ) : (
            <Alert severity="warning">Здесь пока нет отзывов!</Alert>
          )}
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            direction={{ xs: 'column', sm: 'row' }}
          >
            <Grid item xs>
              {(comments.payingUser || user?.role === 'admin') &&
                !user?.isBanned && (
                  <Box my={2}>
                    <Button onClick={handleClose} variant="contained">
                      Оставить отзыв
                    </Button>
                  </Box>
                )}
            </Grid>
            {comments.totalCount > 1 && (
              <Grid item xs mt={2}>
                <Pagination
                  count={comments.totalCount}
                  page={page}
                  onChange={(_, newPage) => setPage(newPage)}
                />
              </Grid>
            )}
          </Grid>

          <MyModal open={open} handleClose={handleClose}>
            <CommentForm
              onSubmit={onSubmit}
              loading={createLoading}
              error={error}
            />
          </MyModal>
        </Grid>
      )}
    </>
  );
};

export default CourseComments;
