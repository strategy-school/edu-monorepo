import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  selectTransactions,
  selectTransactionsPage,
  selectTransactionsTotalCount,
} from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactions } from '@/src/dispatchers/transactions/transactionsThunk';
import TransactionItem from '@/src/features/admin/transactions/TransactionItem';
import {
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

const Transactions = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(selectTransactions);
  const currentPage = useAppSelector(selectTransactionsPage);
  const totalCount = useAppSelector(selectTransactionsTotalCount);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchTransactions({ page, limit }));
  }, [dispatch, page, limit]);

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
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Пользователь</TableCell>
                  <TableCell>Курс</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Уровень</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Дата</TableCell>
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
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={totalCount}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={(_, newPage) => setPage(newPage + 1)}
                    onRowsPerPageChange={(e) =>
                      setLimit(parseInt(e.target.value))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Transactions;
