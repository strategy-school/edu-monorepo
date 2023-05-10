import React from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import GroupsAdmin from '@/src/features/groups/GroupsAdmin/GroupsAdmin';

const Index = () => {
  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item xs container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Учебные группы</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="groups/new-group"
              variant="contained"
              color="primary"
            >
              Добавить группу
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <GroupsAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Index;
