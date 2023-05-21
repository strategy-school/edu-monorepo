import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  cleanError,
  selectOneGroup,
} from '@/src/dispatchers/groups/groupsSlice';
import {
  fetchOneGroup,
  updateGroup,
} from '@/src/dispatchers/groups/groupsThunks';
import GroupForm from '@/src/features/groups/components/GroupForm/GroupForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { IGroup } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const Id = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const dispatch = useAppDispatch();
  const group = useAppSelector(selectOneGroup);

  React.useEffect(() => {
    if (id) {
      void dispatch(fetchOneGroup(id));
    }
  }, [dispatch, id]);

  const onSubmit = async (group: IGroup) => {
    await dispatch(updateGroup({ id, group })).unwrap();
    dispatch(cleanError());
    void router.push('/admin/groups');
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
    <AdminLayout pageTitle="Редактировать группу">
      {existingGroup && (
        <GroupForm onSubmit={onSubmit} existingGroup={existingGroup} />
      )}
    </AdminLayout>
  );
};

export default Id;
