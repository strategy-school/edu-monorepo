import React, { useEffect, useState } from 'react';
import { CourseMutation, ValidationError } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  onSubmit: (courseMutation: CourseMutation) => void;
  existingCourse?: CourseMutation;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
  fetchCourseLoading?: boolean;
}

const initialState: CourseMutation = {
  title: '',
  type: '',
  description: '',
  duration: '',
  price: '',
  theme: '',
  targetAudience: '',
  programGoal: '',
  level: '',
};

const CourseForm: React.FC<Props> = ({
  onSubmit,
  existingCourse,
  isEdit = false,
  loading = false,
  error,
  fetchCourseLoading = false,
}) => {
  const [state, setState] = useState<CourseMutation>(
    existingCourse || initialState,
  );
  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    setState(existingCourse || initialState);
  }, [existingCourse]);

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">
            {isEdit ? 'Редактировать' : 'Новый'} курс{' '}
            {fetchCourseLoading && (
              <CircularProgress size={20} sx={{ ml: 1 }} />
            )}
          </Typography>
        </Grid>

        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
            error={Boolean(getFieldError('title'))}
            helperText={getFieldError('title')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            label="Уровень сложности"
            select
            name="level"
            value={state.level}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('level'))}
            helperText={getFieldError('level')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите уровень сложности{' '}
            </MenuItem>
            <MenuItem value="without level">Без уровня</MenuItem>
            <MenuItem value="basic">Базовый уровень</MenuItem>
            <MenuItem value="professional">Профессиональный уровень</MenuItem>
            <MenuItem value="managerial">Управленченский уровень</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            label="Тип"
            select
            name="type"
            value={state.type}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('type'))}
            helperText={getFieldError('type')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите тип{' '}
            </MenuItem>
            <MenuItem value="seminar">Семинар</MenuItem>
            <MenuItem value="training">Трейнинг</MenuItem>
            <MenuItem value="course">Курс</MenuItem>
            <MenuItem value="miniMBA">Mini MBA</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="description"
            label="Описание"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
            error={Boolean(getFieldError('description'))}
            helperText={getFieldError('description')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="theme"
            label="Что будет изучаться на курсе (тема)"
            value={state.theme}
            onChange={inputChangeHandler}
            name="theme"
            required
            error={Boolean(getFieldError('theme'))}
            helperText={getFieldError('theme')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            rows={3}
            id="targetAudience"
            label="Целевая аудитория"
            value={state.targetAudience}
            onChange={inputChangeHandler}
            name="targetAudience"
            required
            error={Boolean(getFieldError('targetAudience'))}
            helperText={getFieldError('targetAudience')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            rows={3}
            id="programGoal"
            label="Задача программы"
            value={state.programGoal}
            onChange={inputChangeHandler}
            name="programGoal"
            required
            error={Boolean(getFieldError('programGoal'))}
            helperText={getFieldError('programGoal')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="duration"
            label="Продолжительность"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
            required
            error={Boolean(getFieldError('duration'))}
            helperText={getFieldError('duration')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            id="price"
            label="Цена"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={loading}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Создать'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;