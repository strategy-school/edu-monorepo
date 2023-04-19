import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import Layout from '@/src/components/UI/Layout/Layout';
import { Grid, Typography } from '@mui/material';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';

const Index = () => {
  const dispatch = useAppDispatch();
  const fullCourses = useAppSelector(selectCourses);

  useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Layout title="Strategy school: Courses list">
      <BlocksTitle titleText="Список всех курсов" />
      <Grid container spacing={3}>
        {fullCourses.map((course) => (
          <Grid item xs={12} md={6} key={course._id}>
            <CourseCard key={course._id} course={course} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
