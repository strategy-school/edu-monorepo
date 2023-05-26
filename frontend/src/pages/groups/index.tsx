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
import { Alert, Box, CircularProgress, Grid } from '@mui/material';
import React from 'react';
import FilterFormByCourse from '@/src/components/UI/FilterFormByCourse/FilterFormByCourse';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const router = useRouter();
  const { course } = router.query as { course: string };
  const groups = useAppSelector(selectGroups);
  const groupsFetching = useAppSelector(selectGroupsFetching);

  return (
    <Layout title="Школа Маркетинга Strategia: Группы">
      <BlocksTitle titleText={'Список учебных групп'} />
      <Box>
        <FilterFormByCourse existingCourse={course} />
      </Box>
      <Grid container spacing={4} sx={{ mt: 3 }}>
        <Grid item xs container direction="row" justifyContent="center">
          {groupsFetching ? (
            <CircularProgress />
          ) : groups.length > 0 ? (
            groups.map((group) => <GroupItem key={group._id} group={group} />)
          ) : (
            <Alert severity="warning" style={{ width: '100%' }}>
              Для данного курса пока нету групп!
            </Alert>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const { course } = query as { course: string };
      await store.dispatch(fetchGroups({ course: course || undefined }));

      return { props: {} };
    },
);

export default Index;
