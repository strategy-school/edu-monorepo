import Layout from '@/src/components/UI/Layout/Layout';
import {
  selectOneGroup,
  selectOneGroupFetching,
} from '@/src/dispatchers/groups/groupsSlice';
import { fetchOneGroup } from '@/src/dispatchers/groups/groupsThunks';
import { useAppSelector } from '@/src/store/hooks';
import { wrapper } from '@/src/store/store';
import { blockStyle, blockTopStyle } from '@/src/styles';
import { CircularProgress, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const GroupId: React.FC = () => {
  const group = useAppSelector(selectOneGroup);
  const groupLoading = useAppSelector(selectOneGroupFetching);

  return (
    <Layout title={`${group?.title} page`}>
      {groupLoading ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" style={blockStyle}>
          <Grid item xs style={blockTopStyle} sx={{ p: 3 }}>
            <Typography
              variant="h3"
              fontSize={{ xs: '2rem', sm: '3rem' }}
              fontWeight={600}
            >
              {group?.title}
            </Typography>
          </Grid>
          <Grid item xs sx={{ p: 2 }}>
            <Typography component="p">{group?.description}</Typography>
          </Grid>
          <Grid item xs sx={{ p: 2 }}>
            <Typography component="p">Курс: {group?.course.title}</Typography>
          </Grid>
          <Grid item xs sx={{ p: 2 }}>
            <Typography component="p">
              С {dayjs(group?.startDate).format('DD.MM.YYYY')} по{' '}
              {dayjs(group?.endDate).format('DD.MM.YYYY')}
            </Typography>
          </Grid>
          <Grid item xs sx={{ p: 2 }}>
            <Typography component="p">
              Начало занятий: {group?.startsAt}
            </Typography>
          </Grid>
          <Grid item xs sx={{ p: 2 }}>
            <Typography component="p">
              Продолжительность одного занятия: {group?.duration}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const { groupId } = params as { groupId: string };
      await store.dispatch(fetchOneGroup(groupId));

      return { props: {} };
    },
);

export default GroupId;
