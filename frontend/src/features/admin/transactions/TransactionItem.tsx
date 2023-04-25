import { ApiTransaction } from '@/src/types';
import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Props {
  transaction: ApiTransaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const date = dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm');

  return (
    <TableRow hover component={Link} href={'transactions/' + transaction._id}>
      <TableCell>
        {transaction.user.firstName} {transaction.user.lastName}
      </TableCell>
      <TableCell>{transaction.course.title}</TableCell>
      <TableCell>{transaction.course.type}</TableCell>
      <TableCell>{transaction.course.level}</TableCell>
      <TableCell>{transaction.course.price}</TableCell>
      <TableCell>{transaction.isPaid}</TableCell>
      <TableCell>{date}</TableCell>
    </TableRow>
  );
};

export default TransactionItem;
