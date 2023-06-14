import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectTests,
  selectTestsFetching,
} from '@/src/dispatchers/tests/testsSlice';
import { fetchTests } from '@/src/dispatchers/tests/testsThunks';
import TestCard from '@/src/features/tests/components/TestCard/TestCard';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ONE_BY_ONE_ANIMATION } from '@/src/styles';

const Index: React.FC = () => {
  const tests = useAppSelector(selectTests);
  const loading = useAppSelector(selectTestsFetching);

  return (
    <Layout title="Школа Маркетинга Strategia: Тесты">
      <BlocksTitle titleText="Список всех тестов" />

      <Grid container justifyContent="center" spacing={1} mt={5}>
        {loading && <CircularProgress />}
        {tests.length > 0 && (
          <AnimatePresence>
            {tests.map((test, i) => (
              <Grid item key={test._id} xs={12} md={4}>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  variants={ONE_BY_ONE_ANIMATION}
                  style={{ width: '100%' }}
                >
                  <TestCard test={test} />
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        )}
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTests());

    return { props: {} };
  },
);

export default Index;
