import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCourseUpdating,
  selectOneCourse,
  selectOneCourseFetching,
  selectUpdateCourseError,
} from '@/src/features/courses/coursesSlice';
import {
  fetchOneCourse,
  updateCourse,
} from '@/src/features/courses/coursesThunks';
import { CourseMutation } from '@/src/types';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '@/src/features/users/usersSlice';
import CourseForm from '@/src/features/courses/components/CourseForm';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const fetchOneLoading = useAppSelector(selectOneCourseFetching);
  const updateLoading = useAppSelector(selectCourseUpdating);
  const error = useAppSelector(selectUpdateCourseError);
  const user = useAppSelector(selectUser);

  console.log(id);
  useEffect(() => {
    if (id) {
      void dispatch(fetchOneCourse(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (courseMutation: CourseMutation) => {
    await dispatch(updateCourse({ id, course: courseMutation })).unwrap();
    void router.push('/');
  };

  const existingCourse = course && {
    title: course.title,
    description: course.description,
    duration: course.duration,
    type: course.type,
    price: course.price.toString(),
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia edit course">
        {existingCourse && (
          <CourseForm
            onSubmit={onSubmit}
            loading={updateLoading}
            error={error}
            existingCourse={existingCourse}
            isEdit
            fetchCourseLoading={fetchOneLoading}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Id;
