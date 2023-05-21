import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import Sidebar from '@/src/components/UI/Sidebar/Sidebar';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { useAppSelector } from '@/src/store/hooks';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface Props extends React.PropsWithChildren {
  pageTitle: string;
  createLink?: string;
}

const AdminLayout: React.FC<Props> = ({ pageTitle, createLink, children }) => {
  const user = useAppSelector(selectUser);

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategy school: Admin">
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <Grid container spacing={2} direction="column">
              <Grid item xs container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h4">{pageTitle}</Typography>
                </Grid>
                {createLink && (
                  <Grid item>
                    <Button
                      component={Link}
                      href={createLink}
                      variant="contained"
                      color="primary"
                    >
                      Создать
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid item>{children}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminLayout;
