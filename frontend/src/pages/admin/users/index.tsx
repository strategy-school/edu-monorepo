import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import UserAdmin from '@/src/features/users/components/UserAdmin/UserAdmin';
import React from 'react';

const AdminUsersPage: React.FC = () => {
  return (
    <AdminLayout pageTitle="Пользователи">
      <UserAdmin />
    </AdminLayout>
  );
};

export default AdminUsersPage;
