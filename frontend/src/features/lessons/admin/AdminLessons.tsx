import {
  selectLessons,
  selectLessonsCount,
  selectLessonsDeleting,
  selectLessonsPage,
} from '@/src/dispatchers/lessons/lessonsSlice';
import { fetchLessons } from '@/src/dispatchers/lessons/lessonsThunk';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
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
} from '@mui/material';
import React from 'react';
import LessonTableItem from './LessonTableItem';
import FilterFormByCourse from '@/src/features/lessons/admin/FilterFormByCourse';

const AdminLessons = () => {
  const dispatch = useAppDispatch();
  const lessons = useAppSelector(selectLessons);
  const deleting = useAppSelector(selectLessonsDeleting);
  const currentPage = useAppSelector(selectLessonsPage);
  const totalCount = useAppSelector(selectLessonsCount);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchLessons({ page, limit }));
  }, [dispatch, deleting, page, limit]);

  return (
    <>
      <TableContainer component={Paper}>
        <FilterFormByCourse isLesson />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Курс</TableCell>
              <TableCell>Тема</TableCell>
              <TableCell align="center">Видео</TableCell>
              <TableCell align="center">Материал</TableCell>
              <TableCell align="center">Модерировать</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons.map((lesson) => (
              <LessonTableItem
                key={lesson._id}
                lesson={lesson}
                deleting={lesson._id === deleting}
              />
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

export default AdminLessons;
