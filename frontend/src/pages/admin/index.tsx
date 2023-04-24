import React from 'react';
import { Grid, List, ListItem, ListItemText } from '@mui/material';
import TeacherAdmin from '@/src/features/teachers/components/TeacherAdmin/TeacherAdmin';
import Layout from '@/src/components/UI/Layout/Layout';

const Admin = () => {
  return (
    <Layout title="Admin">
      <Grid container>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemText primary="Teachers" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <TeacherAdmin />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Admin;
