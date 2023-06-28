import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectOneTest } from '@/src/dispatchers/tests/testsSlice';
import { fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import OneTest from '@/src/features/tests/components/OneTest/OneTest';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { useRouter } from 'next/router';
import React from 'react';

const TestId = () => {
  const router = useRouter();
  const { testId } = router.query as { testId: string };
  const dispatch = useAppDispatch();
  const test = useAppSelector(selectOneTest);

  React.useEffect(() => {
    dispatch(fetchOneTest(testId));
  }, [dispatch, testId]);

  return <AdminLayout>{test && <OneTest test={test} />}</AdminLayout>;
};

export default TestId;
