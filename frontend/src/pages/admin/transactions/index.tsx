import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectTransactions,
  selectTransactionsPage,
  selectTransactionsTotalCount,
} from '@/src/dispatchers/transactions/transactionsSlice';
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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import transactionStyles from './styles';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const currentPage = useAppSelector(selectTransactionsPage);
  const totalCount = useAppSelector(selectTransactionsTotalCount);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchTransactions({ page: page, limit: rowsPerPage }));
  }, [page, rowsPerPage]);

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
            <Button
              variant="contained"
              color="success"
              component={Link}
              href="transactions/create"
            >
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
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={currentPage - 1}
                onPageChange={(_, newPage) => setPage(newPage + 1)}
                onRowsPerPageChange={(e) =>
                  setRowsPerPage(parseInt(e.target.value))
                }
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Transactions;
