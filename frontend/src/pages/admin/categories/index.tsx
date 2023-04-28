import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectCategories } from '@/src/dispatchers/categories/categoriesSlice';
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
  TableHead,
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

  React.useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const openEditCategory = (id: string) => {
    void router.push(`/admin/categories/edit-category/${id}`);
  };

  const deleteCategory = async (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      await dispatch(removeCategory(id));
      await dispatch(fetchCategories());
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
        </Table>
      </Container>
    </AdminLayout>
  );
};

export default Categories;
