import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import {
  selectOneCourse,
  selectOneCourseFetching,
} from '@/src/dispatchers/courses/coursesSlice';
import { fetchOneCourse } from '@/src/dispatchers/courses/coursesThunks';
import { blockStyle, blockTopStyle } from '@/src/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import {
  Button,
  CircularProgress,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import CourseComments from '@/src/features/comments/CourseComments';
import { useRouter } from 'next/router';
import React from 'react';

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
  const courseLoading = useAppSelector(selectOneCourseFetching);

  React.useEffect(() => {
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
      {courseLoading ? (
        <CircularProgress />
      ) : (
        course && (
          <Grid container style={blockStyle}>
            <Grid container sx={{ padding: '20px' }}>
              <Grid item xs container direction="column" padding="20px">
                <Grid
                  container
                  item
                  xs
                  style={blockTopStyle}
                  textAlign="center"
                >
                  <Grid item xs>
                    <Typography variant="h3">
                      {course.title} ({typeName})
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Категория:</Typography>
                  <Typography component="p">{course.category.title}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Описание курса:</Typography>
                  <Typography component="p">{course.description}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    Чему вы научитесь на курсе:
                  </Typography>
                  <Typography component="p">{course.theme}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Целевая аудитория: </Typography>
                  <Typography component="p">{course.targetAudience}</Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Задача программы:</Typography>
                  <Typography component="p">{course.programGoal}</Typography>
                </Grid>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                xs
                marginTop={marginTop}
              >
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

            <Grid item sx={{ my: 2, padding: '20px' }}>
              <Typography
                component="div"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <AccessTimeIcon fontSize="small" />

                <Typography
                  component="span"
                  style={{ marginLeft: '20px', fontWeight: '700' }}
                >
                  Продолжительность: {course.duration}
                </Typography>
              </Typography>

              <Typography
                component="div"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <MoneyIcon fontSize="small" />
                <Typography
                  component="span"
                  style={{ marginLeft: '20px', fontWeight: '700' }}
                >
                  Цена: {course.price} сом
                </Typography>
              </Typography>
            </Grid>
            {course && (
              <Grid item container sx={{ padding: '20px' }}>
                {course.zoom && (
                  <Grid
                    item
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                    md={6}
                  >
                    <Typography mb={1}>
                      Курс с онлайн видео-уроками в Zoom
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: 'info.main' }}>
                      Записаться
                    </Button>
                  </Grid>
                )}
                {course.youtube && (
                  <Grid
                    item
                    container
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    xs={12}
                    md={6}
                  >
                    <Typography mb={1}>
                      Курс с предзаписанными видео-уроками
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: 'info.main' }}>
                      Записаться
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        )
      )}
      <CourseComments courseId={courseId} />
    </Layout>
  );
};

export default CourseId;
