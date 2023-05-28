import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import { fetchCourses } from '@/src/dispatchers/courses/coursesThunks';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import CourseFilterForm from '@/src/features/courses/components/CourseFilterForm/CourseFilterForm';
import useKeywords from '@/src/hooks/useKeywords';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { Alert, Box, Grid } from '@mui/material';
import React from 'react';

const Index: React.FC = () => {
  const fullCourses = useAppSelector(selectCourses);
  const courseKeys = useKeywords(fullCourses, 'title');

  return (
    <Layout
      title="Школа Маркетинга Strategia: Список курсов"
      keywords={courseKeys}
    >
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCourses());
    await store.dispatch(fetchCategories());

    return { props: {} };
  },
);

export default Index;
