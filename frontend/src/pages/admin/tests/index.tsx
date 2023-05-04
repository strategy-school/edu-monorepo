import React from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { Grid } from '@mui/material';
import TestAdmin from '@/src/features/tests/components/TestAdmin/TestAdmin';

const Index = () => {
  return (
    <AdminLayout>
      <Grid container>
        <Grid item xs>
          <TestAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Index;
