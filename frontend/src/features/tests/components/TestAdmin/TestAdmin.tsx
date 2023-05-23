import {
  selectTestCount,
  selectTestDeleting,
  selectTestPage,
  selectTests,
} from '@/src/dispatchers/tests/testsSlice';
import { deleteTest, fetchTests } from '@/src/dispatchers/tests/testsThunks';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
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
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const TestAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
  const deleting = useAppSelector(selectTestDeleting);
  const currentPage = useAppSelector(selectTestPage);
  const totalCount = useAppSelector(selectTestCount);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(fetchTests({ page, limit }));
  }, [dispatch, page, limit, deleting]);

  const onDelete = (id: string) => {
    if (window.confirm('Подтвердите удаление теста')) {
      dispatch(deleteTest(id));
    }
  };

  const openOneTest = (id: string) => {
    void router.push(`tests/${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ width: '100%' }}>
            <TableCell>Тесты</TableCell>
            <TableCell>Категоря</TableCell>
            <TableCell align="right">Изменить</TableCell>
            <TableCell align="right">Удалить</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.length > 0 &&
            tests.map((test) => (
              <TableRow key={test._id}>
                <TableCell align="left" sx={{ cursor: 'pointer' }}>
                  <Button
                    variant="text"
                    onClick={() => openOneTest(test._id)}
                    sx={{ textTransform: 'none' }}
                  >
                    {test.title}
                  </Button>
                </TableCell>
                <TableCell>
                  {test.category.title && test.category.title}
                </TableCell>
                <TableCell align="right">
                  <IconButton component={Link} href={`tests/edit/${test._id}`}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDelete(test._id)}
                    disabled={test._id === deleting}
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
              rowsPerPageOptions={[5, 10, 15]}
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

export default TestAdmin;
