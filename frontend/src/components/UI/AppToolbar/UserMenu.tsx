import React, { useEffect, useState } from 'react';
import { User } from '@/src/types';
import { Avatar, Badge, Button } from '@mui/material';
import { apiURL } from '@/src/constants';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectNotifications } from '@/src/dispatchers/notifications/notificationsSlice';
import { fetchNotifications } from '@/src/dispatchers/notifications/notificationsThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const [uncheckedCount, setUncheckedCount] = useState(0);

  useEffect(() => {
    if (user.role === 'admin') {
      void dispatch(fetchNotifications());
    }
  }, [dispatch, user.role]);

  useEffect(() => {
    if (user.role === 'admin') {
      const count = notifications.reduce((count, notification) => {
        if (!notification.isChecked) {
          return count + 1;
        }
        return count;
      }, 0);
      setUncheckedCount(count);
    }
  }, [notifications, user.role]);

  let cardImage = '';

  if (user.avatar) {
    cardImage = apiURL + '/' + user.avatar;
  }

  return (
    <>
      <Button
        color="inherit"
        className="conveythis-no-translate"
        component={Link}
        href={'/profile'}
      >
        {user.firstName}
        <Badge badgeContent={uncheckedCount} color="secondary">
          <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 1 }} />
        </Badge>
      </Button>
    </>
  );
};

export default UserMenu;
