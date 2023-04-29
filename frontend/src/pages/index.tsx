import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppDispatch } from '@/src/app/hooks';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import WelcomeBlock from '@/src/components/StaticComponents/WelcomeBlock/WelcomeBlock';
import AboutUs from '@/src/components/StaticComponents/AboutUs/AboutUs';
import CoursesWrapper from '@/src/features/courses/components/CoursesWrapper/CoursesWrapper';
import { fetchTeachers } from '@/src/features/teachers/teachersThunks';
import TeachersWrapper from '@/src/features/teachers/components/TeachersWrapper/TeachersWrapper';

export default function Home() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Layout title="Strategy school">
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
          <Grid item>
            <TeachersWrapper />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
