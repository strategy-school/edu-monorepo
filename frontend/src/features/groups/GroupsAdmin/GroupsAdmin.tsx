import React from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectGroupPage,
  selectGroupRemoving,
  selectGroups,
  selectGroupsCount,
} from '@/src/dispatchers/groups/groupsSlice';
import {
  fetchGroups,
  removeGroup,
} from '@/src/dispatchers/groups/groupsThunks';
import {
  IconButton,
  Link as MUILink,
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
import Link from 'next/link';

const GroupsAdmin = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const totalCount = useAppSelector(selectGroupsCount);
  const currentPage = useAppSelector(selectGroupPage);
  const groupDeleting = useAppSelector(selectGroupRemoving);

  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    void dispatch(fetchGroups({ page, limit }));
  }, [dispatch, page, limit, groupDeleting]);

  const deleteGroup = async (id: string) => {
    if (window.confirm('Вы действительно хотите удалить эту группу?')) {
      await dispatch(removeGroup(id));
    }
  };

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
                <TableCell>
                  <MUILink component={Link} href={`groups/${group._id}`}>
                    {group.title}
                  </MUILink>
                </TableCell>
                <TableCell>
                  <IconButton
                    component={Link}
                    href={`/admin/groups/edit-group/${group._id}`}
                    disabled={groupDeleting === group._id}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => deleteGroup(group._id)}
                    disabled={groupDeleting === group._id}
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
