import React, { useEffect } from 'react';
import {
  Button,
  Grid,
  IconButton,
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
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  selectTeacherDeleting,
  selectTeacherPage,
  selectTeachers,
  selectTeachersCount,
} from '@/src/dispatchers/teachers/teachersSlice';
import {
  fetchTeachers,
  deleteTeacher,
} from '@/src/dispatchers/teachers/teachersThunks';

const TeacherAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);
  const deleting = useAppSelector(selectTeacherDeleting);
  const currentPage = useAppSelector(selectTeacherPage);
  const totalCount = useAppSelector(selectTeachersCount);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchTeachers({ page, limit }));
  }, [dispatch, page, limit, deleting]);

  const handleDelete = (id: string) => {
    if (window.confirm('Подтвердите удаление преподавателя')) {
      dispatch(deleteTeacher(id));
    }
  };

  const openOneTeacher = (id: string) => {
    void router.push(`teachers/${id}`);
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Преподаватели</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="teachers/new-teacher"
              color="primary"
              variant="contained"
            >
              Добавить нового преподавателя
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ width: '100%' }}>
                  <TableCell>Преподаватели</TableCell>
                  <TableCell align="right">Изменить</TableCell>
                  <TableCell align="right">Удалить</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher._id} hover>
                    <TableCell
                      sx={{ cursor: 'pointer' }}
                      onClick={() => openOneTeacher(teacher._id)}
                    >
                      {teacher.user.firstName} {teacher.user.lastName}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={Link}
                        href={`teachers/edit/${teacher._id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDelete(teacher._id)}
                        disabled={teacher._id === deleting}
                      >
                        <DeleteIcon />
                      </IconButton>
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
                    onRowsPerPageChange={(e) =>
                      setLimit(parseInt(e.target.value))
                    }
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TeacherAdmin;
