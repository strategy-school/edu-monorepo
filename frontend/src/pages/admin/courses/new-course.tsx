import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/courses/coursesSlice';
import { createCourse } from '@/src/dispatchers/courses/coursesThunks';
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';
import { useAppDispatch } from '@/src/store/hooks';
import { ICourse } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewCourse: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (courseMutation: ICourse) => {
    await dispatch(createCourse(courseMutation)).unwrap();
    dispatch(cleanError());
    void router.push('/admin/courses');
  };

  return (
    <AdminLayout pageTitle="Создать курс">
      <CourseForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default NewCourse;
