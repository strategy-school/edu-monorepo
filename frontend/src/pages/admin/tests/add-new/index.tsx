import React from 'react';
import TestForm from '@/src/features/tests/components/TestForm/TestForm';
import Layout from '@/src/components/UI/Layout/Layout';

const Index = () => {
  return (
    <Layout title="Strategia school Admin | Add Test">
      <TestForm loading={false} error={null} />
    </Layout>
  );
};

export default Index;
