import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectUser,
  selectVerifyEmailLoading,
} from '@/src/dispatchers/users/usersSlice';
import { useRouter } from 'next/router';
import { verifyEmail } from '@/src/dispatchers/users/usersThunks';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Layout from '../../components/UI/Layout/Layout';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query as { token: string };
  const verifyLoading = useAppSelector(selectVerifyEmailLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(verifyEmail(token));
  }, [dispatch, token]);

  return (
    <Layout title="Strategia School: Подтверждение email">
      {verifyLoading ? (
        <CircularProgress />
      ) : (
        user &&
        user.verified && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Электронная почта подтверждена
              </Typography>
              <Typography variant="body1" gutterBottom>
                Спасибо за подтверждение вашей электронной почты. Теперь вы
                можете получать уведомления от нашего сайта.
              </Typography>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="/"
                >
                  На главную страницу
                </Button>
              </Box>
            </Container>
          </Box>
        )
      )}
    </Layout>
  );
};

export default VerifyEmail;
