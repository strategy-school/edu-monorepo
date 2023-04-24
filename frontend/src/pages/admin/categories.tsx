import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
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
import {
  fetchCategories,
  removeCategory,
} from '@/src/features/categories/categoriesThunks';
import { selectCategories } from '@/src/features/categories/categoriesSlice';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

const Categories = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const openEditCategory = (id: string) => {
    void router.push(`/edit-category/${id}`);
  };

  const deleteCategory = async (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      await dispatch(removeCategory(id));
      await dispatch(fetchCategories());
    }
  };

  return (
    <>
      <Container>
        <Typography sx={{ pl: 2 }}>
          Категории{' '}
          <IconButton component={Link} href="/categories/new-category">
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
    </>
  );
};

export default Categories;
