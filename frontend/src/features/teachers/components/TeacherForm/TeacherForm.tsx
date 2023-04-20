import React, { ChangeEvent, useEffect, useState } from 'react';
import { TeacherMutation, ValidationError } from '@/src/types';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectBasicUsers } from '@/src/features/users/usersSlice';
import { fetchBasicUsers } from '@/src/features/users/usersThunks';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Props {
  onSubmit: (teacher: TeacherMutation) => void;
  existingTeacher?: TeacherMutation;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: TeacherMutation = {
  user: '',
  info: '',
  photo: null,
  portfolio: [''],
};

const TeacherForm: React.FC<Props> = ({
  onSubmit,
  existingTeacher,
  isEdit,
  loading,
  error,
}) => {
  const dispatch = useAppDispatch();
  const basicUsers = useAppSelector(selectBasicUsers);

  const [state, setState] = useState<TeacherMutation>(
    existingTeacher || initialState,
  );
  useEffect(() => {
    dispatch(fetchBasicUsers());
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    await onSubmit(state);
    setState(initialState);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const portfolioInputChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { value } = e.target;
    setState((prevState) => {
      const updatedPortfolio = [...prevState.portfolio];
      updatedPortfolio[index] = value;
      return { ...prevState, portfolio: updatedPortfolio };
    });
  };

  const addPortfolioHandler = () => {
    setState((prevState) => {
      const updatedPortfolio = [...prevState.portfolio, ''];
      return { ...prevState, portfolio: updatedPortfolio };
    });
  };

  const removePortfolioHandler = (index: number) => {
    setState((prevState) => {
      const updatedPortfolio = [...prevState.portfolio];
      updatedPortfolio.splice(index, 1);
      return { ...prevState, portfolio: updatedPortfolio };
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
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">
            {isEdit ? 'Редактировать' : 'Добавить'} преподавателя
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item xs>
            <TextField
              label="Выберите пользователя"
              select
              name="user"
              value={state.user}
              onChange={inputChangeHandler}
              required
              error={Boolean(getFieldError('user'))}
              helperText={getFieldError('user')}
            >
              <MenuItem value="" disabled>
                Пожалуйста, выберите пользователя{' '}
              </MenuItem>
              {basicUsers.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        )}
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="info"
            label="Информация о преподавателе"
            value={state.info}
            onChange={inputChangeHandler}
            name="info"
            required
            error={Boolean(getFieldError('info'))}
            helperText={getFieldError('info')}
          />
        </Grid>
        <Grid item xs>
          <FileInput
            label="Выберите фотографию преподавателю"
            onChange={fileInputChangeHandler}
            name="photo"
            type="image/*"
            errorCheck={getFieldError}
          />
        </Grid>

        {state.portfolio.map((portfolioItem, index) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            justifyContent="space-between"
            xs={9}
          >
            <Grid item width="90%">
              <TextField
                variant="outlined"
                label="Укажите значимый кейс"
                name={`portfolio[${index}]`}
                value={portfolioItem}
                autoComplete="new-portfolio"
                error={Boolean(getFieldError('portfolio'))}
                helperText={getFieldError('portfolio')}
                required
                onChange={(e) => portfolioInputChangeHandler(e, index)}
              />
            </Grid>
            <Grid item sx={{ height: '100%', width: '96px' }}>
              <Button
                variant="contained"
                color="error"
                onClick={() => removePortfolioHandler(index)}
                fullWidth
              >
                <HighlightOffIcon />
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Button variant="outlined" onClick={addPortfolioHandler}>
            Добавить еще поле
          </Button>
        </Grid>
        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ width: '185px' }}
          >
            {isEdit ? 'Изменить' : 'Создать'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeacherForm;
