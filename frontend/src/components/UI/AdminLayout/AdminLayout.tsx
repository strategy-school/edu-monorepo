import React from 'react';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import Layout from '@/src/components/UI/Layout/Layout';
import { Grid } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategy school: Admin">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            There will be sidebar
          </Grid>
          <Grid item xs>
            {children}
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminLayout;
