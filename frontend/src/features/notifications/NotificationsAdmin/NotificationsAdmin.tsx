import React, { useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectNotifications } from '@/src/dispatchers/notifications/notificationsSlice';
import { fetchNotifications } from '@/src/dispatchers/notifications/notificationsThunks';

const NotificationsAdmin = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  useEffect(() => {
    void dispatch(fetchNotifications());
  }, [dispatch]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Текст</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification._id} hover>
                <TableCell>{notification.name}</TableCell>
                <TableCell>
                  {notification.message
                    ? notification.message.slice(0, 10)
                    : 'Нет текста'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default NotificationsAdmin;
