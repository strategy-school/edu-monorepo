import { useAppSelector } from '@/src/store/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import { UpdateUserMutation } from '@/src/types';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import { selectUpdateUserError } from '@/src/dispatchers/users/usersSlice';
import { useRouter } from 'next/router';

interface Props {
  onSubmit: (updateMutation: UpdateUserMutation) => void;
  existingUser?: UpdateUserMutation;
  isGoogle?: boolean;
  existingEmail: string;
}

const initialState: UpdateUserMutation = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  avatar: null,
};

const UpdateUser: React.FC<Props> = ({
  onSubmit,
  existingUser = initialState,
  isGoogle,
  existingEmail,
}) => {
  const router = useRouter();

  const error = useAppSelector(selectUpdateUserError);
  const [state, setState] = useState<UpdateUserMutation>(existingUser);
  const [emailModified, setEmailModified] = useState(false);

  useEffect(() => {
    setState(existingUser || initialState);
  }, [existingUser]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(state);
    if (state.email !== existingEmail) {
      setEmailModified(true);
    } else {
      await router.push(`/profile`);
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  const handleGoBack = () => {
    router.back();
  };

  const phoneNumberPattern = '^+996\\d{9}$';

  return (
    <Layout title="Школа Маркетинга Strategia: Редактирование пользователя">
      <Grid>
        <Button onClick={handleGoBack}>Назад</Button>
      </Grid>

      <Container component="main" maxWidth="xs">
        <Box
          style={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Редактирование
          </Typography>
          <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {!isGoogle && (
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
                    disabled={emailModified}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              )}
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
                  disabled={emailModified}
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
                  disabled={emailModified}
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
                  disabled={emailModified}
                  type="tel"
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
              {emailModified && (
                <Grid item xs={12}>
                  <Alert severity="success" sx={{ mt: 1, maxWidth: '100%' }}>
                    На вашу почту было отправлено письмо для потверждения!
                    Только после подтверждения, новый электронный адрес будет
                    сохранен в вашем аккаунте!
                  </Alert>
                </Grid>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
                disabled={emailModified}
              >
                Обновить
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
export default UpdateUser;
