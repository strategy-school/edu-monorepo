import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import AdminTransaction from '@/src/features/transactions/admin/AdminTransaction';
import React from 'react';

const Transactions: React.FC = () => {
  return (
    <AdminLayout pageTitle="Транзакции" createLink="transactions/create">
      <AdminTransaction />
    </AdminLayout>
  );
};

export default Transactions;
