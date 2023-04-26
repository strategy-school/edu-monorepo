import React, { useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import {
  selectBasicUsers,
  selectUpdateUserLoading,
} from '@/src/features/users/usersSlice';
import {
  fetchBasicUsers,
  updateIsBannedStatus,
} from '@/src/features/users/usersThunks';
import LoadingButton from '@mui/lab/LoadingButton';

const UserAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const usersBasic = useAppSelector(selectBasicUsers);
  const banLoading = useAppSelector(selectUpdateUserLoading);

  useEffect(() => {
    dispatch(fetchBasicUsers());
  }, [dispatch]);

  const editBanStatus = async (id: string, banStatus: boolean) => {
    if (
      window.confirm(
        `Подтвердите, что хотите изменить статус бана на 
        ${banStatus ? 'не активный' : 'активный'}`,
      )
    ) {
      await dispatch(updateIsBannedStatus(id));
      dispatch(fetchBasicUsers());
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
