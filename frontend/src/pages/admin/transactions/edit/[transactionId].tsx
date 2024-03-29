import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectSingleTransaction } from '@/src/dispatchers/transactions/transactionsSlice';
import {
  editTransaction,
  fetchSingleTransaction,
} from '@/src/dispatchers/transactions/transactionsThunk';
import { ITransaction } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import TransactionForm from '@/src/features/transactions/admin/TransactionForm';

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
    void router.back();
  };

  return (
    <AdminLayout>
      {transaction && (
        <Grid container direction="column" gap={2}>
          <Grid item>
            <Typography variant="h4">Редактировать транзакцию</Typography>
          </Grid>
          <Grid item>
            <TransactionForm
              onSubmit={onSubmit}
              existingTransaction={{
                user: transaction.user._id,
                course: transaction.course._id,
                course_type: transaction.course_type,
              }}
            />
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default Edit;
