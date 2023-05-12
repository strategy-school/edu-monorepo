import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { borderRadius } from '@/src/styles';
import { INotification } from '@/src/types';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { createNotification } from '@/src/dispatchers/notifications/notificationsThunks';
import {
  selectCreateNotificationError,
  selectNotificationCreating,
} from '@/src/dispatchers/notifications/notificationsSlice';

const inputStyle = {
  background: '#fff',
  borderColor: '#fff',
  margin: 0,
  borderRadius: '5px',
};

const FeedbackForm = () => {
  const dispatch = useAppDispatch();
  const notificationCreating = useAppSelector(selectNotificationCreating);
  const error = useAppSelector(selectCreateNotificationError);
  const [state, setState] = useState<INotification>({
    name: '',
    email: '',
    phoneNumber: '',
    message: null,
  });

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createNotification(state));
    setState({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const phoneNumberPattern = '^+996\\d{9}$';

  return (
    <Grid
      container
      style={{ background: '#c7efcf', borderRadius, padding: '20px' }}
      direction="row"
      alignItems="center"
    >
      <Grid item lg>
        <Typography variant="h4" style={{ marginRight: '20px', width: '45vw' }}>
          Записаться на курс или получить бесплатную консультацию{' '}
        </Typography>
      </Grid>
      <Grid item lg>
        <form onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                id="name"
                name="name"
                label="Ваше имя"
                value={state.name}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('name'))}
                helperText={getFieldError('name')}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="email"
                id="email"
                name="email"
                label="Электронная почта"
                value={state.email}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('email'))}
                helperText={getFieldError('email')}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <TextField
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                label="Телефон +996 ХХХ ХХХ ХХХ"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
                style={inputStyle}
                inputProps={{ pattern: phoneNumberPattern }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                multiline
                rows={2}
                id="message"
                name="message"
                label="Сообщение"
                value={state.message}
                onChange={inputChangeHandler}
                disabled={notificationCreating}
                style={inputStyle}
              />
            </Grid>
            <Grid item xs>
              <Button
                type="submit"
                variant="contained"
                disabled={notificationCreating}
              >
                Отправить
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default FeedbackForm;