import React from 'react';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectGroupPage,
  selectGroups,
  selectGroupsCount,
} from '@/src/dispatchers/groups/groupsSlice';
import { fetchGroups } from '@/src/dispatchers/groups/groupsThunks';
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

const GroupsAdmin = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const totalCount = useAppSelector(selectGroupsCount);
  const currentPage = useAppSelector(selectGroupPage);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    void dispatch(fetchGroups({ page, limit }));
  }, [dispatch, page, limit]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group._id} hover>
                <TableCell>{group.title}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={totalCount}
                page={currentPage - 1}
                rowsPerPage={limit}
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

export default GroupsAdmin;
