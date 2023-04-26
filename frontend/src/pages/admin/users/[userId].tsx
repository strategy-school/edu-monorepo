import React, { useEffect } from 'react';
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchOneBasicUser } from '@/src/features/users/usersThunks';
import {
  selectFetchingOneUser,
  selectOneBasicUser,
} from '@/src/features/users/usersSlice';
import noAvatar from '../../../assets/images/noAvatar.jpg';
import Image from 'next/image';
import Layout from '@/src/components/UI/Layout/Layout';

const OneUser = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const dispatch = useAppDispatch();
  const oneStudent = useAppSelector(selectOneBasicUser);
  const loading = useAppSelector(selectFetchingOneUser);
  useEffect(() => {
    dispatch(fetchOneBasicUser(userId));
  }, [dispatch, userId]);

  const goBack = () => {
    router.back();
  };

  return (
    <Layout title="Strategia: admin panel | student page">
      <Grid container justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : (
          oneStudent && (
            <>
              <Grid
                container
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={4}
              >
                <Grid item alignSelf="flex-start">
                  <Button onClick={goBack}>Назад</Button>
                </Grid>
                <Grid item alignSelf="flex-end" mb={3}>
                  <Image
                    width={200}
                    height={200}
                    src={
                      !oneStudent.avatar
                        ? noAvatar
                        : apiURL + '/' + oneStudent.avatar
                    }
                    alt={oneStudent.firstName}
                  />
                </Grid>
                <Grid item width="100%">
                  <Typography variant="body1" mb={2}>
                    Имя Фамилия: {oneStudent.firstName} {oneStudent.lastName}
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Email: {oneStudent.email}
                  </Typography>
                  <Typography variant="body1" mb={2}>
                    Телефон: {oneStudent.phoneNumber}
                  </Typography>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="body1" mb={3}>
                    Статус бана:
                    <Typography
                      component="span"
                      color={oneStudent.isBanned ? 'red' : 'green'}
                      ml={1}
                    >
                      {oneStudent.isBanned ? 'Бан' : 'Нет бана'}
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </>
          )
        )}
      </Grid>
    </Layout>
  );
};

export default OneUser;
