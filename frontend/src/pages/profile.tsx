import React from 'react';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import icon from '@/src/assets/images/user-icon.jpg';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const image = 'http://localhost:8000/' + user?.avatar;

  const openEditPage = () => {
    void router.push(`/edit-user/editUser`);
  };

  return (
    <ProtectedRoute
      isAllowed={
        (user && user.role === 'admin') ||
        user?.role === 'user' ||
        user?.role === 'teacher'
      }
    >
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
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {user?.avatar ? (
              <Image
                style={{ margin: '0 auto', borderRadius: '2px' }}
                src={image}
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
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <IconButton onClick={openEditPage}>
              <EditIcon />
            </IconButton>
          </Box>
          <Grid item xs={12} sm={8} md={9} lg={10}>
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
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
