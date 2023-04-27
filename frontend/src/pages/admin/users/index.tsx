import React from 'react';
import { Grid } from '@mui/material';
import UserAdmin from '@/src/features/users/components/UserAdmin/UserAdmin';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';

const AdminUsersPage = () => {
  return (
    <AdminLayout>
      <Grid container>
        <Grid item xs>
          <UserAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AdminUsersPage;
