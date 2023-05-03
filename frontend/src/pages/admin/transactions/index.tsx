import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import AdminTransaction from "@/src/features/admin/transactions/AdminTransaction/AdminTransaction";

const Transactions = () => {


  return (
    <AdminLayout>
      <Grid container direction="column" gap={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Транзакции</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component={Link}
              href="transactions/create"
            >
              Создать
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <AdminTransaction/>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Transactions;
