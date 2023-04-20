import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCategories } from '@/src/features/categories/categoriesSlice';
import {
  fetchCategories,
  removeCategory,
} from '@/src/features/categories/categoriesThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import CategoryItem from '@/src/features/categories/components/CategoryItem/CategoryItem';
import { Grid } from '@mui/material';

const Index = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const deleteCategory = async (id: string) => {
    if (window.confirm('Do you really want to delete this category?')) {
      await dispatch(removeCategory(id));
      await dispatch(fetchCategories());
    }
  };

  return (
    <Layout title="Strategia School: Course categories">
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              onDelete={() => deleteCategory(category._id)}
            />
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Index;
