import React, { useEffect } from 'react';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCourseDeleting,
  selectCourses,
} from '@/src/features/courses/coursesSlice';
import {
  deleteCourse,
  fetchCourses,
} from '@/src/features/courses/coursesThunks';
import {
  Button,
  Grid,
  IconButton,
  Link as MUILink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const deleteLoading = useAppSelector(selectCourseDeleting);

  useEffect(() => {
    void dispatch(fetchCourses());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Подтвердите удаление курса')) {
      await dispatch(deleteCourse(id));
      dispatch(fetchCourses());
    }
  };

  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item xs container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Курсы</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="/admin/courses/new-course"
              variant="contained"
              color="primary"
            >
              Добавить новый курс
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Название курса</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell>
                    <MUILink
                      component={Link}
                      href={`/admin/courses/${course._id}`}
                    >
                      {course.title}
                    </MUILink>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      href={`/admin/courses/edit/${course._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      disabled={
                        deleteLoading ? deleteLoading === course._id : false
                      }
                      onClick={() => handleDelete(course._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Courses;
