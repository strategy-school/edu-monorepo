import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectSingleTransaction } from '@/src/dispatchers/transactions/transactionsSlice';
import {
  editTransaction,
  fetchSingleTransaction,
} from '@/src/dispatchers/transactions/transactionsThunk';
import TransactionForm from '@/src/features/transactions/admin/TransactionForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ITransaction } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Edit = () => {
  const dispatch = useAppDispatch();
  const transaction = useAppSelector(selectSingleTransaction);
  const router = useRouter();
  const { transactionId } = router.query as { transactionId: string };

  React.useEffect(() => {
    void dispatch(fetchSingleTransaction(transactionId));
  }, [transactionId, dispatch]);

  const onSubmit = async (transaction: ITransaction) => {
    await dispatch(editTransaction({ transaction, id: transactionId }));
    void router.push('/admin/transaction');
  };

  return (
    <AdminLayout pageTitle="Редактировать транзакцию">
      {transaction && (
        <TransactionForm
          onSubmit={onSubmit}
          existingTransaction={{
            user: transaction.user._id,
            course: transaction.course._id,
          }}
        />
      )}
    </AdminLayout>
  );
};

export default Edit;
