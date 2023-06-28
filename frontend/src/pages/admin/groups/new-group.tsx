import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { cleanError } from '@/src/dispatchers/categories/categoriesSlice';
import { createGroup } from '@/src/dispatchers/groups/groupsThunks';
import GroupForm from '@/src/features/groups/components/GroupForm/GroupForm';
import { useAppDispatch } from '@/src/store/hooks';
import { IGroup } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const NewGroup: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (groupMutation: IGroup) => {
    await dispatch(createGroup(groupMutation));
    dispatch(cleanError());
    void router.push('/admin/groups');
  };

  return (
    <AdminLayout pageTitle="Добавить группу">
      <GroupForm onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default NewGroup;
