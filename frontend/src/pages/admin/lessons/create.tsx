import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/lessons/lessonsSlice';
import { createLesson } from '@/src/dispatchers/lessons/lessonsThunk';
import LessonFrom from '@/src/features/lessons/admin/LessonForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Create: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (lesson: ILesson) => {
    await dispatch(createLesson(lesson));
    dispatch(cleanError());
    void router.back();
  };

  return (
    <AdminLayout pageTitle="Создать урок">
      <LessonFrom onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default Create;
