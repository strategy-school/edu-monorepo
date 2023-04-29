import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCategories,
  selectCategoriesFetching,
} from '@/src/features/categories/categoriesSlice';
import { fetchCategories } from '@/src/features/categories/categoriesThunks';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { selectCoursesFetching } from '@/src/features/courses/coursesSlice';

const CourseFilterForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    level: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);
  const loading = useAppSelector(selectCoursesFetching);

  useEffect(() => {
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

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(fetchCourses(state));
  };

  const clearState = async () => {
    setState({
      level: '',
      category: '',
      minPrice: '',
      maxPrice: '',
    });
    await dispatch(fetchCourses());
  };

  return (
    <form onSubmit={submitFormHandler}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">Фильтрация курсов</Typography>
        </Grid>

        <Grid item xs>
          <FormControl>
            <FormLabel>Уровень сложности</FormLabel>
            <RadioGroup
              value={state.level}
              onChange={inputChangeHandler}
              defaultValue=""
              name="level"
            >
              <FormControlLabel value="" control={<Radio />} label="Любой" />
              <FormControlLabel
                value="without level"
                control={<Radio />}
                label="Без уровня"
              />
              <FormControlLabel
                value="basic"
                control={<Radio />}
                label="Базовый уровень"
              />
              <FormControlLabel
                value="professional"
                control={<Radio />}
                label="Профессиональный уровень"
              />
              <FormControlLabel
                value="managerial"
                control={<Radio />}
                label="Управленченский уровень"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <TextField
            label="Категория"
            select
            name="category"
            value={state.category}
            onChange={inputChangeHandler}
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
          <Typography variant="h6" mb={2}>
            Цена
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                id="minPrice"
                label="От"
                value={state.minPrice}
                onChange={inputChangeHandler}
                name="minPrice"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 1000 } }}
              />
            </Grid>

            <Grid item xs>
              <TextField
                id="maxPrice"
                label="До"
                value={state.maxPrice || state.minPrice}
                onChange={inputChangeHandler}
                name="maxPrice"
                type="number"
                InputProps={{
                  inputProps: { min: parseFloat(state.minPrice), step: 1000 },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item spacing={1} justifyContent="start">
          <Grid item xs={6} md={12} lg={6}>
            <LoadingButton
              loadingIndicator="Loading…"
              loading={loading}
              type="submit"
              color="primary"
              variant="contained"
            >
              Применить
            </LoadingButton>
          </Grid>
          <Grid item xs={6} md={12} lg={6}>
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={clearState}
            >
              Сбросить
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default CourseFilterForm;
