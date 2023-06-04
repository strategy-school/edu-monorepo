import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  cleanError,
  selectOneCategory,
} from '@/src/dispatchers/categories/categoriesSlice';
import {
  fetchOneCategory,
  updateCategory,
} from '@/src/dispatchers/categories/categoriesThunks';
import CategoryForm from '@/src/features/categories/components/CategoryForm/CategoryForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ICategory } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectOneCategory);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneCategory(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (categoryMutation: ICategory) => {
    await dispatch(updateCategory({ id, categoryMutation })).unwrap();
    dispatch(cleanError());
    void router.push('/admin/categories');
  };

  const existingCategory = category && {
    title: category.title,
    description: category.description,
    image: null,
  };

  return (
    <AdminLayout pageTitle="Редактировать категорию">
      {existingCategory && (
        <CategoryForm
          isEdit
          onSubmit={onSubmit}
          existingCategory={existingCategory}
        />
      )}
    </AdminLayout>
  );
};

export default Id;
