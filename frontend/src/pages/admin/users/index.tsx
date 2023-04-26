import React from 'react';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import { Grid } from '@mui/material';
import UserAdmin from '@/src/features/users/UserAdmin/UserAdmin';

const AdminUsersPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | students">
        <Grid container>
          <Grid item xs>
            <UserAdmin />
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminUsersPage;
