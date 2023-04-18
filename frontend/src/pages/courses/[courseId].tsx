import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchOneCourse } from '@/src/features/courses/coursesThunks';
import { selectOneCourse } from '@/src/features/courses/coursesSlice';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import { blockStyle } from '@/src/styles';
import { blockTopStyle } from '@/src/styles';

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);

  useEffect(() => {
    void dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId]);

  console.log(course);

  const typeName =
    course?.type === 'seminar'
      ? 'Семинар'
      : course?.type === 'training'
      ? 'Тренинг'
      : course?.type === 'course'
      ? 'Курс'
      : 'Mini MBA';

  return (
    <Layout title={`${course?.title} page`}>
      <Grid container direction="column" style={blockStyle} xs={12}>
        <Grid item xs style={blockTopStyle} textAlign="center">
          <Typography variant="h3">
            {course?.title} ({typeName})
          </Typography>
        </Grid>

        <Grid item xs sx={{ p: 1 }}>
          <Typography variant="h6">Описание курса:</Typography>
          <Typography component="p">{course?.description}</Typography>
        </Grid>
        <Divider />
        <Grid item sx={{ mt: 2, mb: 2 }}>
          <Typography component="div" style={{ position: 'relative' }}>
            <AccessTimeIcon
              fontSize="small"
              style={{ position: 'absolute', top: '1px', left: '5px' }}
            />

            <Typography
              component="span"
              style={{ marginLeft: '30px', fontWeight: '700' }}
            >
              Продолжительность: {course?.duration}
            </Typography>
          </Typography>

          <Typography component="div" style={{ position: 'relative' }}>
            <MoneyIcon
              fontSize="small"
              style={{ position: 'absolute', top: '1px', left: '5px' }}
            />
            <Typography
              component="span"
              style={{ marginLeft: '30px', fontWeight: '700' }}
            >
              Цена: {course?.price} сом
            </Typography>
          </Typography>
        </Grid>
        <Divider />
        <Grid item sx={{ m: 3 }}>
          <Button variant="contained" color="secondary">
            Запишись сейчас!
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default CourseId;
