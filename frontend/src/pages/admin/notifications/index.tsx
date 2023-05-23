import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import NotificationsAdmin from '@/src/features/notifications/NotificationsAdmin/NotificationsAdmin';
import React from 'react';

const Index: React.FC = () => {
  return (
    <AdminLayout pageTitle="Уведомления">
      <NotificationsAdmin />
    </AdminLayout>
  );
};

export default Index;
