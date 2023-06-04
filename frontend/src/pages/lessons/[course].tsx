import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectOneCourse } from '@/src/dispatchers/courses/coursesSlice';
import { fetchOneCourse } from '@/src/dispatchers/courses/coursesThunks';
import {
  selectLessons,
  selectLessonsLoading,
} from '@/src/dispatchers/lessons/lessonsSlice';
import { fetchLessons } from '@/src/dispatchers/lessons/lessonsThunk';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import LessonCardItem from '@/src/features/lessons/LessonCardItem';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

const CourseId: React.FC = () => {
  const router = useRouter();
  const { course } = router.query as { course: string };
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(selectLessons);
  const existedCourse = useAppSelector(selectOneCourse);
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectLessonsLoading);

  console.log(course);
  React.useEffect(() => {
    if (course) {
      dispatch(fetchLessons({ course }));
      dispatch(fetchOneCourse(course));
    }
  }, [dispatch, course]);

  return (
    <ProtectedRoute isAllowed={Boolean(user)}>
      <Layout title="Школа Маркетинга Strategia: Уроки">
        {loading ? (
          <Grid container justifyContent="center" mt={5}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h4">
                Уроки по курсу <b>{existedCourse?.title}</b>
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              {lessons.length > 0 &&
                lessons.map((lesson) => (
                  <Grid key={lesson._id} item xs={12} md={6} lg={4}>
                    <LessonCardItem lesson={lesson} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default CourseId;
