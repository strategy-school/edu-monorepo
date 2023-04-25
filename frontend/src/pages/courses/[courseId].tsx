import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchOneCourse } from '@/src/features/courses/coursesThunks';
import { selectOneCourse } from '@/src/features/courses/coursesSlice';
import { Button, Grid, Typography, useMediaQuery } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import { blockStyle, blockTopStyle } from '@/src/styles';
import Image from 'next/image';
import { apiURL } from '@/src/constants';

const imgStyle = {
  xs: 300,
  md: 400,
  lg: 500,
  xl: 500,
};

const marginTop = {
  xs: '10px',
  md: '20px',
  lg: '80px',
};

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);

  useEffect(() => {
    void dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId]);

  const typeName =
    course?.type === 'seminar'
      ? 'Семинар'
      : course?.type === 'training'
      ? 'Тренинг'
      : course?.type === 'course'
      ? 'Курс'
      : 'Mini MBA';

  const isXs = useMediaQuery('(max-width:599px)');
  const isMd = useMediaQuery('(min-width:600px) and (max-width:959px)');
  const isLg = useMediaQuery('(min-width:960px) and (max-width:1279px)');
  const isXl = useMediaQuery('(min-width:1280px)');

  return (
    <Layout title={`${course?.title} page`}>
      {course && (
        <Grid container direction="column" style={blockStyle}>
          <Grid container spacing={4}>
            <Grid item xs container direction="column">
              <Grid container item xs style={blockTopStyle} textAlign="center">
                <Grid item xs>
                  <Typography variant="h3">
                    {course.title} ({typeName})
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Категория:</Typography>
                <Typography component="p">{course.category.title}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Описание курса:</Typography>
                <Typography component="p">{course.description}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">
                  Чему вы научитесь на курсе:
                </Typography>
                <Typography component="p">{course.theme}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Целевая аудитория: </Typography>
                <Typography component="p">{course.targetAudience}</Typography>
              </Grid>

              <Grid item xs sx={{ p: 1, pl: 3 }}>
                <Typography variant="h6">Задача программы:</Typography>
                <Typography component="p">{course.programGoal}</Typography>
              </Grid>
            </Grid>
            <Grid item xs marginTop={marginTop}>
              <Image
                style={{ margin: '0 auto', borderRadius: '10%' }}
                src={apiURL + '/' + course.image}
                alt={course.title}
                width={
                  isXs
                    ? imgStyle.xs
                    : isMd
                    ? imgStyle.md
                    : isLg
                    ? imgStyle.lg
                    : isXl
                    ? imgStyle.xl
                    : undefined
                }
                height={
                  isXs
                    ? imgStyle.xs
                    : isMd
                    ? imgStyle.md
                    : isLg
                    ? imgStyle.lg
                    : isXl
                    ? imgStyle.xl
                    : undefined
                }
              />
            </Grid>
          </Grid>

          <Grid item sx={{ mt: 2, mb: 2, pl: 3 }}>
            <Typography component="div" style={{ position: 'relative' }}>
              <AccessTimeIcon
                fontSize="small"
                style={{ position: 'absolute', top: '1px', left: '5px' }}
              />

              <Typography
                component="span"
                style={{ marginLeft: '30px', fontWeight: '700' }}
              >
                Продолжительность: {course.duration}
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
                Цена: {course.price} сом
              </Typography>
            </Typography>
          </Grid>
          <Grid item container sx={{ mb: 3 }}>
            <Grid item sx={{ ml: 3 }}>
              <Button variant="contained" color="secondary">
                Запишись сейчас!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default CourseId;
