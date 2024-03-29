import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import Layout from '@/src/components/UI/Layout/Layout';
import { googleLogin, register } from '@/src/dispatchers/users/usersThunks';
import { RegisterMutation } from '@/src/types';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  selectRegisterError,
  selectRegisterLoading,
} from '../dispatchers/users/usersSlice';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import UserAgreement from '@/src/components/StaticComponents/UserAgreement/UserAgreement';
import theme from '@/src/theme';
import TelegramAuthWrapper from '@/src/components/TelegramAuth/TelegramAuthWrapper';

const Registration = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const [state, setState] = React.useState<RegisterMutation>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    avatar: null,
  });
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkboxChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setChecked(event.target.checked);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    setSuccess(true);
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
    <Layout title="Школа Маркетинга Strategia: Регистрация">
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
          <Box sx={{ pt: 2 }}>
            <TelegramAuthWrapper />
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
                  autoComplete="new-password"
                  value={state.password}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
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
              <Grid item xs>
                <FileInput
                  label="Выберите картинку профиля"
                  onChange={fileInputChangeHandler}
                  name="avatar"
                  type="image/*"
                  errorCheck={getFieldError}
                />
              </Grid>
              <Grid
                item
                container
                justifyContent="space-between"
                alignItems="center"
                xs={12}
              >
                <Checkbox
                  checked={checked}
                  onChange={checkboxChangeHandler}
                  sx={{ ml: -1 }}
                />
                <Box sx={{ width: '90%' }}>
                  <Typography sx={{ width: '100%' }}>
                    Я ознакомился с{' '}
                    <Typography
                      component="span"
                      onClick={() => setOpen(true)}
                      style={{ cursor: 'pointer', textDecoration: 'underline' }}
                      color={theme.palette.info.dark}
                    >
                      Пользовательским соглашением
                    </Typography>{' '}
                    и хочу продолжить
                  </Typography>
                </Box>
              </Grid>
              {success && (
                <Grid item xs={12}>
                  <Alert
                    severity="success"
                    sx={{ mt: 1, maxWidth: '100%', alignItems: 'center' }}
                  >
                    На вашу почту было отправлено письмо для подтверждения!
                  </Alert>
                </Grid>
              )}
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
                disabled={!checked}
              >
                Завершить регистрацию
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button variant="text" component={Link} href="/login">
                    Войти используя email и пароль
                  </Button>
                </Grid>
              </Grid>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent>
                  <UserAgreement />
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setOpen(false)}
                  >
                    OK
                  </Button>
                </DialogContent>
              </Dialog>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default Registration;
