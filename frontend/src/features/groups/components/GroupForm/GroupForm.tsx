import React, { useEffect, useState } from 'react';
import { IGroup, ValidationError } from '@/src/types';
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface Props {
  onSubmit: (groupMutation: IGroup) => void;
  loading: boolean;
  error: ValidationError | null;
  isEdit?: boolean;
  fetchGroupLoading?: boolean;
  existingGroup?: IGroup;
}

const initialState: IGroup = {
  title: '',
  description: '',
  course: '',
  startDate: '',
  endDate: '',
  startsAt: '',
  duration: '',
  telegramLink: '',
};

const GroupForm: React.FC<Props> = ({
  onSubmit,
  existingGroup,
  loading,
  error,
  isEdit = false,
  fetchGroupLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);

  const [state, setState] = useState<IGroup>(existingGroup || initialState);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
      <Typography variant="h4">
        {isEdit ? 'Редактировать' : 'Добавить'} группу{' '}
        {fetchGroupLoading && <CircularProgress size={20} sx={{ ml: 1 }} />}
      </Typography>
      <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
        <Grid item xs>
          <TextField
            label="Название группы"
            name="title"
            id="title"
            value={state.title}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            multiline
            rows={3}
            label="Добавьте описание"
            name="description"
            id="description"
            value={state.description}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            select
            label="Курс"
            id="course"
            name="course"
            value={state.course}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('course'))}
            helperText={getFieldError('course')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите курс
            </MenuItem>
            {courses.map((course) => (
              <MenuItem key={course._id} value={course._id}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <Typography component="p" sx={{ pb: 2 }}>
            Дата начала обучения
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Choose date"
              value={dayjs(state.startDate)}
              onChange={(newValue) =>
                setState((prevState) => ({
                  ...prevState,
                  startDate: newValue ? newValue.format('YYYY-MM-DD') : '',
                }))
              }
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs>
          <Typography component="p" sx={{ pb: 2 }}>
            Дата завершения обучения
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="ChooseDate"
              value={dayjs(state.endDate)}
              onChange={(newValue) =>
                setState((prevState) => ({
                  ...prevState,
                  endDate: newValue ? newValue.format('YYYY-MM-DD') : '',
                }))
              }
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs>
          <Typography component="p" sx={{ pb: 2 }}>
            Время начала занятий
          </Typography>
          <TextField
            type="time"
            id="startsAt"
            name="startsAt"
            value={state.startsAt}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('startsAt'))}
            helperText={getFieldError('startsAt')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            label="Продолжительность"
            id="duration"
            name="duration"
            value={state.duration}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('duration'))}
            helperText={getFieldError('duration')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            type="link"
            label="Ссылка на чат в Telegram"
            id="telegramLink"
            name="telegramLink"
            value={state.telegramLink}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('telegramLink'))}
            helperText={getFieldError('telegramLink')}
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {isEdit ? 'Обновить' : 'Создать'} группу
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GroupForm;
