import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { apiURL } from '@/src/constants';
import {
  selectCourseDeleting,
  selectCourseTogglingDeleted,
  selectOneCourse,
} from '@/src/dispatchers/courses/coursesSlice';
import {
  courseToggleDeleted,
  deleteCourse,
  fetchOneCourse,
} from '@/src/dispatchers/courses/coursesThunks';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { blockStyle, blockTopStyle } from '@/src/styles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoneyIcon from '@mui/icons-material/Money';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const CourseId = () => {
  const router = useRouter();
  const { courseId } = router.query as { courseId: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const deleteLoading = useAppSelector(selectCourseDeleting);
  const togglingDeleted = useAppSelector(selectCourseTogglingDeleted);

  React.useEffect(() => {
    void dispatch(fetchOneCourse(courseId));
  }, [dispatch, courseId, deleteLoading]);

  const handleDelete = async () => {
    if (!course) return;
    if (window.confirm('Подтвердите удаление курса')) {
      await dispatch(deleteCourse(course._id));
      void router.push('/admin/courses');
    }
  };

  const toggleCourseDeleted = (id: string) => {
    dispatch(courseToggleDeleted(id));
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
    <AdminLayout>
      {course && (
        <Grid container direction="column" style={blockStyle}>
          <Grid
            container
            justifyContent="space-between"
            spacing={4}
            sx={{ padding: '20px' }}
          >
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
            <Grid item container xs sx={{ mt: 1 }}>
              <Image
                style={{ margin: '0 auto', borderRadius: '30px' }}
                src={apiURL + '/' + course.image}
                alt={course.title}
                width={300}
                height={200}
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
            <Grid item sx={{ ml: 3 }}>
              <LoadingButton
                color="error"
                variant="contained"
                loading={deleteLoading ? deleteLoading === course._id : false}
                disabled={togglingDeleted}
                onClick={handleDelete}
                sx={{ width: '89px' }}
              >
                <span>Удалить</span>
              </LoadingButton>
            </Grid>
            <Grid item sx={{ ml: 3 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => toggleCourseDeleted(course?._id)}
                disabled={togglingDeleted || deleteLoading === course._id}
              >
                {course.isDeleted ? 'Показать' : 'Скрыть'}
              </Button>
            </Grid>
            <Grid item sx={{ ml: 3 }}>
              <Button
                component={Link}
                href={`edit/${course._id}`}
                variant="contained"
                color="primary"
                disabled={togglingDeleted || deleteLoading === course._id}
              >
                Редактировать
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default CourseId;
