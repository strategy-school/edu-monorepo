import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { apiURL } from '@/src/constants';
import {
  selectFetchingOneUser,
  selectOneBasicUser,
} from '@/src/dispatchers/users/usersSlice';
import { fetchOneBasicUser } from '@/src/dispatchers/users/usersThunks';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import noAvatar from '../../../assets/images/noAvatar.jpg';

const OneUser = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const dispatch = useAppDispatch();
  const oneStudent = useAppSelector(selectOneBasicUser);
  const loading = useAppSelector(selectFetchingOneUser);

  React.useEffect(() => {
    dispatch(fetchOneBasicUser(userId));
  }, [dispatch, userId]);

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

export default OneUser;
