import React, { useState } from 'react';
import { User } from '@/src/types';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/src/app/hooks';
import { apiURL } from '@/src/constants';
import { logout } from '@/src/features/users/usersThunks';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let cardImage = '';

  if (user.avatar !== null) {
    cardImage = apiURL + '/' + user.avatar;
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    void router.push('/registration');
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {user.firstName}
        <Avatar src={cardImage} alt={user.firstName} sx={{ ml: 2 }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;