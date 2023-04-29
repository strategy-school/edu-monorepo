import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import Layout from '@/src/components/UI/Layout/Layout';
import { Alert, Box, Grid } from '@mui/material';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import CourseFilterForm from '@/src/features/courses/components/CourseFilterForm/CourseFilterForm';

const Index = () => {
  const dispatch = useAppDispatch();
  const fullCourses = useAppSelector(selectCourses);

  useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Layout title="Strategy school: Courses list">
      <BlocksTitle titleText="Список всех курсов" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <CourseFilterForm />
        </Grid>
        <Grid item xs container spacing={3}>
          {fullCourses.length > 0 ? (
            fullCourses.map((course) => (
              <Grid item xs={12} key={course._id}>
                <CourseCard key={course._id} course={course} />
              </Grid>
            ))
          ) : (
            <Box mt={3}>
              <Alert severity="warning">
                Здесь пока нету курсов по таким параметрам!
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Index;
