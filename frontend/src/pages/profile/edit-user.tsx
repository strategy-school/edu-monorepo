import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { updateUser } from '@/src/dispatchers/users/usersThunks';
import UserEditForm from '@/src/features/users/components/UserEditForm/UserEditForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { UpdateUserMutation } from '@/src/types';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const EditUser: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onSubmit = async (userMutation: UpdateUserMutation) => {
    await dispatch(updateUser({ user: userMutation })).unwrap();
    await router.push(`/profile`);
  };

  const existingUser = user && {
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    avatar: null,
  };

  return (
    <Grid>
      {existingUser && (
        <UserEditForm onSubmit={onSubmit} existingUser={existingUser} />
      )}
    </Grid>
  );
};

export default EditUser;
