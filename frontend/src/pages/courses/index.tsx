import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import CourseFilterForm from '@/src/features/courses/components/CourseFilterForm/CourseFilterForm';
import { Alert, Box, Grid } from '@mui/material';
import React from 'react';

const Index = () => {
  const dispatch = useAppDispatch();
  const fullCourses = useAppSelector(selectCourses);

  React.useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <Layout title="Школа Маркетинга Strategia: Список курсов">
      <BlocksTitle titleText="Список всех курсов" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <CourseFilterForm />
        </Grid>
        <Grid item xs={12} md={9} container spacing={3}>
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
