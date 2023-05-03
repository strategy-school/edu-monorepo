import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CategoryAdmin from '@/src/features/categories/components/CategoryAdmin/CategoryAdmin';

const Categories = () => {
  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Категории</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="/admin/categories/new-category"
              color="primary"
              variant="contained"
            >
              Добавить новую категорию
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <CategoryAdmin />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Categories;
