import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCourseCreating,
  selectCreateCourseError,
} from '@/src/features/courses/coursesSlice';
import { CourseMutation } from '@/src/types';
import { createCourse } from '@/src/features/courses/coursesThunks';
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '@/src/features/users/usersSlice';
import Layout from '@/src/components/UI/Layout/Layout';

const NewCourse = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectCourseCreating);
  const error = useAppSelector(selectCreateCourseError);
  const user = useAppSelector(selectUser);

  const onSubmit = async (courseMutation: CourseMutation) => {
    await dispatch(createCourse(courseMutation)).unwrap();
    void router.push(`/courses`);
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
