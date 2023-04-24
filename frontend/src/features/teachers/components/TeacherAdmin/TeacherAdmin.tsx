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
import {
  selectOneTeacher,
  selectTeachers,
} from '@/src/features/teachers/teachersSlice';
import {
  deleteTeacher,
  fetchOneTeacher,
  fetchTeachers,
} from '@/src/features/teachers/teachersThunks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import OneTeacher from '@/src/features/teachers/components/OneTeacher/OneTeacher';
import CustomModal from '@/src/components/UI/CustomModal/CustomModal';

const TeacherAdmin = () => {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);
  const oneTeacher = useAppSelector(selectOneTeacher);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, []);

  const handleClickOpen = async (id: string) => {
    await dispatch(fetchOneTeacher(id));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление преподавателя')) {
      await dispatch(deleteTeacher(id));
      dispatch(fetchTeachers());
    }
  };

  return (
    <>
      <Container>
        <Typography sx={{ pl: 2 }}>
          Добавить нового преподавателя
          <IconButton component={Link} href="admin/teachers/new-teacher">
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
              <>
                <TableRow key={teacher._id}>
                  <TableCell
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handleClickOpen(teacher._id)}
                  >
                    {teacher.user.firstName} {teacher.user.lastName}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      href={`admin/teachers/edit/${teacher._id}`}
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
                <CustomModal onClose={handleClose} open={open}>
                  <OneTeacher key={teacher._id} teacher={oneTeacher} />
                </CustomModal>
              </>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default TeacherAdmin;
