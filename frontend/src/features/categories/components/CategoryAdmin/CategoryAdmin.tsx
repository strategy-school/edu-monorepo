import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectCategories,
  selectCategoriesCount,
  selectCategoriesPage,
  selectCategoryDeleting,
  selectCategoryTogglingDeleted,
} from '@/src/dispatchers/categories/categoriesSlice';
import {
  categoryToggleDeleted,
  fetchCategories,
  removeCategory,
} from '@/src/dispatchers/categories/categoriesThunks';
import {
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CategoryAdmin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const currentPage = useAppSelector(selectCategoriesPage);
  const totalCount = useAppSelector(selectCategoriesCount);
  const deleting = useAppSelector(selectCategoryDeleting);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const togglingDeleted = useAppSelector(selectCategoryTogglingDeleted);

  React.useEffect(() => {
    void dispatch(fetchCategories({ page, limit }));
  }, [dispatch, deleting, page, limit]);

  const openEditCategory = (id: string) => {
    void router.push(`/admin/categories/edit-category/${id}`);
  };

  const deleteCategory = async (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      await dispatch(removeCategory(id));
    }
  };

  const toggleCategoryDeleted = async (id: string) => {
    await dispatch(categoryToggleDeleted(id));
    await dispatch(fetchCategories());
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название категории</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
              <TableCell>Скрыть / Показать</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id} hover>
                <TableCell>{category.title}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => openEditCategory(category._id)}
                    disabled={deleting === category._id || togglingDeleted}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => deleteCategory(category._id)}
                    disabled={deleting === category._id || togglingDeleted}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    disabled={deleting === category._id || togglingDeleted}
                    onClick={() => toggleCategoryDeleted(category._id)}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {category.isDeleted ? 'Скрыта' : 'Активна'}
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

export default CategoryAdmin;
