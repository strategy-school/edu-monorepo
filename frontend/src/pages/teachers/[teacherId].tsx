import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
  selectTeacherDeleting,
} from '@/src/features/teachers/teachersSlice';
import {
  Button,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { selectUser } from '@/src/features/users/usersSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  deleteTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from '@/src/features/teachers/teachersThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { borderRadius, boxShadow } from '@/src/styles';
import { Property } from 'csstype';
import Link from 'next/link';
import TextAlign = Property.TextAlign;
import theme from '@/src/theme';

const styles = {
  teacherWrapper: {
    width: '90%',
    boxShadow,
    borderRadius,
  },
  media: {
    maxWidth: '500px',
    borderRadius,
  },
  text: {
    textAlign: 'justify' as TextAlign,
    marginBottom: '30px',
  },
};

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);
  const loading = useAppSelector(selectOneTeacherFetching);
  const deleteLoading = useAppSelector(selectTeacherDeleting);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    void dispatch(fetchOneTeacher(teacherId));
  }, [dispatch, teacherId]);

  const handleEditClick = () => {
    void router.push(`/teachers/edit/${teacherId}`);
  };

  const handleDelete = async () => {
    if (!teacher) return;
    if (window.confirm('Подтвердите удаление преподавателя')) {
      await dispatch(deleteTeacher(teacher._id));
      await router.push('/teachers');
      dispatch(fetchTeachers());
    }
  };
  return (
    <Layout title="Strategia school: страница учителя">
      <Grid container justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : (
          teacher && (
            <>
              <Grid
                style={styles.teacherWrapper}
                padding={{ xs: '10px 20px', md: '15px 50px' }}
              >
                <Grid
                  container
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mb={4}
                >
                  <Grid item mb={3}>
                    <CardMedia
                      component="img"
                      sx={{ maxWidth: 500, borderRadius: 7 }}
                      image={apiURL + '/' + teacher.photo}
                      alt={teacher.user.firstName}
                    />
                  </Grid>
                  <Grid item width="100%">
                    <Typography variant="h5" textTransform="uppercase" mb={2}>
                      {teacher.user.firstName} {teacher.user.lastName}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography
                      variant="body1"
                      style={styles.text}
                      fontSize={{ xs: '14px', md: theme.typography.fontSize }}
                    >
                      {teacher.info}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" mb={3}>
                      Портфолио:
                    </Typography>
                    {teacher.portfolio.map((port, index) => (
                      <Typography
                        key={index}
                        style={styles.text}
                        variant="body1"
                        fontSize={{ xs: '14px', md: theme.typography.fontSize }}
                      >
                        {index + 1}. {port}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
                {user?.role === 'admin' && (
                  <Grid
                    item
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item container justifyContent="center" xs={12} md={6}>
                      <LoadingButton
                        color="error"
                        variant="contained"
                        loading={
                          deleteLoading ? deleteLoading === teacher._id : false
                        }
                        onClick={handleDelete}
                        sx={{
                          width: '150px',
                          fontSize: '14px',
                          [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.fontSize,
                          },
                        }}
                      >
                        Удалить
                      </LoadingButton>
                    </Grid>
                    <Grid item container justifyContent="center" xs={12} md={6}>
                      <Button
                        onClick={handleEditClick}
                        variant="contained"
                        color="primary"
                        sx={{
                          fontSize: '14px',
                          [theme.breakpoints.up('md')]: {
                            fontSize: theme.typography.fontSize,
                          },
                        }}
                      >
                        Редактировать
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </>
          )
        )}
      </Grid>
    </Layout>
  );
};

export default TeacherId;
