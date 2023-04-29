import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectTeachers } from '@/src/dispatchers/teachers/teachersSlice';
import { fetchTeachers } from '@/src/dispatchers/teachers/teachersThunks';
import TeacherCard from '@/src/features/teachers/components/TeacherCard/TeacherCard';
import { Grid } from '@mui/material';
import React from 'react';

const Index = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);

  React.useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <Layout title="Strategy school: Teachers list">
      <BlocksTitle titleText="Список всех преподавателей" />
      <Grid container justifyContent="center" spacing={2}>
        {teachers.length > 0 &&
          teachers.map((teacher) => (
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
              <TeacherCard
                _id={teacher._id}
                firstName={teacher.user.firstName}
                lastName={teacher.user.lastName}
                photo={teacher.photo}
              />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default Index;
