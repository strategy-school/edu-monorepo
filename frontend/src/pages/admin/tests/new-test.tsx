import React from 'react';
import TestForm from '@/src/features/tests/components/TestForm/TestForm';
import Layout from '@/src/components/UI/Layout/Layout';
import { TestMutation } from '@/src/types';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { useRouter } from 'next/router';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { Button, Grid } from '@mui/material';
import {
  selectTestCreating,
  selectTestCreatingError,
} from '@/src/dispatchers/tests/testsSlice';
import { createTest } from '@/src/dispatchers/tests/testsThunks';

const NewTest = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const loading = useAppSelector(selectTestCreating);
  const testCreatingError = useAppSelector(selectTestCreatingError);
  const onSubmit = async (test: TestMutation) => {
    await dispatch(createTest(test)).unwrap();
    void router.push('/admin/tests');
  };
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia school Admin | Add Test">
        <Grid>
          <Button onClick={handleGoBack} sx={{ mb: 3 }}>
            Назад
          </Button>
          <TestForm
            onSubmit={onSubmit}
            loading={loading}
            error={testCreatingError}
          />
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewTest;
