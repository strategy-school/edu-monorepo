import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { createTransaction } from '@/src/dispatchers/transactions/transactionsThunk';
import TransactionForm from '@/src/features/transactions/admin/TransactionForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ITransaction } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Create: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (transaction: ITransaction) => {
    await dispatch(createTransaction(transaction));
    void router.back();
  };

  return (
    <AdminLayout>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Typography variant="h4">Создать транзакцию</Typography>
        </Grid>
        <Grid item>
          <TransactionForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Create;
