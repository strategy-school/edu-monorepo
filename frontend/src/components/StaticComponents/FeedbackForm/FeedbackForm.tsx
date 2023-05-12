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

  return (
    <Grid
      container
      style={{ background: '#c7efcf', borderRadius, padding: '20px' }}
      direction="row"
    >
      <Grid item lg>
        <Typography variant="h4">
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
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                label="Телефон"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
                required
                disabled={notificationCreating}
                error={Boolean(getFieldError('phoneNumber'))}
                helperText={getFieldError('phoneNumber')}
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
