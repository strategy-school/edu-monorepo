import { selectUser } from '@/src/dispatchers/users/usersSlice';
import { updateUser } from '@/src/dispatchers/users/usersThunks';
import UserEditForm from '@/src/features/users/components/UserEditForm/UserEditForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { UpdateUserMutation } from '@/src/types';
import { Grid } from '@mui/material';
import React from 'react';
import ProtectedRoute from '@/src/components/ProtectedRoute/ProtectedRoute';

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onSubmit = async (userMutation: UpdateUserMutation) => {
    await dispatch(updateUser({ user: userMutation })).unwrap();
  };

  const existingUser = user && {
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
    phoneNumber: user.phoneNumber,
    avatar: null,
  };

  return (
    <>
      <ProtectedRoute isAllowed={Boolean(user)}>
      <Grid>
        {existingUser && user && (
          <UserEditForm
            onSubmit={onSubmit}
            existingUser={existingUser}
            isGoogle={!!user.googleId}
            existingEmail={user.email}
          />
        )}
      </Grid>
    </ProtectedRoute>
    </>
  );
};

export default EditUser;
