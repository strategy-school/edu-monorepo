import { dateFormat } from '@/src/constants';
import { ApiTransaction } from '@/src/types';
import { TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  transaction: ApiTransaction;
}

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const router = useRouter();
  const date = dayjs(transaction.createdAt).format(dateFormat);

  const onClick = (id: string) => {
    void router.push(`transactions/${id}`);
  };

  return (
    <TableRow
      hover
      onClick={() => onClick(transaction._id)}
      style={{ cursor: 'pointer' }}
    >
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
