import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/src/components/UI/Layout/Layout';
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
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectPasswordResetError,
  selectPasswordResetLoading,
} from '@/src/dispatchers/users/usersSlice';
import { resetPassword } from '@/src/dispatchers/users/usersThunks';
import MyModal from '@/src/components/UI/Modal/MyModal';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Token = () => {
  const router = useRouter();
  const { token } = router.query as { token: string };
  const dispatch = useAppDispatch();
  const [showPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowNewPassword(!showPassword);
  const error = useAppSelector(selectPasswordResetError);
  const loading = useAppSelector(selectPasswordResetLoading);
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [open, setOpen] = useState(false);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
      token,
    };
    await dispatch(resetPassword(data)).unwrap();
    setOpen(true);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    void router.push('/login');
  };

  return (
    <>
      <Layout title="Школа Маркетинга Strategia: Восстановление пароля">
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
            {error && (
              <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
                {error.error}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={submitFormHandler}
              sx={{ mt: 3, width: '100%' }}
            >
              <Grid container sx={{ width: '100%' }} gap={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Введите новый пароль"
                    name="newPassword"
                    value={password.newPassword}
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
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    value={password.confirmPassword}
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
                fullWidth
              >
                <span>Сохранить новый пароль</span>
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Layout>
      <MyModal open={open} handleClose={closeModal}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>Ваш пароль успешно обновлен!</Typography>
          <Button onClick={closeModal} sx={{ mt: 3 }}>
            Закрыть
          </Button>
        </Box>
      </MyModal>
    </>
  );
};

export default Token;
