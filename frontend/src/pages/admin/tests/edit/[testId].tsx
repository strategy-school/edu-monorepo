import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import {
  selectOneTest,
  selectTestUpdating,
  selectTestUpdatingError,
} from '@/src/dispatchers/tests/testsSlice';
import { editTest, fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import { TestMutation } from '@/src/types';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import { Button, Grid } from '@mui/material';
import TestForm from '@/src/features/tests/components/TestForm/TestForm';

const EditTest = () => {
  const router = useRouter();
  const { testId } = router.query as { testId: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const test = useAppSelector(selectOneTest);
  const error = useAppSelector(selectTestUpdatingError);
  const updateLoading = useAppSelector(selectTestUpdating);

  useEffect(() => {
    dispatch(fetchOneTest(testId));
  }, [dispatch, testId]);

  const existingTest = test && {
    category: test.category._id,
    title: test.title,
    description: test.description,
    questions: test.questions.map((question) => {
      return {
        question: question.question,
        answers: question.answers,
        correctAnswer: question.correctAnswer,
      };
    }),
  };

  const onSubmit = async (test: TestMutation) => {
    await dispatch(editTest({ id: testId, test })).unwrap();
    void router.push(`/admin/tests/`);
  };
  const handleGoBack = () => {
    router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | edit teacher">
        <Grid>
          <Button onClick={handleGoBack} sx={{ mb: 3 }}>
            Назад
          </Button>
          {existingTest && (
            <TestForm
              onSubmit={onSubmit}
              loading={updateLoading}
              error={error}
              existingTest={existingTest}
              isEdit
            />
          )}
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default EditTest;
