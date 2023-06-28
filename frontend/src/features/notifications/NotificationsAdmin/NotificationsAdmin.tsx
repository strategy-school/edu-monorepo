import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Dialog,
  DialogContent,
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectNotifications,
  selectNotificationsCount,
  selectNotificationsFetching,
  selectNotificationsPage,
  selectNotificationTogglingChecked,
} from '@/src/dispatchers/notifications/notificationsSlice';
import {
  fetchNotifications,
  notificationToggleChecked,
} from '@/src/dispatchers/notifications/notificationsThunks';
import { ApiNotification } from '@/src/types';

const NotificationsAdmin = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const totalCount = useAppSelector(selectNotificationsCount);
  const notificationsFetching = useAppSelector(selectNotificationsFetching);
  const togglingChecked = useAppSelector(selectNotificationTogglingChecked);
  const currentPage = useAppSelector(selectNotificationsPage);

  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ApiNotification | null>(null);

  useEffect(() => {
    void dispatch(fetchNotifications({ page, limit }));
  }, [dispatch, togglingChecked, page, limit]);

  const openDialog = async (notification: ApiNotification) => {
    setSelected(notification);
    setOpen(true);
    if (!notification.isChecked) {
      await dispatch(notificationToggleChecked(notification._id));
      await dispatch(fetchNotifications());
    }
  };

  const closeDialog = () => {
    setSelected(null);
    setOpen(false);
  };

  const toggleNotificationChecked = async (id: string) => {
    await dispatch(notificationToggleChecked(id));
    await dispatch(fetchNotifications());
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Открыть</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Текст</TableCell>
              <TableCell>Изменить статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationsFetching ? (
              <CircularProgress />
            ) : (
              notifications.map((notification) => (
                <TableRow key={notification._id} hover>
                  <TableCell
                    style={
                      notification.isChecked
                        ? {}
                        : {
                            fontWeight: 700,
                            background: '#e1e9fc',
                          }
                    }
                  >
                    <IconButton onClick={() => openDialog(notification)}>
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    style={
                      notification.isChecked
                        ? {}
                        : {
                            fontWeight: 700,
                            background: '#e1e9fc',
                          }
                    }
                  >
                    {notification.name}
                  </TableCell>
                  <TableCell
                    onClick={() => openDialog(notification)}
                    style={
                      notification.isChecked
                        ? {}
                        : {
                            fontWeight: 700,
                            background: '#e1e9fc',
                          }
                    }
                  >
                    {notification.message
                      ? notification.message.slice(0, 10) + '...'
                      : 'Нет текста'}
                  </TableCell>
                  <TableCell
                    style={
                      notification.isChecked
                        ? {}
                        : {
                            fontWeight: 700,
                            background: '#e1e9fc',
                          }
                    }
                  >
                    <IconButton
                      onClick={() =>
                        toggleNotificationChecked(notification._id)
                      }
                    >
                      {notification.isChecked ? (
                        <CheckCircleOutlineIcon fontSize="small" />
                      ) : (
                        <CircleIcon fontSize="small" />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={totalCount}
                page={currentPage - 1}
                rowsPerPage={limit}
                onPageChange={(_, newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={closeDialog}>
        {selected && (
          <DialogContent>
            <Typography component="p" sx={{ pb: 2 }}>
              <Typography component="span" fontWeight={700}>
                Имя:
              </Typography>{' '}
              {selected.name}
            </Typography>
            <Typography component="p" sx={{ pb: 2 }}>
              <Typography component="span" fontWeight={700}>
                Email:
              </Typography>{' '}
              {selected.email}
            </Typography>
            <Typography component="p" sx={{ pb: 2 }}>
              <Typography component="span" fontWeight={700}>
                Телефон:
              </Typography>{' '}
              {selected.phoneNumber}
            </Typography>
            <Typography component="p" sx={{ pb: 2 }}>
              <Typography component="span" fontWeight={700}>
                Сообщение:
              </Typography>{' '}
              {selected.message ? selected.message : 'Нет сообщения'}
            </Typography>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default NotificationsAdmin;
