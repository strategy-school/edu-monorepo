import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { createTransaction } from '@/src/dispatchers/transactions/transactionsThunk';
import TransactionForm from '@/src/features/transactions/admin/TransactionForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ITransaction } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Create: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (transaction: ITransaction) => {
    await dispatch(createTransaction(transaction));
    void router.push('/admin/transaction');
  };

  return (
    <AdminLayout pageTitle="Добавить транзакцию">
      <TransactionForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default Create;
