import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  selectCourseDeleting,
  selectCourses,
} from '@/src/dispatchers/courses/coursesSlice';
import {
  deleteCourse,
  fetchCourses,
} from '@/src/dispatchers/courses/coursesThunks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
import Link from 'next/link';
import React from 'react';

const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const deleteLoading = useAppSelector(selectCourseDeleting);

  React.useEffect(() => {
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
              href="courses/new-course"
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
                    <MUILink component={Link} href={`courses/${course._id}`}>
                      {course.title}
                    </MUILink>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      component={Link}
                      href={`courses/edit/${course._id}`}
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
