import React from 'react';
import { User } from '@/src/types';
import { Avatar, Button } from '@mui/material';
import { apiURL } from '@/src/constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  let cardImage = '';

  if (user.avatar) {
    cardImage = apiURL + '/' + user.avatar;
  }

  return (
    <>
      <Button color="inherit">
        {user.firstName}
        <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 2 }} />
      </Button>
    </>
  );
};

export default UserMenu;
