import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectTeachers } from '@/src/features/teachers/teachersSlice';
import { fetchTeachers } from '@/src/features/teachers/teachersThunks';
import TeacherCard from '@/src/features/teachers/components/TeacherCard/TeacherCard';
import Layout from '@/src/components/UI/Layout/Layout';

const Index = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Layout title="Strategy school: Teachers list">
      <Grid container justifyContent="center" spacing={3}>
        {teachers.map((teacher) => (
          <Grid
            item
            container
            justifyContent="center"
            flexWrap="wrap"
            xs={12}
            md={6}
            lg={4}
            key={teacher._id}
          >
            <TeacherCard teacher={teacher} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Index;
