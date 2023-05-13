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
import { fetchTests } from '@/src/dispatchers/tests/testsThunks';
import TestWrapper from '@/src/features/tests/components/TestWrapper/TestWrapper';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';
import AfterCourse from '@/src/components/StaticComponents/AfterCourse/AfterCourse';
import OneCourseBlock from '@/src/features/courses/components/OneCourseBlock/OneCourseBlock';
import ClientWrapper from '@/src/features/clients/ClientWrapper/ClientWrapper';

export default function Home() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchTeachers());
    dispatch(fetchTests());
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
            <CoursesWrapper />
          </Grid>
          <Grid item>
            <AboutUs />
          </Grid>
          <Grid>
            <OneCourseBlock />
          </Grid>
          <Grid item>
            <FeedbackForm />
          </Grid>
          <Grid item>
            <TeachersWrapper />
          </Grid>
          <Grid item>
            <VideoReviewsWrapper />
          </Grid>
          <Grid item>
            <TestWrapper />
          </Grid>
          <Grid item>
            <ClientWrapper />
          </Grid>
          <Grid item>
            <AfterCourse />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}
