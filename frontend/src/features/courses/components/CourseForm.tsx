import React, { useState } from 'react';
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
};

const CourseForm: React.FC<Props> = ({
  onSubmit,
  existingCourse = initialState,
  isEdit = false,
  loading = false,
  error,
  fetchCourseLoading = false,
}) => {
  const [state, setState] = useState<CourseMutation>(existingCourse);
  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

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
    onSubmit(state);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h4">
            {isEdit ? 'Редактировать' : 'Новый'} курс
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
              {fetchCourseLoading && (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              )}
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
