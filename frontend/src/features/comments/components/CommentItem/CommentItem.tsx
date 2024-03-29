import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectCommentDeleting,
  selectCommentUpdating,
  selectUpdateCommentError,
} from '@/src/dispatchers/comments/commentsSlice';
import { apiURL, dateCommentFormat } from '@/src/constants';
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
  useMediaQuery,
} from '@mui/material';
import {
  deleteComment,
  fetchComments,
  updateComment,
} from '@/src/dispatchers/comments/commentsThunks';
import { ApiComment, ShortCommentMutation } from '@/src/types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import CommentForm from '@/src/features/comments/components/CommentForm/CommentForm';
import MyModal from '@/src/components/UI/Modal/MyModal';
import {
  selectUpdateUserLoading,
  selectUser,
} from '@/src/dispatchers/users/usersSlice';
import { updateIsBannedStatus } from '@/src/dispatchers/users/usersThunks';

interface Props {
  comment: ApiComment;
  courseId: string;
  page: number;
  limit: number;
}

const CommentItem: React.FC<Props> = ({ comment, courseId, page, limit }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);
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

  const isMd = useMediaQuery('(max-width:900px)');

  const handleCloseFormModal = () => {
    setFormOpen(!formOpen);
  };

  const handleCloseFullModal = () => {
    setFullOpen(!fullOpen);
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
      void dispatch(fetchComments({ page, limit, courseId }));
      handleCloseMenu();
    }
  };

  const handleBan = async () => {
    if (
      window.confirm('Вы действительно хотите забанить этого пользователя?')
    ) {
      await dispatch(updateIsBannedStatus(comment.user._id));
      await handleDelete();
      handleCloseMenu();
    }
  };

  const onSubmit = async (commentMutation: ShortCommentMutation) => {
    await dispatch(
      updateComment({ id: comment._id, comment: commentMutation }),
    ).unwrap();
    void dispatch(fetchComments({ page, limit, courseId }));
    handleCloseFormModal();
    handleCloseMenu();
  };

  if (comment.user.avatar) {
    cardImage = apiURL + '/' + comment.user.avatar;
  }

  return (
    <Grid item xs={12} md={6}>
      <Card style={{ position: 'relative', height: '100%' }}>
        <Box
          p={2}
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Avatar
                src={cardImage}
                alt={comment.user.firstName}
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {comment.user.firstName + ' ' + comment.user.lastName}
              </Typography>
              <Typography variant="body2" style={{ color: '#D3D3D3' }}>
                {dayjs(comment.createdAt).format(dateCommentFormat)}
              </Typography>
            </Grid>
            <Grid item>
              <Rating value={comment.rating} readOnly />
            </Grid>
          </Grid>
          <CardContent>
            <Typography
              variant="body1"
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {comment.text}
            </Typography>
          </CardContent>
          {(isMd ? comment.text.length > 81 : comment.text.length > 55) && (
            <Box sx={{ textAlign: 'right' }}>
              <Typography
                variant="body2"
                sx={{ color: '#3f51b5', cursor: 'pointer' }}
                onClick={() => setFullOpen(true)}
              >
                Раскрыть
              </Typography>
            </Box>
          )}
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
          <MenuItem onClick={handleCloseFormModal}>Изменить</MenuItem>
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
      <MyModal open={formOpen} handleClose={handleCloseFormModal}>
        <CommentForm
          onSubmit={onSubmit}
          loading={update}
          error={error}
          existingComment={existingComment}
          isEdit
        />
      </MyModal>
      <MyModal open={fullOpen} handleClose={handleCloseFullModal}>
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
              <Typography variant="body1">
                {comment.user.firstName + ' ' + comment.user.lastName}
              </Typography>
              <Typography variant="body2" style={{ color: '#D3D3D3' }}>
                {dayjs(comment.createdAt).format(dateCommentFormat)}
              </Typography>
            </Grid>
            <Grid item>
              <Rating value={comment.rating} readOnly />
            </Grid>
          </Grid>
          <CardContent>
            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
              {comment.text}
            </Typography>
          </CardContent>
        </Box>
      </MyModal>
    </Grid>
  );
};

export default CommentItem;
