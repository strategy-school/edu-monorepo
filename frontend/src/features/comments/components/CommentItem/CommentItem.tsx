import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCommentDeleting,
  selectCommentUpdating,
  selectUpdateCommentError,
} from '@/src/features/comments/commentsSlice';
import { apiURL } from '@/src/constants';
import {
  selectUpdateUserLoading,
  selectUser,
} from '@/src/features/users/usersSlice';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Rating,
  Typography,
} from '@mui/material';
import {
  deleteComment,
  fetchComments,
  updateComment,
} from '@/src/features/comments/commentsThunks';
import { IComment, ShortCommentMutation } from '@/src/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { updateIsBannedStatus } from '@/src/features/users/usersThunks';
import CommentForm from '@/src/features/comments/components/CommentForm/CommentForm';
import MyModal from '@/src/components/UI/Modal/MyModal';

interface Props {
  comment: IComment;
  courseId: string;
}

const CommentItem: React.FC<Props> = ({ comment, courseId }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const deleteLoading = useAppSelector(selectCommentDeleting);
  const user = useAppSelector(selectUser);
  const bannedUserLoading = useAppSelector(selectUpdateUserLoading);
  const update = useAppSelector(selectCommentUpdating);
  const error = useAppSelector(selectUpdateCommentError);
  let cardImage = '';
  const existingComment: ShortCommentMutation = {
    rating: comment.rating,
    text: comment.text,
  };

  const handleCloseModal = () => {
    setOpen(!open);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (window.confirm('Вы действительно хотите удалить этот комментарий?')) {
      await dispatch(deleteComment(comment._id));
      void dispatch(fetchComments(courseId));
      handleCloseMenu();
    }
  };

  const handleBan = async () => {
    if (
      window.confirm('Вы действительно хотите забанить этого пользователя?')
    ) {
      await dispatch(updateIsBannedStatus(comment.user._id));
      handleCloseMenu();
    }
  };

  const onSubmit = async (commentMutation: ShortCommentMutation) => {
    await dispatch(
      updateComment({ id: comment._id, comment: commentMutation }),
    ).unwrap();
    void dispatch(fetchComments(courseId));
    handleCloseModal();
    handleCloseMenu();
  };

  if (comment.user.avatar) {
    cardImage = apiURL + '/' + comment.user.avatar;
  }

  return (
    <Grid item xs={12}>
      <Card style={{ position: 'relative' }}>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                src={cardImage}
                alt={comment.user.firstName}
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">
                {comment.user.firstName + ' ' + comment.user.lastName}
              </Typography>
              <Typography variant="body1" style={{ color: '#D3D3D3' }}>
                {dayjs(comment.createdAt).format('DD.MM.YYYY')}
              </Typography>
            </Grid>
          </Grid>
          <CardContent>
            <Rating value={comment.rating} readOnly />
            <Typography variant="body1">{comment.text}</Typography>
          </CardContent>
        </Box>
        {(user?._id === comment.user._id || user?.role === 'admin') && (
          <Box style={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          </Box>
        )}
      </Card>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {user?._id === comment.user._id && (
          <MenuItem onClick={handleCloseModal}>Изменить</MenuItem>
        )}
        <MenuItem
          onClick={handleDelete}
          disabled={deleteLoading ? deleteLoading === comment._id : false}
        >
          {deleteLoading && deleteLoading === comment._id && (
            <CircularProgress size={20} sx={{ mr: 1 }} />
          )}
          Удалить
        </MenuItem>
        {user?.role === 'admin' && (
          <MenuItem
            onClick={handleBan}
            disabled={
              bannedUserLoading ? bannedUserLoading === comment.user._id : false
            }
          >
            {bannedUserLoading && bannedUserLoading === comment.user._id && (
              <CircularProgress size={20} sx={{ mr: 1 }} />
            )}
            Забанить пользователя
          </MenuItem>
        )}
      </Menu>
      <MyModal open={open} handleClose={handleCloseModal}>
        <CommentForm
          onSubmit={onSubmit}
          loading={update}
          error={error}
          existingComment={existingComment}
          isEdit
        />
      </MyModal>
    </Grid>
  );
};

export default CommentItem;
