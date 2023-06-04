import Layout from '@/src/components/UI/Layout/Layout';
import { apiURL } from '@/src/constants';
import {
  selectOneCourse,
  selectOneCourseFetching,
} from '@/src/dispatchers/courses/coursesSlice';
import { fetchOneCourse } from '@/src/dispatchers/courses/coursesThunks';
import CourseComments from '@/src/features/comments/CourseComments';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
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
import React from 'react';
import { useRouter } from 'next/router';

const imgStyle = {
  xs: 250,
  md: 400,
  lg: 500,
  xl: 500,
};

const imgStyleHeight = {
  xs: 120,
  md: 200,
  lg: 270,
  xl: 270,
};

const marginTop = {
  xs: '10px',
  md: '20px',
  lg: '80px',
};

const CourseId: React.FC = () => {
  const router = useRouter();
  const course = useAppSelector(selectOneCourse);
  const courseLoading = useAppSelector(selectOneCourseFetching);

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

  const handleGoBack = () => {
    router.back();
  };
  return (
    <Layout
      title={'Школа Маркетинга Strategia: ' + course?.title}
      description={course?.description}
      keywords={[
        course?.category.title,
        course?.programGoal,
        course?.targetAudience,
        course?.type,
        course?.level,
      ].join(', ')}
    >
      {courseLoading ? (
        <CircularProgress />
      ) : (
        course && (
          <Grid container style={blockStyle}>
            <Grid container>
              <Grid item xs container direction="column" padding="20px">
                <Button onClick={handleGoBack} sx={{ alignSelf: 'flex-start' }}>
                  Назад
                </Button>
                <Grid container item xs style={blockTopStyle}>
                  <Grid item xs>
                    <Typography
                      variant="h3"
                      fontSize={{ xs: '2rem', sm: '2.5rem' }}
                    >
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
                      : 100
                  }
                  height={
                    isXs
                      ? imgStyleHeight.xs
                      : isMd
                      ? imgStyleHeight.md
                      : isLg
                      ? imgStyleHeight.lg
                      : isXl
                      ? imgStyleHeight.xl
                      : 10
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
                      Купить курс
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
                      Купить курс
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        )
      )}
      <CourseComments />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { courseId } = params as { courseId: string };
      await store.dispatch(fetchOneCourse(courseId));

      return { props: {} };
    },
);

export default CourseId;
