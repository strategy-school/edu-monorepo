import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import SearchBar from '@/src/components/UI/SearchBar/SearchBar';
import {
  selectCourseDeleting,
  selectCoursePage,
  selectCourses,
  selectCoursesCount,
} from '@/src/dispatchers/courses/coursesSlice';
import {
  deleteCourse,
  fetchCourses,
} from '@/src/dispatchers/courses/coursesThunks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  Link as MUILink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

const CoursesAdmin = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  const deleteLoading = useAppSelector(selectCourseDeleting);
  const totalCount = useAppSelector(selectCoursesCount);
  const currentPage = useAppSelector(selectCoursePage);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    void dispatch(fetchCourses({ page, limit }));
  }, [dispatch, deleteLoading, page, limit]);

  const handleDelete = (id: string) => {
    if (window.confirm('Подтвердите удаление курса')) {
      dispatch(deleteCourse(id));
    }
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(fetchCourses({ [name]: value }));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <SearchBar name="title" onChange={onTitleChange} />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название курса</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course._id} hover>
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
    </>
  );
};

export default CoursesAdmin;
