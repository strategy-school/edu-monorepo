import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
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
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ChangePassowrd = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectPasswordChangeError);
  const changing = useAppSelector(selectPasswordChanging);
  const router = useRouter();
  const [state, setState] = React.useState<IChangePassword>({
    currentPassword: '',
    newPassword: '',
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
    <Layout title="Strategia login">
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
                  type="currentPassword"
                  autoComplete="current-currentPassword"
                  value={state.currentPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Новый пароль"
                  name="newPassword"
                  type="newPassword"
                  autoComplete="current-newPassword"
                  value={state.newPassword}
                  onChange={inputChangeHandler}
                  sx={{ width: '100%' }}
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
