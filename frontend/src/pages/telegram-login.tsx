import React, { useState } from 'react';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectLoginError,
  selectTelegramUser,
  selectUser,
} from '@/src/dispatchers/users/usersSlice';
import { updateTelegramUser } from '@/src/dispatchers/users/usersThunks';
import { useRouter } from 'next/router';

const TelegramLogin = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const error = useAppSelector(selectLoginError);
  const telegramUser = useAppSelector(selectTelegramUser);
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!telegramUser || !telegramUser.telegramId) return;
    const data = {
      id: telegramUser.telegramId,
      email,
      lastName: telegramUser.lastName ? telegramUser.lastName : lastName,
    };

    await dispatch(updateTelegramUser(data)).unwrap();
    setSuccess(true);
  };

  if (user) {
    void router.replace('/');
  }

  return (
    <>
      <Layout title="Strategia login">
        {telegramUser && (
          <Container component="main" maxWidth="sm">
            <Box
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <NoEncryptionGmailerrorredIcon />
              </Avatar>

              <Typography variant="h5" textAlign="center">
                Завершите регистрацию и предоставьте недостающие данные
              </Typography>
              <Box
                component="form"
                onSubmit={onSubmit}
                sx={{ mt: 3, width: '100%' }}
              >
                <Grid container sx={{ width: '100%' }} spacing={2}>
                  {error && (
                    <Grid item sx={{ width: '100%' }}>
                      <Alert severity="error">{error.error}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      required
                      label="Email"
                      name="email"
                      type="email"
                      autoComplete="current-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  {telegramUser && !telegramUser.lastName && (
                    <Grid item xs={12}>
                      <TextField
                        required
                        label="Фамилия"
                        name="lastName"
                        type="text"
                        autoComplete="current-lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  )}
                  {success && (
                    <Grid item xs={12} sx={{ width: '100%' }}>
                      <Alert severity="success">
                        На вашу почту было отправлено письмо для потверждения!
                        Пожалуйста, подтвердите его!
                      </Alert>
                    </Grid>
                  )}
                  <Grid item xs={12} sx={{ width: '100%' }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mb: 2 }}
                      fullWidth
                      disabled={success}
                    >
                      <span>Завершить регистрацию</span>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        )}
      </Layout>
    </>
  );
};

export default TelegramLogin;
