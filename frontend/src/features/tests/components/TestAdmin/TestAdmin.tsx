import React, { useEffect } from 'react';
import {
  Button,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectTestDeleting,
  selectTests,
} from '@/src/dispatchers/tests/testsSlice';
import { deleteTest, fetchTests } from '@/src/dispatchers/tests/testsThunks';
import { deleteTeacher } from '@/src/dispatchers/teachers/teachersThunks';

const TestAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tests = useAppSelector(selectTests);
  const deleting = useAppSelector(selectTestDeleting);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    if (window.confirm('Подтвердите удаление теста')) {
      dispatch(deleteTest(id));
      dispatch(fetchTests());
    }
  };

  const openOneTest = (id: string) => {
    void router.push(`tests/${id}`);
  };

  return (
    <>
      <Container>
        <Typography sx={{ pl: 2 }}>
          Добавить новый тест
          <IconButton component={Link} href="tests/new-test">
            <AddIcon />
          </IconButton>
        </Typography>
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
          {/*<TableFooter>*/}
          {/*  <TableRow>*/}
          {/*    <TablePagination*/}
          {/*      rowsPerPageOptions={[10, 25, 50]}*/}
          {/*      count={totalCount}*/}
          {/*      rowsPerPage={limit}*/}
          {/*      page={currentPage - 1}*/}
          {/*      onPageChange={(_, newPage) => setPage(newPage + 1)}*/}
          {/*      onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}*/}
          {/*    />*/}
          {/*  </TableRow>*/}
          {/*</TableFooter>*/}
        </Table>
      </Container>
    </>
  );
};

export default TestAdmin;
