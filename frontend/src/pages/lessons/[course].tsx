import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectOneCourse } from '@/src/dispatchers/courses/coursesSlice';
import { fetchOneCourse } from '@/src/dispatchers/courses/coursesThunks';
import { selectLessons } from '@/src/dispatchers/lessons/lessonsSlice';
import { fetchLessons } from '@/src/dispatchers/lessons/lessonsThunk';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import LessonCardItem from '@/src/features/lessons/LessonCardItem';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const CourseId: React.FC = () => {
  const lessons = useAppSelector(selectLessons);
  const course = useAppSelector(selectOneCourse);
  const user = useAppSelector(selectUser);

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout title="Strategy School: Lessons">
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h4">
              Уроки по курсу <b>{course?.title}</b>
            </Typography>
          </Grid>
          <Grid item container spacing={2}>
            {lessons.map((lesson) => (
              <Grid key={lesson._id} item xs={12} md={6} lg={4}>
                <LessonCardItem lesson={lesson} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { course } = params as { course: string };
      await store.dispatch(fetchLessons({ course }));
      await store.dispatch(fetchOneCourse(course));

      return { props: {} };
    },
);

export default CourseId;
