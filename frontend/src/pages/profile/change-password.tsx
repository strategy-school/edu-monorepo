import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectPasswordChangeError,
  selectPasswordChanging,
} from '@/src/dispatchers/users/usersSlice';
import { changePassword } from '@/src/dispatchers/users/usersThunks';
import { IChangePassword } from '@/src/types';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassowrd = () => {
  const dispatch = useAppDispatch();
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const handleClickShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const error = useAppSelector(selectPasswordChangeError);
  const changing = useAppSelector(selectPasswordChanging);
  const router = useRouter();
  const [state, setState] = React.useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(changePassword(state)).unwrap();
    router.push('/');
  };

  return (
    <Layout title="Школа Маркетинга Strategia: Смена пароля">
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
            Сменить пароль
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
              {error.error}
            </Alert>
          )}
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Текущий пароль"
                  name="currentPassword"
                  autoComplete="current-currentPassword"
                  value={state.currentPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showCurrentPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowCurrentPassword}
                          edge="end"
                        >
                          {showCurrentPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Новый пароль"
                  name="newPassword"
                  autoComplete="current-newPassword"
                  value={state.newPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Введите новый пароль еще для подтверждения"
                  name="confirmPassword"
                  autoComplete="current-confirmPassword"
                  value={state.confirmPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                  type={showNewPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ minLength: 8 }}
                />
              </Grid>
            </Grid>
            <LoadingButton
              loading={changing}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              <span>Сменить</span>
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button component={Link} href="/login" variant="text">
                  или залогиниться
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default ChangePassowrd;
