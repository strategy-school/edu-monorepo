import { useAppSelector } from '@/src/app/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectRegisterError } from '@/src/features/users/usersSlice';
import { UpdateUserMutation } from '@/src/types';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface Props {
  onSubmit: (updateMutation: UpdateUserMutation) => void;
}

const initialState: UpdateUserMutation = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
};

const UpdateUser: React.FC<Props> = ({ onSubmit }) => {
  const error = useAppSelector(selectRegisterError);
  const [state, setState] = useState<UpdateUserMutation>(initialState);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const phoneNumberPattern = '^996\\d{9}$';

  return (
    <Layout title="Strategia school: Edit user">
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
                  label="Телефон 996 ХХХ ХХХ ХХХ"
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
