import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectRegisterError } from '@/src/features/users/usersSlice';
import { googleLogin, register } from '@/src/features/users/usersThunks';
import { RegisterMutation } from '@/src/types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Registration = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    avatar: null,
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    await router.push('/');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onGoogleLogin = async (credentials: string) => {
    await dispatch(googleLogin(credentials)).unwrap();
    await router.push('/');
  };

  const phoneNumberPattern = '^+996\\d{9}$';

  return (
    <Layout title="Strategia registration">
      <Container component="main" maxWidth="xs">
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                void onGoogleLogin(credentialResponse.credential as string);
              }}
              onError={() => console.log('Login failed')}
            />
          </Box>
          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="new-email"
                  value={state.email}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('email'))}
                  helperText={getFieldError('email')}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Имя"
                  name="firstName"
                  autoComplete="new-firstName"
                  value={state.firstName}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('firstName'))}
                  helperText={getFieldError('firstName')}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Фамилия"
                  name="lastName"
                  autoComplete="new-lastName"
                  value={state.lastName}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('lastName'))}
                  helperText={getFieldError('lastName')}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  label="Телефон +996 ХХХ ХХХ ХХХ"
                  name="phoneNumber"
                  autoComplete="new-phoneNumber"
                  value={state.phoneNumber}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('phoneNumber'))}
                  helperText={getFieldError('phoneNumber')}
                  inputProps={{ pattern: phoneNumberPattern }}
                  type="tel"
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  variant="outlined"
                  name="password"
                  label="Пароль"
                  type="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs>
                <FileInput
                  label="Выберите картинку профиля"
                  onChange={fileInputChangeHandler}
                  name="avatar"
                  type="image/*"
                  errorCheck={getFieldError}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Завершить регистрацию
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button variant="text" component={Link} href="/login">
                    Войти используя email и пароль
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Registration;
