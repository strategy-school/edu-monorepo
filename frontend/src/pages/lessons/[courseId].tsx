import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectLessons } from '@/src/dispatchers/lessons/lessonsSlice';
import { useRouter } from 'next/router';
import { selectOneCourse } from '@/src/dispatchers/courses/coursesSlice';
import { fetchLessons } from '@/src/dispatchers/lessons/lessonsThunk';
import { fetchOneCourse } from '@/src/dispatchers/courses/coursesThunks';
import { Grid, Typography } from '@mui/material';
import LessonCardItem from '@/src/features/lessons/admin/LessonCardItem';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '@/src/dispatchers/users/usersSlice';

const CourseId = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const lessons = useAppSelector(selectLessons);
  const course = useAppSelector(selectOneCourse);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchLessons({ course: courseId }));
    dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId]);

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
          <Grid item></Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default CourseId;
