import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { selectOneTest } from '@/src/dispatchers/tests/testsSlice';
import { fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import OneTest from '@/src/features/tests/components/OneTest/OneTest';

const TestId = () => {
  const router = useRouter();
  const { testId } = router.query as { testId: string };
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const test = useAppSelector(selectOneTest);

  useEffect(() => {
    dispatch(fetchOneTest(testId));
  }, [dispatch, testId]);
  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | teacher page">
        {test && <OneTest test={test} />}
      </Layout>
    </ProtectedRoute>
  );
};

export default TestId;
