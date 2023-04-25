import React from 'react';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import {
  selectCreateTeacherError,
  selectTeacherCreating,
} from '@/src/features/teachers/teachersSlice';
import { useRouter } from 'next/router';
import { TeacherMutation } from '@/src/types';
import { createTeacher } from '@/src/features/teachers/teachersThunks';
import { Button, Grid } from '@mui/material';

const NewTeacher = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectTeacherCreating);
  const error = useAppSelector(selectCreateTeacherError);

  const onSubmit = async (teacher: TeacherMutation) => {
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
