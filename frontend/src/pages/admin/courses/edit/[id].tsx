import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  cleanError,
  selectOneCourse,
} from '@/src/dispatchers/courses/coursesSlice';
import {
  fetchOneCourse,
  updateCourse,
} from '@/src/dispatchers/courses/coursesThunks';
import CourseForm from '@/src/features/courses/components/CourseForm/CourseForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ICourse } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneCourse(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (courseMutation: ICourse) => {
    await dispatch(updateCourse({ id, course: courseMutation })).unwrap();
    dispatch(cleanError());
    void router.push('/admin/courses');
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
    <AdminLayout pageTitle="Редактировать категорию">
      {existingCourse && (
        <CourseForm
          isEdit
          onSubmit={onSubmit}
          existingCourse={existingCourse}
        />
      )}
    </AdminLayout>
  );
};

export default Id;
