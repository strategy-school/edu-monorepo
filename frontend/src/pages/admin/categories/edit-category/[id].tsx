import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectCategoryUpdating,
  selectOneCategory,
  selectOneCategoryFetching,
  selectUpdateCategoryError,
} from '@/src/dispatchers/categories/categoriesSlice';
import {
  fetchOneCategory,
  updateCategory,
} from '@/src/dispatchers/categories/categoriesThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import CategoryForm from '@/src/features/categories/components/CategoryForm/CategoryForm';
import { CategoryMutation } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectOneCategory);
  const fetchOneLoading = useAppSelector(selectOneCategoryFetching);
  const updateLoading = useAppSelector(selectCategoryUpdating);
  const error = useAppSelector(selectUpdateCategoryError);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneCategory(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (categoryMutation: CategoryMutation) => {
    await dispatch(updateCategory({ id, categoryMutation })).unwrap();
    void router.push('/admin/categories');
  };

  const existingCategory = category && {
    title: category.title,
    description: category.description,
    image: null,
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title={'Strategia school: edit category'}>
        {existingCategory && (
          <CategoryForm
            onSubmit={onSubmit}
            loading={updateLoading}
            error={error}
            existingCategory={existingCategory}
            isEdit
            fetchCategoryLoading={fetchOneLoading}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Id;
