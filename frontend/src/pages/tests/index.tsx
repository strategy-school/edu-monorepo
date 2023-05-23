import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectTests,
  selectTestsFetching,
} from '@/src/dispatchers/tests/testsSlice';
import { fetchTests } from '@/src/dispatchers/tests/testsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { CircularProgress, Grid } from '@mui/material';
import TestCard from '@/src/features/tests/components/TestCard/TestCard';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';

const Index = () => {
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
  const loading = useAppSelector(selectTestsFetching);
  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
    <Layout title="Школа Маркетинга Strategia: Тесты">
      <BlocksTitle titleText="Список всех тестов" />

      <Grid container justifyContent="center" spacing={1} mt={5}>
        {loading && <CircularProgress />}
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

export default Index;
