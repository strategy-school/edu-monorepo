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
import LoadingButton from '@mui/lab/LoadingButton';
import MyModal from '@/src/components/UI/Modal/MyModal';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectTelegramUser } from '@/src/dispatchers/users/usersSlice';
import { RegisterMutation } from '@/src/types';
import { telegramLogin } from '@/src/dispatchers/users/usersThunks';
import { useRouter } from 'next/router';

const TelegramLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const telegramUser = useAppSelector(selectTelegramUser);
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!telegramUser) return;
    const data = {
      email,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name ? telegramUser.last_name : lastName,
      avatar: telegramUser.photo_url ? telegramUser.photo_url : null,
      telegramId: telegramUser.id.toString(),
    };
    await dispatch(telegramLogin(data)).unwrap();
    void router.push('/');
  };

  return (
    <>
      <Layout title="Strategia login">
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
            <Typography variant="h5">
              Завершите регистрацию и предоставьте недостающие данные
            </Typography>
            <Box
              component="form"
              onSubmit={onSubmit}
              sx={{ mt: 3, width: '100%' }}
            >
              <Grid container sx={{ width: '100%' }}>
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
                {telegramUser && !telegramUser.last_name && (
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
              </Grid>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                <span>Завершить регистрацию</span>
              </Button>
            </Box>
          </Box>
        </Container>
      </Layout>
      <MyModal open={open} handleClose={() => setOpen(false)}>
        <Box>
          <Typography variant="body1" align="center" mb={2}>
            На указанный вами email: {email} было отправлено письмо для
            подтверждения электронной почты
          </Typography>
        </Box>
      </MyModal>
    </>
  );
};

export default TelegramLogin;
