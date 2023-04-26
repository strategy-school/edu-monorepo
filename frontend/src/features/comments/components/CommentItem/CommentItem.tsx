import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCommentDeleting } from '@/src/features/comments/commentsSlice';
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
} from '@/src/features/comments/commentsThunks';
import { IComment } from '@/src/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { updateIsBannedStatus } from '@/src/features/users/usersThunks';

interface Props {
  comment: IComment;
  courseId: string;
}

const CommentItem: React.FC<Props> = ({ comment, courseId }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectCommentDeleting);
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let cardImage = '';
  const bannedUserLoading = useAppSelector(selectUpdateUserLoading);

  if (comment.user.avatar) {
    cardImage = apiURL + '/' + comment.user.avatar;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    if (window.confirm('Вы действительно хотите удалить этот комментарий?')) {
      await dispatch(deleteComment(comment._id));
      void dispatch(fetchComments(courseId));
      handleClose();
    }
  };

  const handleBan = async () => {
    if (
      window.confirm('Вы действительно хотите забанить этого пользователя?')
    ) {
      await dispatch(updateIsBannedStatus(comment.user._id));
      handleClose();
    }
  };

  return (
    <Grid item xs={12} md={6}>
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
        onClose={handleClose}
      >
        <MenuItem>Изменить</MenuItem>
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
    </Grid>
  );
};

export default CommentItem;
