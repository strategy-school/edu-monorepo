import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectGroupUpdating,
  selectOneGroup,
  selectOneGroupFetching,
  selectUpdateGroupError,
} from '@/src/dispatchers/groups/groupsSlice';
import {
  fetchOneGroup,
  updateGroup,
} from '@/src/dispatchers/groups/groupsThunks';
import { IGroup } from '@/src/types';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '@/src/dispatchers/users/usersSlice';
import Layout from '@/src/components/UI/Layout/Layout';
import GroupForm from '@/src/features/groups/components/GroupForm/GroupForm';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectOneGroup);
  const fetchOneLoading = useAppSelector(selectOneGroupFetching);
  const updateLoading = useAppSelector(selectGroupUpdating);
  const error = useAppSelector(selectUpdateGroupError);
  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneGroup(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (groupMutation: IGroup) => {
    await dispatch(updateGroup({ id, group: groupMutation })).unwrap();
    void router.back();
  };

  const existingGroup = group && {
    title: group.title,
    description: group.description,
    course: group.course._id,
    startDate: group.startDate,
    endDate: group.endDate,
    startsAt: group.startsAt,
    duration: group.duration,
    telegramLink: group.telegramLink,
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia edit group">
        {existingGroup && (
          <GroupForm
            onSubmit={onSubmit}
            loading={updateLoading}
            error={error}
            isEdit
            existingGroup={existingGroup}
            fetchGroupLoading={fetchOneLoading}
          />
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Id;
