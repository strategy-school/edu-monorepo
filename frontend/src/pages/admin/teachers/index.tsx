import React from 'react';
import { Grid } from '@mui/material';
import TeacherAdmin from '@/src/features/teachers/components/TeacherAdmin/TeacherAdmin';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';

const Admin = () => {
  const user = useAppSelector(selectUser);
  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: admin panel | teacher">
        <Grid container>
          <Grid item xs>
            <TeacherAdmin />
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default Admin;
