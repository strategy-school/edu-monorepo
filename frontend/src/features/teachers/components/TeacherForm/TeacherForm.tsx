import FileInput from '@/src/components/UI/FileInput/FileInput';
import {
  selectTeacherError,
  selectTeacherSubmitting,
} from '@/src/dispatchers/teachers/teachersSlice';
import { selectUsers } from '@/src/dispatchers/users/usersSlice';
import { fetchUsers } from '@/src/dispatchers/users/usersThunks';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ITeacher, UserRole } from '@/src/types.d';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react';

interface Props {
  onSubmit: (teacher: ITeacher) => void;
  existingTeacher?: ITeacher;
}

const initialState: ITeacher = {
  user: '',
  info: '',
  photo: null,
  portfolio: [''],
};

const TeacherForm: React.FC<Props> = ({
  onSubmit,
  existingTeacher = initialState,
}) => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectUsers);
  const submitting = useAppSelector(selectTeacherSubmitting);
  const error = useAppSelector(selectTeacherError);
  const [state, setState] = React.useState<ITeacher>(existingTeacher);

  React.useEffect(() => {
    dispatch(fetchUsers({ role: UserRole.Teacher }));
  }, [dispatch]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onPortfolioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    portfolioItem: string,
  ) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      portfolio: prev.portfolio.map((p) => (p === portfolioItem ? value : p)),
    }));
  };

  const onAddPortfolio = () => {
    setState((prev) => ({ ...prev, portfolio: [...prev.portfolio, ''] }));
  };

  const onRemovePortfolio = (portfolioItem: string) => {
    setState((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((item) => item !== portfolioItem),
    }));
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
        <Grid item xs={12}>
          <TextField
            label="Выберите пользователя"
            select
            name="user"
            value={state.user}
            onChange={onChange}
            required
            error={Boolean(getFieldError('user'))}
            helperText={getFieldError('user')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите пользователя
            </MenuItem>
            {teachers.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            rows={3}
            id="info"
            label="Информация о преподавателе"
            value={state.info}
            onChange={onChange}
            name="info"
            required
            error={Boolean(getFieldError('info'))}
            helperText={getFieldError('info')}
          />
        </Grid>
        <Grid item xs={12}>
          <FileInput
            label="Выберите фотографию тренера"
            onChange={onFileChange}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onPortfolioChange(e, portfolioItem)
                }
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={() => onRemovePortfolio(portfolioItem)}
                sx={{ minWidth: '35px' }}
              >
                <HighlightOffIcon fontSize="small" />
              </Button>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <Button variant="outlined" onClick={onAddPortfolio}>
            Добавить еще поле
          </Button>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={submitting}
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ padding: '10px 0' }}
          >
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default TeacherForm;
