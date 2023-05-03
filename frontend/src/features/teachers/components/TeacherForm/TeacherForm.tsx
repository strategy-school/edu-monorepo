import React, { ChangeEvent, useEffect, useState } from 'react';
import { ITeacher, UserRole, ValidationError } from '@/src/types.d';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchUsers } from '@/src/dispatchers/users/usersThunks';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { selectUsers } from '@/src/dispatchers/users/usersSlice';

interface Props {
  onSubmit: (teacher: ITeacher) => void;
  existingTeacher?: ITeacher;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
}

const initialState: ITeacher = {
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
  const basicUsers = useAppSelector(selectUsers);

  const [state, setState] = useState<ITeacher>(existingTeacher || initialState);
  useEffect(() => {
    dispatch(fetchUsers({ role: UserRole.Teacher }));
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    // setState(initialState);
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
          <Typography variant="h4" fontSize={{ xs: '18px', md: '22px' }}>
            {isEdit ? 'Редактировать' : 'Добавить'} преподавателя
          </Typography>
        </Grid>
        {!isEdit && (
          <Grid item xs={12}>
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
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FileInput
            label={
              isEdit
                ? 'Изменить имеющиеся фотографию'
                : 'Выберите фотографию преподавателю'
            }
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
            xs={12}
            spacing={1}
          >
            <Grid item xs={9} sm={10} md={11}>
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
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => removePortfolioHandler(index)}
                sx={{ minWidth: '35px' }}
              >
                <HighlightOffIcon fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Button variant="outlined" onClick={addPortfolioHandler}>
            Добавить еще поле
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ padding: '10px 0' }}
          >
            {isEdit ? 'Изменить' : 'Создать'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeacherForm;
