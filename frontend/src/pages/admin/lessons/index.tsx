import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import AdminLessons from '@/src/features/lessons/admin/AdminLessons';
import React from 'react';

const Lessons: React.FC = () => {
  return (
    <AdminLayout pageTitle="Уроки" createLink="lessons/create">
      <AdminLessons />
    </AdminLayout>
  );
};

export default Lessons;
