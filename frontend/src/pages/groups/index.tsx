import React from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  selectGroups,
  selectGroupsFetching,
} from '@/src/dispatchers/groups/groupsSlice';
import { fetchGroups } from '@/src/dispatchers/groups/groupsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import { CircularProgress, Grid } from '@mui/material';
import GroupItem from '@/src/features/groups/components/GroupItem/GroupItem';

const Index = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const groupsFetching = useAppSelector(selectGroupsFetching);

  React.useEffect(() => {
    void dispatch(fetchGroups());
  }, [dispatch]);

  console.log(groups);
  return (
    <Layout title="Школа Маркетинга Strategia: Группы">
      <BlocksTitle titleText={'Список учебных групп'} />
      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs container direction="row" justifyContent="center">
          {groupsFetching ? (
            <CircularProgress />
          ) : (
            groups.map((group) => <GroupItem key={group._id} group={group} />)
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Index;
