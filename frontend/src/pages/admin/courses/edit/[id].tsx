import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectCourseUpdating,
  selectOneCourse,
  selectOneCourseFetching,
  selectUpdateCourseError,
} from '@/src/dispatchers/courses/coursesSlice';
import {
  fetchOneCourse,
  updateCourse,
} from '@/src/dispatchers/courses/coursesThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';
import { ICourse } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const fetchOneLoading = useAppSelector(selectOneCourseFetching);
  const updateLoading = useAppSelector(selectCourseUpdating);
  const error = useAppSelector(selectUpdateCourseError);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneCourse(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (courseMutation: ICourse) => {
    await dispatch(updateCourse({ id, course: courseMutation })).unwrap();
    void router.back();
  };

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
    exam: course.exam,
    youtube: course.youtube,
    zoom: course.zoom,
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
