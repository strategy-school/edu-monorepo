import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectTests } from '@/src/dispatchers/tests/testsSlice';
import { fetchTestByCategory } from '@/src/dispatchers/tests/testsThunks';
import TestCard from '@/src/features/tests/components/TestCard/TestCard';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { Grid } from '@mui/material';
import React from 'react';

const TestsByCategory: React.FC = () => {
  const tests = useAppSelector(selectTests);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { testCategoryId } = params as { testCategoryId: string };
      await store.dispatch(fetchTestByCategory(testCategoryId));

      return { props: {} };
    },
);

export default TestsByCategory;
