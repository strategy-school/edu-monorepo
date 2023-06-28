import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
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
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '@/src/components/UI/SearchBar/SearchBar';
import useDebounce from '@/src/hooks/useDebounce';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  const debouncedSearch = useDebounce(
    (value) => dispatch(fetchCategories(value)),
    500,
  );

  React.useEffect(() => {
    void dispatch(fetchCategories({ page, limit }));
  }, [dispatch, deleting, page, limit]);

  const openEditCategory = (id: string) => {
    void router.push(`/admin/categories/edit-category/${id}`);
  };

  const deleteCategory = async (id: string) => {
    if (window.confirm('Вы уверены что хотите удалить категорию?')) {
      const result = await dispatch(removeCategory(id));
      await dispatch(fetchCategories({ page, limit }));
      if (result.meta.requestStatus === 'rejected') {
        window.alert(
          'Категория не может быть удалена, так как у нее есть связанные курсы',
        );
      }
    }
  };

  const toggleCategoryDeleted = async (id: string) => {
    await dispatch(categoryToggleDeleted(id));
    await dispatch(fetchCategories({ page, limit }));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSearch({ [name]: value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <SearchBar name="title" onChange={onTitleChange} />
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название категории</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
              <TableCell align="center">Скрыть / Показать</TableCell>
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
                <TableCell align="center">
                  <IconButton
                    disabled={deleting === category._id || togglingDeleted}
                    onClick={() => toggleCategoryDeleted(category._id)}
                  >
                    {category.isDeleted ? (
                      <Tooltip title="Показать">
                        <VisibilityIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Скрыть">
                        <VisibilityOffIcon />
                      </Tooltip>
                    )}{' '}
                  </IconButton>
                </TableCell>
                <TableCell>
                  {category.isDeleted ? 'Скрыт' : 'Активен'}
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
