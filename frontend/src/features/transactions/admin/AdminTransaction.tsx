import {
  selectTransactions,
  selectTransactionsPage,
  selectTransactionsTotalCount,
} from '@/src/dispatchers/transactions/transactionsSlice';
import { fetchTransactions } from '@/src/dispatchers/transactions/transactionsThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React from 'react';
import TransactionItem from './TransactionItem';

const AdminTransaction = () => {
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
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Клиент</TableCell>
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
                onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTransaction;
