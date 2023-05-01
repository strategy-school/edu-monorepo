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
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
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
      <Container>
        <Typography sx={{ pl: 2 }}>
          Категории{' '}
          <IconButton component={Link} href="/admin/categories/new-category">
            <AddIcon />
          </IconButton>
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название категории</TableCell>

              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
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
                onRowsPerPageChange={(e) => setLimit(parseInt(e.target.value))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default Categories;
