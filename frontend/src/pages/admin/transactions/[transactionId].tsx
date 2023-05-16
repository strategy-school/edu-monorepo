import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectSingleTransaction } from '@/src/dispatchers/transactions/transactionsSlice';
import {
  deleteTransaction,
  fetchSingleTransaction,
  markTransactionAsPaid,
} from '@/src/dispatchers/transactions/transactionsThunk';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { apiURL, dateFormat } from '@/src/constants';
import transactionStyles from './styles';

const TransactionSingle = () => {
  const router = useRouter();
  const { transactionId } = router.query as { transactionId: string };
  const dispatch = useAppDispatch();
  const transaction = useAppSelector(selectSingleTransaction);

  const onMarkingAsPaid = React.useCallback(
    async (id: string) => {
      await dispatch(markTransactionAsPaid(id));
      dispatch(fetchSingleTransaction(id));
    },
    [dispatch],
  );

  const onDeleteTransaction = React.useCallback(
    async (id: string) => {
      await dispatch(deleteTransaction(id));
      void router.push('/admin/transactions');
    },
    [dispatch, router],
  );

  React.useEffect(() => {
    dispatch(fetchSingleTransaction(transactionId));
  }, [dispatch, transactionId]);

  return (
    <AdminLayout>
      {transaction && (
        <Grid
          container
          direction="column"
          gap={2}
          style={transactionStyles.container}
        >
          <Grid item>
            <Box style={transactionStyles.header}>
              <Box>
                <Box style={transactionStyles.headerTitle}>
                  <Typography variant="h4">Транзакция</Typography>
                  <Chip
                    label={transaction.isPaid}
                    color={
                      transaction.isPaid === 'paid' ? 'success' : 'warning'
                    }
                  />
                </Box>
                <Typography variant="body2">
                  {dayjs(transaction.createdAt).format(dateFormat)}
                </Typography>
              </Box>
              <Box style={transactionStyles.moderationBtns}>
                <Button component={Link} href={'/edit' + transaction._id}>
                  Редактировать
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => onDeleteTransaction(transaction._id)}
                >
                  Удалить
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item container direction="row" gap={4} wrap="nowrap">
            <Grid item xs={9}>
              <Card style={transactionStyles.card}>
                <CardContent style={transactionStyles.cardContent}>
                  <Box style={transactionStyles.lineBox}>
                    <Box style={transactionStyles.lineBox}>
                      <CardMedia
                        image={apiURL + '/' + transaction.course.image}
                        style={transactionStyles.cardImage}
                      />
                      <Typography variant="h5">
                        {transaction.course.title}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1">
                      {transaction.course.price} KGS
                    </Typography>
                  </Box>
                  <Typography variant="body1" style={{ marginTop: '15px' }}>
                    <strong>Тип:</strong> {transaction.course.type}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Уровень:</strong> {transaction.course.level}
                  </Typography>
                </CardContent>
                <CardActions style={transactionStyles.cardActions}>
                  <Button
                    variant="contained"
                    onClick={() => onMarkingAsPaid(transaction._id)}
                  >
                    Принять оплату
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card style={transactionStyles.card}>
                <CardContent style={transactionStyles.cardContent}>
                  <Typography
                    variant="h5"
                    component={Link}
                    href={'/admin/users/' + transaction.user._id}
                    gutterBottom
                  >
                    {transaction.user.firstName} {transaction.user.lastName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Контактные данные:</strong>
                  </Typography>
                  <Typography
                    variant="body1"
                    component={MuiLink}
                    href={'mailto:' + transaction.user.email}
                    gutterBottom
                  >
                    {transaction.user.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    component={MuiLink}
                    href={'tel:' + transaction.user.phoneNumber}
                  >
                    {transaction.user.phoneNumber}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default TransactionSingle;
