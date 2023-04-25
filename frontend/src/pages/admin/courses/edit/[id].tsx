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
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const fetchOneLoading = useAppSelector(selectOneCourseFetching);
  const updateLoading = useAppSelector(selectCourseUpdating);
  const error = useAppSelector(selectUpdateCourseError);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (id) {
      void dispatch(fetchOneCourse(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (courseMutation: CourseMutation) => {
    await dispatch(updateCourse({ id, course: courseMutation })).unwrap();
    void router.push(`/courses/${id}`);
  };

  console.log(course);

  const existingCourse = course && {
    title: course.title,
    description: course.description,
    duration: course.duration,
    category: course.category._id,
    type: course.type,
    theme: course.theme,
    targetAudience: course.targetAudience,
    level: course.level,
    programGoal: course.programGoal,
    price: course.price.toString(),
    image: null,
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
