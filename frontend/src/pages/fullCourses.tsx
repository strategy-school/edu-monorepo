import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import CourseCard from '../components/CourseCard/CourseCard';

const FullCourses = () => {
  const dispatch = useAppDispatch();
  const fullCourses = useAppSelector(selectCourses);

  useEffect(() => {
    void dispatch(fetchCourses);
  }, [dispatch]);

  return (
    <div>
      {fullCourses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default FullCourses;
