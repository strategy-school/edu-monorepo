import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectCategoryCreating,
  selectCreateCategoryError,
} from '@/src/dispatchers/categories/categoriesSlice';
import { createCategory } from '@/src/dispatchers/categories/categoriesThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import CategoryForm from '@/src/features/categories/components/CategoryForm/CategoryForm';
import { ICategory } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewCategory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useRouter();
  const createLoading = useAppSelector(selectCategoryCreating);
  const error = useAppSelector(selectCreateCategoryError);

  const onFormSubmit = async (mutation: ICategory) => {
    await dispatch(createCategory(mutation)).unwrap();
    void router.push('/admin/categories');
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
