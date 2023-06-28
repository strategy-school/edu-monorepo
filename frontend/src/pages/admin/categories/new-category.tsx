import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/categories/categoriesSlice';
import { createCategory } from '@/src/dispatchers/categories/categoriesThunks';
import CategoryForm from '@/src/features/categories/components/CategoryForm/CategoryForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ICategory } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewCategory: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onFormSubmit = async (mutation: ICategory) => {
    await dispatch(createCategory(mutation)).unwrap();
    dispatch(cleanError());
    void router.push('/admin/categories');
  };

  return (
    <AdminLayout pageTitle="Создать категорию">
      <CategoryForm onSubmit={onFormSubmit} />
    </AdminLayout>
  );
};

export default NewCategory;
