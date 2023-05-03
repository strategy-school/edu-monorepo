import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { UpdateUserMutation } from '@/src/types';
import UserEditForm from '@/src/features/users/components/UserEditForm/UserEditForm';
import { Grid } from '@mui/material';
import { updateUser } from '@/src/dispatchers/users/usersThunks';
import { selectUser } from '@/src/dispatchers/users/usersSlice';

const EditUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  console.log(user);

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