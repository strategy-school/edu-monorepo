import { useAppDispatch } from '@/src/app/hooks';
import AboutUs from '@/src/components/StaticComponents/AboutUs/AboutUs';
import WelcomeBlock from '@/src/components/StaticComponents/WelcomeBlock/WelcomeBlock';
import Layout from '@/src/components/UI/Layout/Layout';
import CoursesWrapper from '@/src/features/courses/components/CoursesWrapper/CoursesWrapper';
import TeachersWrapper from '@/src/features/teachers/components/TeachersWrapper/TeachersWrapper';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { fetchCourses } from '../dispatchers/courses/coursesThunks';
import { fetchTeachers } from '../dispatchers/teachers/teachersThunks';
import FeedbackForm from '@/src/components/StaticComponents/FeedbackForm/FeedbackForm';

export default function Home() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
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
            <FeedbackForm />
          </Grid>
          <Grid item>
            <TeachersWrapper />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
