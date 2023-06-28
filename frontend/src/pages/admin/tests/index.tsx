import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import TestAdmin from '@/src/features/tests/components/TestAdmin/TestAdmin';
import React from 'react';

const Index: React.FC = () => {
  return (
    <AdminLayout pageTitle="Тесты" createLink="tests/new-test">
      <TestAdmin />
    </AdminLayout>
  );
};

export default Index;
