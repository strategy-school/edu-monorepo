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
import { motion, AnimatePresence } from 'framer-motion';
import { ONE_BY_ONE_ANIMATION } from '@/src/styles';
import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
  const gridItems = [
    { component: <WelcomeBlock />, key: 'welcome' },
    { component: <CoursesWrapper />, key: 'courses' },
    { component: <AboutUs />, key: 'about' },
    { component: <OneCourseBlock />, key: 'one-course' },
    { component: <FeedbackForm />, key: 'feedback' },
    { component: <AdBlock />, key: 'ad' },
    { component: <TeachersWrapper />, key: 'teachers' },
    { component: <VideoReviewsWrapper />, key: 'video-reviews' },
    { component: <TestWrapper />, key: 'test' },
    { component: <ClientWrapper />, key: 'client' },
    { component: <AfterCourse />, key: 'after-course' },
  ];

  return (
    <Layout title="Школа Маркетинга Strategia">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mt={5}
      >
        <AnimatePresence>
          <Grid container flexDirection="column" gap={5}>
            {gridItems.map(({ component, key }, i) => (
              <motion.div
                key={key}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={ONE_BY_ONE_ANIMATION}
              >
                <Grid item>{component}</Grid>
              </motion.div>
            ))}
          </Grid>
        </AnimatePresence>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(fetchCourses());
    await store.dispatch(fetchTeachers());
    await store.dispatch(fetchTests());

    return { props: {} };
  });

export default Home;
