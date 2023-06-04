import React from 'react';
import { User } from '@/src/types';
import { Avatar, Badge, Button } from '@mui/material';
import { apiURL } from '@/src/constants';
import Link from 'next/link';

interface Props {
  user: User;
  uncheckedCount: number;
}

const UserMenu: React.FC<Props> = ({ user, uncheckedCount }) => {
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
        href={
          user.role === 'user' || user.role === 'teacher'
            ? '/profile'
            : '/admin/notifications'
        }
      >
        {user.firstName}
        {user.role === 'admin' ? (
          <Badge badgeContent={uncheckedCount} color="secondary">
            <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 1 }} />
          </Badge>
        ) : (
          <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 1 }} />
        )}
      </Button>
    </>
  );
};

export default UserMenu;
