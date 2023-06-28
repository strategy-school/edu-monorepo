import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import TeacherAdmin from '@/src/features/teachers/components/TeacherAdmin/TeacherAdmin';
import React from 'react';

const Admin: React.FC = () => {
  return (
    <AdminLayout pageTitle="Тренеры" createLink="teachers/new-teacher">
      <TeacherAdmin />
    </AdminLayout>
  );
};

export default Admin;
