import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectSingleTransaction } from '@/src/dispatchers/transactions/transactionsSlice';
import {
  deleteTransaction,
  fetchSingleTransaction,
  markTransactionAsPaid,
} from '@/src/dispatchers/transactions/transactionsThunk';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import { apiURL, dateFormat } from '../../../constants';
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

  if (!transaction) {
    return null;
  }

  return (
    <Grid
      container
      direction="column"
      gap={2}
      style={transactionStyles.container}
    >
      <Grid item>
        <Box style={transactionStyles.header}>
          <Button
            variant="outlined"
            style={transactionStyles.backBtn}
            onClick={router.back}
          >
            <ArrowBackIcon style={{ width: '20px', height: '20px' }} />
          </Button>
          <Box>
            <Box style={transactionStyles.headerTitle}>
              <Typography variant="h4">Transaction</Typography>
              <Chip
                label={transaction.isPaid}
                color={transaction.isPaid === 'paid' ? 'success' : 'warning'}
              />
            </Box>
            <Typography variant="body2">
              {dayjs(transaction.createdAt).format(dateFormat)}
            </Typography>
          </Box>
          <Box style={transactionStyles.moderationBtns}>
            <Button component={Link} href="edit">
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => onDeleteTransaction(transaction._id)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item container direction="row" gap={4} wrap="nowrap">
        <Grid item xs={9}>
          <Card style={transactionStyles.card}>
            <CardContent style={transactionStyles.cardContent}>
              <Typography variant="h5">{transaction.course.title}</Typography>
              <Typography variant="body1">{transaction.course.type}</Typography>
              <Box style={transactionStyles.lineBox}>
                <Box style={transactionStyles.lineBox}>
                  <CardMedia
                    image={apiURL + '/' + transaction.course.image}
                    style={transactionStyles.cardImage}
                  />
                  <Typography variant="subtitle1">
                    {transaction.course.level}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">
                  {transaction.course.price} KGS
                </Typography>
              </Box>
            </CardContent>
            <CardActions style={transactionStyles.cardActions}>
              <Button
                variant="contained"
                color="success"
                onClick={() => onMarkingAsPaid(transaction._id)}
              >
                Mark as paid
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
              <Typography variant="subtitle1">Contact information:</Typography>
              <Typography
                variant="body1"
                component={MuiLink}
                href={'mailto:' + transaction.user.email}
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
  );
};

export default TransactionSingle;
