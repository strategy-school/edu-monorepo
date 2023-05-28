import FileInput from '@/src/components/UI/FileInput/FileInput';
import {
  selectCategories,
  selectCategoriesFetching,
} from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import {
  selectCourseError,
  selectCourseSubmitting,
} from '@/src/dispatchers/courses/coursesSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ICourse } from '@/src/types';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

interface Props {
  onSubmit: (courseMutation: ICourse) => void;
  existingCourse?: ICourse;
  isEdit?: boolean;
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
  exam: '',
  youtube: false,
  zoom: false,
};

const CourseForm: React.FC<Props> = ({
  onSubmit,
  isEdit,
  existingCourse = initialState,
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const error = useAppSelector(selectCourseError);
  const submitting = useAppSelector(selectCourseSubmitting);
  const [state, setState] = React.useState<ICourse>(existingCourse);
  const [formatError, setFormatError] = useState(false);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: files && files[0] ? files[0] : null,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setFormatError(false);

    if (!state.youtube && !state.zoom) {
      return setFormatError(true);
    }
    await onSubmit(state);
    setState(initialState);
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            id="title"
            label="Заголовок"
            value={state.title}
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
            name="price"
            required
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            error={Boolean(getFieldError('price'))}
            helperText={getFieldError('price')}
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="exam"
            label="Ccылка на финальный экзамен"
            value={state.exam}
            onChange={onChange}
            name="exam"
            type="string"
            InputProps={{ inputProps: { min: 0 } }}
            error={Boolean(getFieldError('exam'))}
            helperText={getFieldError('exam')}
          />
        </Grid>
        {formatError && (
          <Grid item xs>
            <Alert severity="error">
              Выберите хотя бы один формат обучения!
            </Alert>
          </Grid>
        )}
        <Grid item xs>
          <Typography>Выберите формат обучения</Typography>
        </Grid>
        <Grid item xs>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.youtube}
                onChange={onCheckboxChange}
                name="youtube"
                color="primary"
              />
            }
            label="Предзаписанные занятия в YouTube"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={state.zoom}
                onChange={onCheckboxChange}
                name="zoom"
                color="primary"
              />
            }
            label="Онлайн занятия в Zoom"
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Выберите картинку для курса c примерным разрешением 2048 х 562"
            onChange={onFileChange}
            name="image"
            type="image/*"
            errorCheck={getFieldError}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            loadingIndicator="Loading…"
            loading={submitting}
            disabled={submitting}
            type="submit"
            color="primary"
            variant="contained"
          >
            {isEdit ? 'Сохранить' : 'Отправить'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseForm;
