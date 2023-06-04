import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import {
  selectGroupError,
  selectGroupSubmitting,
} from '@/src/dispatchers/groups/groupsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { IGroup } from '@/src/types';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  onSubmit: (groupMutation: IGroup) => void;
  existingGroup?: IGroup;
  isEdit?: boolean;
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
  isEdit,
  existingGroup = initialState,
}) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const submitting = useAppSelector(selectGroupSubmitting);
  const error = useAppSelector(selectGroupError);
  const [state, setState] = React.useState<IGroup>(existingGroup);

  React.useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            label="Название группы"
            name="title"
            id="title"
            value={state.title}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
              label="Выберите дату"
              value={dayjs(state.startDate)}
              onChange={(newValue) =>
                setState((prev) => ({
                  ...prev,
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
              label="Выберите дату"
              value={dayjs(state.endDate)}
              onChange={(newValue) =>
                setState((prev) => ({
                  ...prev,
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            disabled={submitting}
          >
            {isEdit ? 'Сохранить' : 'Отправить'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GroupForm;
