import React from 'react';
import { Grid } from '@mui/material';
import TeacherAdmin from '@/src/features/teachers/components/TeacherAdmin/TeacherAdmin';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';

const Admin = () => {
  return (
    <AdminLayout>
      <Grid container>
        <Grid item xs>
          <TeacherAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Admin;
