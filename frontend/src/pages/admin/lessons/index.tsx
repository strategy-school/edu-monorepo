import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import AdminLessons from '@/src/features/lessons/admin/AdminLessons';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const Lessons: React.FC = () => {
  return (
    <AdminLayout>
      <Grid container direction="column" gap={2}>
        <Grid item container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4">Уроки</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} href="lessons/create">
              Создать
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <AdminLessons />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Lessons;
