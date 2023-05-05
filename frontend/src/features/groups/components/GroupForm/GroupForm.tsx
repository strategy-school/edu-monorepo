import React, { useEffect, useState } from 'react';
import { IGroup, ValidationError } from '@/src/types';
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';

interface Props {
  onSubmit: (groupMutation: IGroup) => void;
  loading: boolean;
  error: ValidationError | null;
}

const GroupForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);

  const [state, setState] = useState<IGroup>({
    title: '',
    description: '',
    course: '',
    startDate: '',
    endDate: '',
    startsAt: '',
    duration: '',
    telegramLink: '',
  });

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
      <Grid container direction="column" spacing={2}>
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
          <Typography component="p">Дата начала обучения</Typography>
          <TextField
            type="date"
            id="startDate"
            name="startDate"
            value={state.startDate}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('startDate'))}
            helperText={getFieldError('startDate')}
          />
        </Grid>
        <Grid item xs>
          <Typography component="p">Дата завершения обучения</Typography>
          <TextField
            type="date"
            id="endDate"
            name="endDate"
            value={state.endDate}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('endDate'))}
            helperText={getFieldError('endDate')}
          />
        </Grid>
        <Grid item xs>
          <Typography component="p">Время начала занятий</Typography>
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
            Создать группу
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default GroupForm;
