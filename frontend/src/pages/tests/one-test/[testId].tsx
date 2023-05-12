import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectOneTest,
  selectTestsFetching,
} from '@/src/dispatchers/tests/testsSlice';
import { fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import TestForUser from '@/src/features/tests/components/TesForUser/TestForUser';
import { CircularProgress, Grid } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';

const TestId = () => {
  const router = useRouter();
  const { testId } = router.query as { testId: string };
  const dispatch = useAppDispatch();
  const oneTest = useAppSelector(selectOneTest);
  const loading = useAppSelector(selectTestsFetching);

  useEffect(() => {
    dispatch(fetchOneTest(testId));
  }, [dispatch, testId]);

  return (
    <Layout title="Strategia School | Тест">
      <Grid container justifyContent="center">
        {loading && <CircularProgress />}
        {oneTest && <TestForUser oneTest={oneTest} />}
      </Grid>
    </Layout>
  );
};

export default TestId;
