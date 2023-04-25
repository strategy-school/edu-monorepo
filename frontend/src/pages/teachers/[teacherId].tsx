import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneTeacher,
  selectOneTeacherFetching,
} from '@/src/features/teachers/teachersSlice';
import {
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { fetchOneTeacher } from '@/src/features/teachers/teachersThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { borderRadius, boxShadow } from '@/src/styles';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;

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

  useEffect(() => {
    void dispatch(fetchOneTeacher(teacherId));
  }, [dispatch, teacherId]);

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
                      fontSize={{ xs: '14px', md: '18px' }}
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
                        fontSize={{ xs: '14px', md: '18px' }}
                      >
                        {index + 1}. {port}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </>
          )
        )}
      </Grid>
    </Layout>
  );
};

export default TeacherId;
