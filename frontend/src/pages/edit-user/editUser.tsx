import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { UpdateUserMutation } from '@/src/types';
import Layout from '@/src/components/UI/Layout/Layout';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';
import { selectUser } from '@/src/features/users/usersSlice';
import UserEditForm from '@/src/features/users/components/UserEditForm/UserEditForm';
import { updateUser } from '@/src/features/users/usersThunks';

const EditUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onSubmit = async (userMutation: UpdateUserMutation) => {
    await dispatch(updateUser({ user: userMutation })).unwrap();
    void router.push(`/profile`);
  };

  const existingCourse = user && {
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
  };

  return (
    <ProtectedRoute isAllowed={user && user.role === 'admin'}>
      <Layout title="Strategia edit course">
        {existingCourse && <UserEditForm onSubmit={onSubmit} />}
      </Layout>
    </ProtectedRoute>
  );
};

export default EditUser;
