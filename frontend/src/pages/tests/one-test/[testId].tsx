import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneTest,
  selectTestsFetching,
} from '@/src/dispatchers/tests/testsSlice';
import { fetchOneTest } from '@/src/dispatchers/tests/testsThunks';
import TestForUser from '@/src/features/tests/components/TestForUser/TestForUser';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const TestId: React.FC = () => {
  const oneTest = useAppSelector(selectOneTest);
  const loading = useAppSelector(selectTestsFetching);

  return (
    <Layout title="Strategia School | Тест">
      <Grid container justifyContent="center">
        {loading && <CircularProgress />}
        {oneTest && <TestForUser oneTest={oneTest} />}
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { testId } = params as { testId: string };
      await store.dispatch(fetchOneTest(testId));

      return { props: {} };
    },
);

export default TestId;
