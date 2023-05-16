import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import FileInput from '@/src/components/UI/FileInput/FileInput';
import {
  selectCategories,
  selectCategoriesFetching,
} from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import { ICourse, ValidationError } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  onSubmit: (courseMutation: ICourse) => void;
  existingCourse?: ICourse;
  isEdit?: boolean;
  loading: boolean;
  error: ValidationError | null;
  fetchCourseLoading?: boolean;
}

const initialState: ICourse = {
  title: '',
  type: '',
  description: '',
  category: '',
  duration: '',
  price: '',
  theme: '',
  targetAudience: '',
  programGoal: '',
  level: '',
  image: null,
};

const CourseForm: React.FC<Props> = ({
  onSubmit,
  existingCourse,
  isEdit = false,
  loading = false,
  error,
  fetchCourseLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState<ICourse>(
    existingCourse || initialState,
  );
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  React.useEffect(() => {
    setState(existingCourse || initialState);
  }, [existingCourse]);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
            label="Категория"
            select
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
            required
            error={Boolean(getFieldError('category'))}
            helperText={getFieldError('category')}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите категорию{' '}
              {categoriesLoading && (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              )}
            </MenuItem>
            {categories.map((category) => (
              <MenuItem value={category._id} key={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
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
            error={Boolean(getFieldError('theme'))}
            helperText={getFieldError('theme')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="targetAudience"
            label="Целевая аудитория"
            value={state.targetAudience}
            onChange={inputChangeHandler}
            name="targetAudience"
            error={Boolean(getFieldError('targetAudience'))}
            helperText={getFieldError('targetAudience')}
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline
            rows={3}
            id="programGoal"
            label="Задача программы"
            value={state.programGoal}
            onChange={inputChangeHandler}
            name="programGoal"
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
          <FileInput
            label="Выберите картинку для курса"
            onChange={fileInputChangeHandler}
            name="image"
            type="image/*"
            errorCheck={getFieldError}
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
