import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectCourseCreating,
  selectCreateCourseError,
} from '@/src/dispatchers/courses/coursesSlice';
import { createCourse } from '@/src/dispatchers/courses/coursesThunks';
import { ICourse } from '@/src/types';
import { selectUser } from '@/src/dispatchers/users/usersSlice';

const NewCourse = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCourseCreating);
  const error = useAppSelector(selectCreateCourseError);
  const user = useAppSelector(selectUser);

  const onSubmit = async (courseMutation: ICourse) => {
    await dispatch(createCourse(courseMutation)).unwrap();
    void router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia new course">
        <CourseForm onSubmit={onSubmit} loading={createLoading} error={error} />
      </Layout>
    </ProtectedRoute>
  );
};

export default NewCourse;
