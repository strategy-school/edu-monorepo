import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
  selectTeacherDeleting,
} from '@/src/features/teachers/teachersSlice';
import {
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { selectUser } from '@/src/features/users/usersSlice';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchOneTeacher } from '@/src/features/teachers/teachersThunks';
import Layout from '@/src/components/UI/Layout/Layout';

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

  return (
    <Layout title="Strategia school: страница учителя">
      <Grid mt={5} container justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : (
          teacher && (
            <>
              <Grid
                width="90%"
                boxShadow="0px 0px 8px 5px #BEBEBE"
                borderRadius={7}
                padding={3}
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
                  <Grid item width={500}>
                    <Typography variant="h5" textTransform="uppercase" mb={2}>
                      {teacher.user.firstName} {teacher.user.lastName}
                    </Typography>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="body1">{teacher.info}</Typography>

                    <Divider sx={{ my: 3 }} />
                    <Typography variant="body1" mb={3}>
                      Портфолио:
                    </Typography>
                    {teacher.portfolio.map((port, index) => (
                      <Typography key={index} variant="body1" mb={1}>
                        {index + 1}. {port}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
                {user?.role === 'admin' && (
                  <Grid item container justifyContent="center" spacing={2}>
                    <Grid item>
                      <LoadingButton
                        color="error"
                        variant="contained"
                        loading={
                          deleteLoading ? deleteLoading === teacher._id : false
                        }
                        sx={{ width: '89px' }}
                      >
                        <span>Delete</span>
                      </LoadingButton>
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
