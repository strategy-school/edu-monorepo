import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectCreateTeacherError,
  selectTeacherCreating,
} from '@/src/dispatchers/teachers/teachersSlice';
import { createTeacher } from '@/src/dispatchers/teachers/teachersThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import { ITeacher } from '@/src/types';
import { Button, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const NewTeacher = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectTeacherCreating);
  const error = useAppSelector(selectCreateTeacherError);

  const onSubmit = async (teacher: ITeacher) => {
    await dispatch(createTeacher(teacher)).unwrap();
    void router.push('/admin/teachers');
  };
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | add teacher">
        <Grid>
          <Button onClick={handleGoBack} sx={{ mb: 3 }}>
            Назад
          </Button>
          <TeacherForm onSubmit={onSubmit} loading={loading} error={error} />
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewTeacher;
