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
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectTestCount,
  selectTestDeleting,
  selectTestPage,
  selectTests,
} from '@/src/dispatchers/tests/testsSlice';
import { deleteTest, fetchTests } from '@/src/dispatchers/tests/testsThunks';

const TestAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
  const deleting = useAppSelector(selectTestDeleting);
  const currentPage = useAppSelector(selectTestPage);
  const totalCount = useAppSelector(selectTestCount);
  const [limit, setLimit] = React.useState(5);
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    dispatch(fetchTests({ page, limit }));
  }, [dispatch, page, limit, deleting]);

  const handleDelete = (id: string) => {
    if (window.confirm('Подтвердите удаление теста')) {
      dispatch(deleteTest(id));
      dispatch(fetchTests({ page, limit }));
    }
  };

  const openOneTest = (id: string) => {
    void router.push(`tests/${id}`);
  };

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container xs justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Тесты</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="tests/new-test"
              color="primary"
              variant="contained"
            >
              Добавить новый тест
            </Button>
          </Grid>
        </Grid>
        <Grid item>
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
                        <IconButton
                          component={Link}
                          href={`tests/edit/${test._id}`}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDelete(test._id)}
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

export default TestAdmin;
