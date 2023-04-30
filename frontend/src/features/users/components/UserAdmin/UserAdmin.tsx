import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectUpdateUserLoading,
  selectUserPage,
  selectUsers,
  selectUsersCount,
} from '@/src/dispatchers/users/usersSlice';
import {
  fetchUsers,
  updateIsBannedStatus,
} from '@/src/dispatchers/users/usersThunks';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Grid, Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const UserAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const basicUsers = useAppSelector(selectUsers);
  const banLoading = useAppSelector(selectUpdateUserLoading);
  const totalCount = useAppSelector(selectUsersCount);
  const currentPage = useAppSelector(selectUserPage);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchUsers({ role: 'user', page, limit: limit }));
  }, [dispatch, page, limit, banLoading]);

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
      <Grid container spacing={2} direction="column">
        <Typography variant="h4">Студенты</Typography>
        <TableContainer component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ width: '100%' }}>
                <TableCell>Фамилия и имя студента</TableCell>
                <TableCell align="right">Бан статус</TableCell>
                <TableCell align="right">Изменить бан статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basicUsers.map((student) => (
                  <TableRow key={student._id} hover>
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
            <TableFooter>
              <TableRow>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    count={totalCount}
                    rowsPerPage={limit}
                    page={currentPage - 1}
                    onPageChange={(_, newPage) => setPage(newPage + 1)}
                    onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default UserAdmin;
