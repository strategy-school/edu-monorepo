import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchOneCourse } from '@/src/features/courses/coursesThunks';
import { selectOneCourse } from '@/src/features/courses/coursesSlice';
import { borderRadius } from '@/src/styles';
import theme from '@/src/theme';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';

const blockStyle = {
  margin: '10px',
  width: '95vw',
  borderRadius,
  height: '90vh',
  border: '1px solid rgb(217, 39, 45)',
  borderTop: 'none',
  padding: 0,
};

const blockTopStyle = {
  background: theme.palette.secondary.main,
  color: '#fff',
  paddingTop: '10px',
  paddingBottom: '10px',
  borderTopLeftRadius: '35px',
  borderTopRightRadius: '35px',
};

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);

  useEffect(() => {
    void dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId]);

  console.log(course);

  return (
    <Layout title={`${course?.title} page`}>
      <Grid container direction="column" style={blockStyle}>
        <Grid item xs style={blockTopStyle} textAlign="center">
          <Typography variant="h3">
            {course?.title} ({course?.type})
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
