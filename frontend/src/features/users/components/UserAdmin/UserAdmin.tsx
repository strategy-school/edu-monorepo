import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectUpdateUserLoading,
  selectUsers,
} from '@/src/dispatchers/users/usersSlice';
import {
  fetchUsers,
  updateIsBannedStatus,
} from '@/src/dispatchers/users/usersThunks';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const UserAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const usersBasic = useAppSelector(selectUsers);
  const banLoading = useAppSelector(selectUpdateUserLoading);

  React.useEffect(() => {
    dispatch(fetchUsers({ role: 'user' }));
  }, [dispatch, banLoading]);

  const editBanStatus = (id: string, banStatus: boolean) => {
    if (
      window.confirm(
        `Подтвердите, что хотите изменить статус бана на 
        ${banStatus ? 'не активный' : 'активный'}`,
      )
    ) {
      dispatch(updateIsBannedStatus(id));
    }
  };

  const openOneUser = (id: string) => {
    void router.push(`users/${id}`);
  };

  return (
    <>
      <Container>
        <Table>
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell>Студенты</TableCell>
              <TableCell align="right">Бан статус</TableCell>
              <TableCell align="right">Изменить бан статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersBasic.map((student) => (
              <TableRow key={student._id}>
                <TableCell
                  sx={{ cursor: 'pointer' }}
                  onClick={() => openOneUser(student._id)}
                >
                  {student.firstName} {student.lastName}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: student.isBanned ? 'red' : 'green' }}
                >
                  {student.isBanned ? 'Бан' : 'Нет бана'}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={banLoading ? banLoading === student._id : false}
                    onClick={() => editBanStatus(student._id, student.isBanned)}
                  >
                    <Typography
                      variant="body1"
                      textTransform="none"
                      fontSize={14}
                    >
                      {student.isBanned ? 'Отменить бан' : 'Активировать бан'}
                    </Typography>
                    <EditIcon fontSize="small" sx={{ ml: 1 }} />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default UserAdmin;
