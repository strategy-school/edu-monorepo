import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { selectTests } from '@/src/dispatchers/tests/testsSlice';
import { fetchTestByCategory } from '@/src/dispatchers/tests/testsThunks';
import TestCard from '@/src/features/tests/components/TestCard/TestCard';
import { Grid } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';

const TestsByCategory = () => {
  const router = useRouter();
  const { testCategoryId } = router.query as { testCategoryId: string };
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);

  useEffect(() => {
    dispatch(fetchTestByCategory(testCategoryId));
  }, [dispatch, testCategoryId]);

  return (
    <Layout title="Школа Маркетинга Strategia: Тест">
      <BlocksTitle titleText={`Тесты по категориям`} />
      <Grid container>
        {tests.length > 0 &&
          tests.map((test) => (
            <Grid item key={test._id} xs={12} md={4}>
              <TestCard test={test} />
            </Grid>
          ))}
      </Grid>
    </Layout>
  );
};

export default TestsByCategory;
