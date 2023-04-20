import React from 'react';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import icon from '@/src/assets/images/user-icon.jpg';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const image = 'http://localhost:8000/' + user?.avatar;

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
        >
          <Grid item xs={12} sm={4} md={3} lg={2}>
            {user?.avatar ? (
              <img
                style={{ margin: '0 auto', borderRadius: '2px' }}
                src={image}
                alt={user?.firstName}
                width={200}
                height={200}
              />
            ) : (
              <Image
                src={icon}
                alt="User icon"
                width={200}
                height={200}
                style={{ margin: '0 auto', borderRadius: '2px' }}
              />
            )}
          </Grid>
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
