import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectCategories } from '@/src/dispatchers/categories/categoriesSlice';
import { fetchCategories } from '@/src/dispatchers/categories/categoriesThunks';
import CategoryItem from '@/src/features/categories/components/CategoryItem/CategoryItem';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { Grid } from '@mui/material';
import React from 'react';

const Index: React.FC = () => {
  const categories = useAppSelector(selectCategories);

  return (
    <Layout title="Школа Маркетинга Strategia: Категории курсов">
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchCategories());

    return { props: {} };
  },
);

export default Index;
