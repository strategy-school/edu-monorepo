import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import GroupsAdmin from '@/src/features/groups/GroupsAdmin/GroupsAdmin';
import React from 'react';

const Index: React.FC = () => {
  return (
    <AdminLayout pageTitle="Учебные группы" createLink="groups/new-group">
      <GroupsAdmin />
    </AdminLayout>
  );
};

export default Index;
