import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCreateGroupError,
  selectGroupCreating,
} from '@/src/dispatchers/groups/groupsSlice';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import Layout from '@/src/components/UI/Layout/Layout';
import GroupForm from '@/src/features/groups/components/GroupForm/GroupForm';
import { createGroup } from '@/src/dispatchers/groups/groupsThunks';
import { IGroup } from '@/src/types';

const NewGroup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectGroupCreating);
  const error = useAppSelector(selectCreateGroupError);
  const user = useAppSelector(selectUser);

  const onSubmit = async (groupMutation: IGroup) => {
    await dispatch(createGroup(groupMutation));
    void router.back();
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia: new group">
        <GroupForm onSubmit={onSubmit} loading={createLoading} error={error} />
      </Layout>
    </ProtectedRoute>
  );
};

export default NewGroup;
