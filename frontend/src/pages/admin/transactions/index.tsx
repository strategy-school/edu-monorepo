import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectTransactions } from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactions } from '@/src/dispatchers/transactions/transactionsThunk';
import TransactionItem from '@/src/features/admin/transactions/TransactionItem';
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import transactionStyles from './styles';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);

  React.useEffect(() => {
    dispatch(fetchTransactions());
  });

  return (
    <Grid
      container
      direction="column"
      gap={2}
      style={transactionStyles.container}
    >
      <Grid item>
        <Box style={transactionStyles.header}>
          <Box style={transactionStyles.headerTitle}>
            <Typography variant="h4">Transactions</Typography>
          </Box>
          <Box style={transactionStyles.moderationBtns}>
            <Button variant="contained" color="success">
              Create
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <TableContainer component={Paper} style={{ borderRadius: '10px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Transactions;
