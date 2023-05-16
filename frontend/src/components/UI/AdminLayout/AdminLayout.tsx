import React from 'react';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '@/src/store/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import { Grid } from '@mui/material';
import Sidebar from '@/src/components/UI/Sidebar/Sidebar';
import { selectUser } from '@/src/dispatchers/users/usersSlice';

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
            <Sidebar />
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
