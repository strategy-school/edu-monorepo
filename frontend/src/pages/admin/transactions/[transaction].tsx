import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import transactionStyles from './styles';
import React from 'react';

const ImageCardMedia = styled(CardMedia)({
  height: '40px',
  width: '40px',
});

const TransactionSingle = () => {
  return (
    <Grid
      container
      direction="column"
      gap={2}
      style={transactionStyles.container}
    >
      <Grid item>
        <Box style={transactionStyles.header}>
          <Button variant="outlined" style={transactionStyles.backBtn}>
            <ArrowBackIcon style={{ width: '20px', height: '20px' }} />
          </Button>
          <Box>
            <Box style={transactionStyles.headerTitle}>
              <Typography variant="h4">Transaction number</Typography>
              <Chip label="status" />
            </Box>
            <Typography variant="body2">Date</Typography>
          </Box>
          <Box style={transactionStyles.moderationBtns}>
            <Button>Edit</Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item container direction="row" gap={4} wrap="nowrap">
        <Grid item xs={9}>
          <Card style={transactionStyles.card}>
            <CardContent style={transactionStyles.cardContent}>
              <Typography variant="h5">Title</Typography>
              <Typography variant="body1">type</Typography>
              <Box style={transactionStyles.lineBox}>
                <Box style={transactionStyles.lineBox}>
                  <ImageCardMedia image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/How_to_use_icon.svg/1200px-How_to_use_icon.svg.png" />
                  <Typography variant="subtitle1">level</Typography>
                </Box>
                <Typography variant="subtitle1">price KGS</Typography>
              </Box>
            </CardContent>
            <CardActions style={transactionStyles.cardActions}>
              <Button variant="contained" color="success">
                Mark as paid
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card style={transactionStyles.card}>
            <CardContent style={transactionStyles.cardContent}>
              <Typography variant="h5">Name Surname</Typography>
              <Typography variant="subtitle1">Contact information</Typography>
              <Typography variant="body1">Email</Typography>
              <Typography variant="body1">Phone</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionSingle;
