import SearchBar from '@/src/components/UI/SearchBar/SearchBar';
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
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { UserRole } from '@/src/types.d';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

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
    dispatch(fetchUsers({ role: UserRole.User, page, limit: limit }));
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

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(fetchUsers({ [name]: value, role: UserRole.User }));
  };

  return (
    <TableContainer component={Paper}>
      <SearchBar name="firstName" onChange={onNameChange} />
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ width: '100%' }}>
            <TableCell>Фамилия и имя студента</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Telegram</TableCell>
            <TableCell align="right">Бан</TableCell>
            <TableCell align="right">Изменить бан</TableCell>
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
              <TableCell>{student.email}</TableCell>
              <TableCell align="center">
                {student.phoneNumber ? student.phoneNumber : '-'}
              </TableCell>
              <TableCell align="center">
                {student.telegramUsername ? (
                  <Link
                    href={`https://t.me/${student.telegramUsername}`}
                    target="_blank"
                  >
                    @{student.telegramUsername}
                  </Link>
                ) : (
                  '-'
                )}
              </TableCell>

              <TableCell
                align="right"
                sx={{ color: student.isBanned ? 'red' : 'green' }}
              >
                {student.isBanned ? 'Бан' : 'Нет'}
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
                    {student.isBanned ? 'Отменить' : 'Активировать'}
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
  );
};

export default UserAdmin;
