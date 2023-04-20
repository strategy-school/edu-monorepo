import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  deleteCourse,
  fetchOneCourse,
} from '@/src/features/courses/coursesThunks';
import {
  selectCourseDeleting,
  selectOneCourse,
} from '@/src/features/courses/coursesSlice';
import { Button, Divider, Grid, Typography } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import { blockStyle, blockTopStyle } from '@/src/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import { selectUser } from '@/src/features/users/usersSlice';

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const user = useAppSelector(selectUser);
  const deleteLoading = useAppSelector(selectCourseDeleting);

  useEffect(() => {
    void dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId]);

  const handleDelete = async () => {
    if (!course) return;
    if (window.confirm('Подтвердите удаление курса')) {
      await dispatch(deleteCourse(course._id));
      void router.push('/courses');
    }
  };

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
      {course && (
        <Grid container direction="column" style={blockStyle}>
          <Grid container item xs style={blockTopStyle} textAlign="center">
            <Grid item xs>
              <Typography variant="h3">
                {course?.title} ({typeName})
              </Typography>
            </Grid>
            {/*<Grid item xs>*/}
            {/*  <img style={{margin: '0 auto'}} src={'http://localhost:8000/' + course?.image} alt={course?.title!} width={600} height={300}/>*/}
            {/*</Grid>*/}
          </Grid>

          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="h6">Описание курса:</Typography>
            <Typography component="p">{course?.description}</Typography>
          </Grid>

          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="h6">Чему вы научитесь на курсе:</Typography>
            <Typography component="p">{course?.theme}</Typography>
          </Grid>

          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="h6">Целевая аудитория: </Typography>
            <Typography component="p">{course?.targetAudience}</Typography>
          </Grid>

          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="h6">Задача программы:</Typography>
            <Typography component="p">{course?.programGoal}</Typography>
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
          <Grid item sx={{ m: 3 }} container>
            <Grid item xs>
              <Button variant="contained" color="secondary">
                Запишись сейчас!
              </Button>
            </Grid>
            {user && user.role === 'admin' && (
              <Grid
                item
                container
                xs={4}
                style={{ marginLeft: 'auto' }}
                spacing={2}
              >
                <Grid item>
                  <LoadingButton
                    color="error"
                    variant="contained"
                    loading={
                      deleteLoading ? deleteLoading === course._id : false
                    }
                    onClick={handleDelete}
                    sx={{ width: '89px' }}
                  >
                    <span>Удалить</span>
                  </LoadingButton>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    href={`/courses/edit/${course._id}`}
                    variant="contained"
                    color="primary"
                  >
                    Редактировать
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default CourseId;
