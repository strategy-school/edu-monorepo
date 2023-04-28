import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { ApiComment, ShortCommentMutation } from '@/src/types';
import {
  selectCommentCreating,
  selectComments,
  selectCommentsFetching,
  selectCreateCommentError,
} from '@/src/features/comments/commentsSlice';
import {
  createComment,
  fetchComments,
} from '@/src/features/comments/commentsThunks';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import CommentItem from '@/src/features/comments/components/CommentItem/CommentItem';
import MyModal from '@/src/components/UI/Modal/MyModal';
import CommentForm from '@/src/features/comments/components/CommentForm/CommentForm';

interface Props {
  courseId: string;
}

const CourseComments: React.FC<Props> = ({ courseId }) => {
  const dispatch = useAppDispatch();
  const comments: ApiComment[] = useAppSelector(selectComments);
  const commentsLoading = useAppSelector(selectCommentsFetching);
  const createLoading = useAppSelector(selectCommentCreating);
  const error = useAppSelector(selectCreateCommentError);
  const [open, setOpen] = useState(false);

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
    void dispatch(fetchComments(courseId));
    handleClose();
  };

  useEffect(() => {
    void dispatch(fetchComments(courseId));
  }, [dispatch, courseId]);

  return (
    <>
      {comments.length > 0 && (
        <Grid item m={4}>
          <Typography variant="h5" mb={2}>
            Отзывы
          </Typography>
          <Grid container spacing={3}>
            {commentsLoading ? (
              <CircularProgress />
            ) : (
              comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  courseId={courseId}
                />
              ))
            )}
          </Grid>
          <Box my={2}>
            <Button onClick={handleClose} variant="contained">
              Оставить отзыв
            </Button>
            {/*Проверка на отображение этой кнопки будет, когда на фронте появятся транзакции (кнопка будет видна только админам и людям купившим этот курс)*/}
          </Box>
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
