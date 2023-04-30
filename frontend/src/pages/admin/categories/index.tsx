import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  selectCategories,
  selectCategoriesCount,
  selectCategoriesPage,
  selectCategoryDeleting,
} from '@/src/dispatchers/categories/categoriesSlice';
import {
  fetchCategories,
  removeCategory,
} from '@/src/dispatchers/categories/categoriesThunks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Grid,
  IconButton, Paper,
  Table,
  TableBody,
  TableCell, TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Categories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const currentPage = useAppSelector(selectCategoriesPage);
  const totalCount = useAppSelector(selectCategoriesCount);
  const deleting = useAppSelector(selectCategoryDeleting);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    void dispatch(fetchCategories({ page, limit }));
  }, [dispatch, deleting, page, limit]);

  const openEditCategory = (id: string) => {
    void router.push(`/admin/categories/edit-category/${id}`);
  };

  const deleteCategory = (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      dispatch(removeCategory(id));
    }
  };

  return (
      <AdminLayout>
        <Grid container spacing={2} direction="column">
          <Grid item container xs justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">Категории</Typography>
            </Grid>
            <Grid item>
              <Button
                  component={Link}
                  href="/admin/categories/new-category"
                  color="primary"
                  variant="contained"
              >
                Добавить новую категорию
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Название категории</TableCell>
                    <TableCell>Изменить</TableCell>
                    <TableCell>Удалить</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                      <TableRow key={category._id} hover>
                        <TableCell>{category.title}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => openEditCategory(category._id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => deleteCategory(category._id)}>
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
      </AdminLayout>
  );
};

export default Categories;
