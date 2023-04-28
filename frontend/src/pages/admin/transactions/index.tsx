import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import transactionStyles from './styles';
import React from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';

const Transactions = () => {
  return (
    <AdminLayout>
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
          <Card style={transactionStyles.card}>
            <CardActions style={transactionStyles.filters}>Filters</CardActions>
            <CardContent>List</CardContent>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Transactions;
