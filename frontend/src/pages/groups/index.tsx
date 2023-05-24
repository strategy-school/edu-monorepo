import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectGroups,
  selectGroupsFetching,
} from '@/src/dispatchers/groups/groupsSlice';
import { fetchGroups } from '@/src/dispatchers/groups/groupsThunks';
import GroupItem from '@/src/features/groups/components/GroupItem/GroupItem';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const Index: React.FC = () => {
  const groups = useAppSelector(selectGroups);
  const groupsFetching = useAppSelector(selectGroupsFetching);

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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchGroups());

    return { props: {} };
  },
);

export default Index;
