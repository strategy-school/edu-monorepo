import { selectCategories } from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { CoursePrice, SearchCourse } from '@/src/types';
import {
  Button,
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
import React from 'react';

const filterState = <T extends Partial<Record<keyof T, T[keyof T]>>>(
  state: T,
) =>
  Object.entries(state).reduce<Partial<T>>((acc, [key, value]) => {
    if (Boolean(value)) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {});

const CourseFilterForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = React.useState<SearchCourse>({});
  const categories = useAppSelector(selectCategories);

  React.useEffect(() => {
    if (Object.keys(state).length) {
      dispatch(fetchCourses(state));
    }
  }, [state, dispatch]);

  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
      setState((prev) => filterState<SearchCourse>(prev));
    },
    [],
  );

  const onPriceChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({
        ...prev,
        price: { ...prev.price, [name]: value },
      }));
      setState((prev) => ({
        ...prev,
        price: prev.price && filterState<CoursePrice>(prev.price),
      }));
    },
    [],
  );

  const resetFilter = async () => {
    setState({});
    await dispatch(fetchCourses());
  };

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <Typography variant="h5">Фильтрация курсов</Typography>
        </Grid>

        <Grid item xs>
          <FormControl>
            <FormLabel>Уровень сложности</FormLabel>
            <RadioGroup
              value={state.level ? state.level : ''}
              onChange={onChange}
              defaultValue=""
              name="level"
            >
              <FormControlLabel
                value=""
                onClick={resetFilter}
                control={<Radio />}
                label="Все"
              />
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
                label="Управленческий уровень"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs>
          <TextField
            label="Категория"
            select
            name="category"
            value={state.category ? state.category : ''}
            onChange={onChange}
          >
            <MenuItem value="" disabled>
              Пожалуйста, выберите категорию
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
            Цена в сомах
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                label="От"
                value={state.price && state.price.$gte ? state.price.$gte : ''}
                onChange={onPriceChange}
                name="$gte"
                type="number"
              />
            </Grid>

            <Grid item xs>
              <TextField
                label="До"
                value={state.price && state.price.$lte ? state.price.$lte : ''}
                onChange={onPriceChange}
                name="$lte"
                type="number"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container item spacing={1} justifyContent="start">
          <Grid item xs={6} md={12} lg={6}>
            <Button
              type="button"
              color="error"
              variant="contained"
              onClick={resetFilter}
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
