import React from 'react';
import { CategoryMutation } from '@/src/types';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import { useRouter } from 'next/router';
import { createCategory } from '@/src/features/categories/categoriesThunks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import CategoryForm from '@/src/features/categories/components/CategoryForm/CategoryForm';
import {
  selectCategoryCreating,
  selectCreateCategoryError,
} from '@/src/features/categories/categoriesSlice';

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const createLoading = useAppSelector(selectCategoryCreating);
  const error = useAppSelector(selectCreateCategoryError);

  const onFormSubmit = async (mutation: CategoryMutation) => {
    try {
      await dispatch(createCategory(mutation)).unwrap();
      void router.push('/categories');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Stragegia new category">
        <CategoryForm
          onSubmit={onFormSubmit}
          loading={createLoading}
          error={error}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default NewCategory;
