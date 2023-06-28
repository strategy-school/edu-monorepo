import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/teachers/teachersSlice';
import { createTeacher } from '@/src/dispatchers/teachers/teachersThunks';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ITeacher } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewTeacher: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (teacher: ITeacher) => {
    await dispatch(createTeacher(teacher)).unwrap();
    dispatch(cleanError());
    void router.push('/admin/teachers');
  };

  return (
    <AdminLayout pageTitle="Добавить тренера">
      <TeacherForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default NewTeacher;
