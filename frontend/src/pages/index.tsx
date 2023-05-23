import AboutUs from '@/src/components/StaticComponents/AboutUs/AboutUs';
import AdBlock from '@/src/components/StaticComponents/AdBanner/AdBlock';
import AfterCourse from '@/src/components/StaticComponents/AfterCourse/AfterCourse';
import FeedbackForm from '@/src/components/StaticComponents/FeedbackForm/FeedbackForm';
import WelcomeBlock from '@/src/components/StaticComponents/WelcomeBlock/WelcomeBlock';
import Layout from '@/src/components/UI/Layout/Layout';
import { fetchTests } from '@/src/dispatchers/tests/testsThunks';
import ClientWrapper from '@/src/features/clients/ClientWrapper/ClientWrapper';
import CoursesWrapper from '@/src/features/courses/components/CoursesWrapper/CoursesWrapper';
import OneCourseBlock from '@/src/features/courses/components/OneCourseBlock/OneCourseBlock';
import TeachersWrapper from '@/src/features/teachers/components/TeachersWrapper/TeachersWrapper';
import TestWrapper from '@/src/features/tests/components/TestWrapper/TestWrapper';
import VideoReviewsWrapper from '@/src/features/videoReviews/VideoReviews/VideoReviewsWrapper';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { fetchCourses } from '../dispatchers/courses/coursesThunks';
import { fetchTeachers } from '../dispatchers/teachers/teachersThunks';
import { wrapper } from '../store/store';

const Home: React.FC = () => {
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
          <Grid item>
            <OneCourseBlock />
          </Grid>
          <Grid item>
            <FeedbackForm />
          </Grid>
          <Grid item>
            <AdBlock />
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
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCourses());
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchTests());

    return { props: {} };
  },
);

export default Home;
