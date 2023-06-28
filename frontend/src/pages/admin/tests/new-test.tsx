import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/tests/testsSlice';
import { createTest } from '@/src/dispatchers/tests/testsThunks';
import TestForm from '@/src/features/tests/components/TestForm/TestForm';
import { useAppDispatch } from '@/src/store/hooks';
import { TestMutation } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewTest: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (test: TestMutation) => {
    await dispatch(createTest(test)).unwrap();
    dispatch(cleanError());
    void router.push('/admin/tests');
  };

  return (
    <AdminLayout pageTitle="Добавить тест">
      <TestForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default NewTest;
