import Layout from '@/src/components/UI/Layout/Layout';
import {
  googleLogin,
  login,
  telegramLogin,
} from '@/src/dispatchers/users/usersThunks';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  selectLoginError,
  selectLoginLoading,
  selectUser,
} from '../dispatchers/users/usersSlice';
import { LoginMutation, TelegramUser } from '../types';
import TelegramAuth from '@/src/components/TelegramAuth/TelegramAuth';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const existingUser = useAppSelector(selectUser);
  const router = useRouter();
  const [state, setState] = React.useState<LoginMutation>({
    email: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    void router.push('/');
  };

  const onGoogleLogin = async (credentials: string) => {
    await dispatch(googleLogin(credentials)).unwrap();
    void router.push('/');
  };

  const onTelegramLogin = async (user: TelegramUser) => {
    const data = {
      firstName: user.first_name,
      lastName: user.last_name ? user.last_name : null,
      avatar: user.photo_url ? user.photo_url : null,
      telegramId: user.id.toString(),
      telegramUsername: user.username,
    };
    await dispatch(telegramLogin(data)).unwrap();
    if (
      existingUser &&
      existingUser.verified &&
      existingUser.isTelegramUpdated
    ) {
      void router.push('/');
    } else {
      void router.push('/telegram-login');
    }
  };

  return (
    <Layout title="Школа Маркетинга Strategia: Логин">
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
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Войти
          </Typography>
          <Box sx={{ pt: 2 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                void onGoogleLogin(credentialResponse.credential as string);
              }}
              onError={() => console.log('Login failed')}
            />
          </Box>
          {/*<Box sx={{ pt: 2 }}>*/}
          {/*  <TelegramAuth*/}
          {/*    botName="strategia_authorization_bot"*/}
          {/*    dataOnAuth={onTelegramLogin}*/}
          {/*    buttonSize="large"*/}
          {/*    requestAccess={true}*/}
          {/*  />*/}
          {/*</Box>*/}
          {error && (
            <Grid item xs={12} mt={3} sx={{ width: '100%' }}>
              <Alert severity="error">{error.error}</Alert>
            </Grid>
          )}
          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  value={state.email}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Пароль"
                  name="password"
                  autoComplete="current-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={loading}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Войти</span>
            </LoadingButton>
            <Grid
              container
              justifyContent="flex-end"
              flexDirection="column"
              alignItems="flex-end"
              gap={1}
            >
              <Grid item>
                <Button component={Link} href="/registration" variant="text">
                  или зарегистрироваться
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} href="/forget-password" variant="text">
                  не помните пароль?
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
