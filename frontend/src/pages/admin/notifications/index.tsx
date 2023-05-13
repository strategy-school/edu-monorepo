import React from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { Grid, Typography } from '@mui/material';
import NotificationsAdmin from '@/src/features/notifications/NotificationsAdmin/NotificationsAdmin';

const Index = () => {
  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item xs>
          <Typography variant="h4">Уведомления</Typography>
        </Grid>
        <Grid item xs>
          <NotificationsAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Index;
