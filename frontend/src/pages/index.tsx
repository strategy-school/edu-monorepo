import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import WelcomeBlock from '@/src/components/StaticComponents/WelcomeBlock/WelcomeBlock';
import AboutUs from '@/src/components/StaticComponents/AboutUs/AboutUs';
import CoursesWrapper from '@/src/components/CoursesWrapper/CoursesWrapper';

export default function Home() {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  console.log(courses);
  return (
    <Layout title="Strategia home page">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mt={5}
      >
        <Grid container flexDirection="column" spacing={4}>
          <Grid item>
            <WelcomeBlock />
          </Grid>
          <Grid item>
            <AboutUs />
          </Grid>
          <Grid item>
            <CoursesWrapper />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
