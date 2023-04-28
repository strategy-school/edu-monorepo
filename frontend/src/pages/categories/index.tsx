import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectCategories } from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import CategoryItem from '@/src/features/categories/components/CategoryItem/CategoryItem';
import { Grid } from '@mui/material';
import React from 'react';

const Index = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  React.useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Layout title="Strategia School: Course categories">
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          {categories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Index;
