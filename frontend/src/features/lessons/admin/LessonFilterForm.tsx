import React, { useEffect, useState } from 'react';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import { fetchLessons } from '@/src/dispatchers/lessons/lessonsThunk';

const LessonFilterForm = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const [state, setState] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLessons({ course: state || undefined }));
  }, [state, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={4}>
        <Typography variant="h6">Сортировка по курсу:</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          label="Курс"
          select
          name="course"
          value={state}
          onChange={onChange}
        >
          <MenuItem value="" disabled>
            Пожалуйста, выберите курс
          </MenuItem>
          <MenuItem value="">Все уроки</MenuItem>
          {courses.map((course) => (
            <MenuItem value={course._id} key={course._id}>
              {course.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};

export default LessonFilterForm;
