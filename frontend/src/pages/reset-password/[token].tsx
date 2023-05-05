import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  Avatar,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
import LoadingButton from '@mui/lab/LoadingButton';
import MyModal from '@/src/components/UI/Modal/MyModal';

const Token = () => {
  const router = useRouter();
  const { token } = router.query as { token: string };
  const [password, setPassword] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [open, setOpen] = useState(false);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(true);
    console.log(password);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setOpen(false);
    setPassword({ newPassword: '', confirmPassword: '' });
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
            {/*{error && (*/}
            {/*  <Alert severity="error" sx={{ mt: 3, width: '100%' }}>*/}
            {/*    {error.error}*/}
            {/*  </Alert>*/}
            {/*)}*/}
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
                    type="password"
                    value={password.newPassword}
                    onChange={inputChangeHandler}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    type="password"
                    value={password.confirmPassword}
                    onChange={inputChangeHandler}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                loading={false}
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
                fullWidth
              >
                <span>Сбросить пароль</span>
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Layout>
      <MyModal open={open} handleClose={closeModal}>
        <Typography variant="h6" align="center" mb={2}></Typography>
      </MyModal>
    </>
  );
};

export default Token;
