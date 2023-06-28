import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import CoursesAdmin from '@/src/features/courses/CoursesAdmin/CoursesAdmin';
import React from 'react';

const Courses: React.FC = () => {
  return (
    <AdminLayout pageTitle="Курсы" createLink="courses/new-course">
      <CoursesAdmin />
    </AdminLayout>
  );
};

export default Courses;
