import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCategories } from '@/src/features/categories/categoriesSlice';
import { fetchCategories } from '@/src/features/categories/categoriesThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import CategoryItem from '@/src/features/categories/components/CategoryItem/CategoryItem';
import { Grid } from '@mui/material';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';

const Index = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Layout title="Strategia School: Course categories">
      <BlocksTitle titleText="Список всех категорий" />
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
