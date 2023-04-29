import React, { useEffect } from 'react';
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectTeachers } from '@/src/features/teachers/teachersSlice';
import {
  deleteTeacher,
  fetchTeachers,
} from '@/src/features/teachers/teachersThunks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

const TeacherAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление преподавателя')) {
      await dispatch(deleteTeacher(id));
      dispatch(fetchTeachers());
    }
  };

  const openOneTeacher = (id: string) => {
    void router.push(`teachers/${id}`);
  };
  return (
    <>
      <Container>
        <Typography sx={{ pl: 2 }}>
          Добавить нового преподавателя
          <IconButton component={Link} href="teachers/new-teacher">
            <AddIcon />
          </IconButton>
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ width: '100%' }}>
              <TableCell>Преподаватели</TableCell>
              <TableCell align="right">Изменить</TableCell>
              <TableCell align="right">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher._id}>
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
                  <IconButton onClick={() => handleDelete(teacher._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default TeacherAdmin;
