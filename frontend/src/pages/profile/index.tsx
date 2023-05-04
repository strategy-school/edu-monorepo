import { useAppSelector } from '@/src/app/hooks';
import icon from '@/src/assets/images/user-icon.jpg';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    user && (
      <ProtectedRoute isAllowed={Boolean(user)}>
        <Layout title="Strategy school: Profile">
          <BlocksTitle titleText="Мой профиль" />
          <Grid
            container
            spacing={2}
            textAlign="center"
            alignItems="center"
            color="rgb(217, 39, 45)"
            sx={{ position: 'relative' }}
          >
            <Grid item>
              {user.avatar ? (
                <Image
                  style={{ margin: '0 auto', borderRadius: '2px' }}
                  src={apiURL + '/' + user.avatar}
                  alt={user?.firstName}
                  width={200}
                  height={230}
                />
              ) : (
                <Image
                  src={icon}
                  alt="User icon"
                  width={200}
                  height={230}
                  style={{ margin: '0 auto', borderRadius: '2px' }}
                />
              )}
            </Grid>
            <Grid item>
              <Grid>
                <Typography component="p" sx={{ mb: 2, fontSize: 20 }}>
                  ФИО: {user?.firstName} {user?.lastName}
                </Typography>

                <Typography component="p" sx={{ mb: 2, fontSize: 20 }}>
                  Email: {user?.email}
                </Typography>

                {user?.phoneNumber ? (
                  <Typography component="p" sx={{ mb: 2, fontSize: 20 }}>
                    Телефон: {user.phoneNumber}
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
            <Box style={{ position: 'absolute', right: 0, top: 0 }}>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isMenuOpen ? 'long-menu' : undefined}
                aria-expanded={isMenuOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={openMenu}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu open={isMenuOpen} anchorEl={anchorEl} onClose={closeMenu}>
                <MenuItem>
                  <Link href="profile/edit-user">Изменить профиль</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="profile/change-password">Сменить пароль</Link>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Layout>
      </ProtectedRoute>
    )
  );
};

export default Profile;
