import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneGroup,
  selectOneGroupFetching,
} from '@/src/dispatchers/groups/groupsSlice';
import { fetchOneGroup } from '@/src/dispatchers/groups/groupsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { blockStyle, blockTopStyle } from '@/src/styles';
import dayjs from 'dayjs';

const GroupId = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId } = router.query as { groupId: string };
  const group = useAppSelector(selectOneGroup);
  const groupLoading = useAppSelector(selectOneGroupFetching);

  React.useEffect(() => {
    void dispatch(fetchOneGroup(groupId));
  }, [dispatch, groupId]);

  console.log(group);

  return (
    <Layout title={`${group?.title} page`}>
      {groupLoading ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" style={blockStyle}>
          <Grid item xs style={blockTopStyle} sx={{ p: 2 }}>
            <Typography variant="h3">{group?.title}</Typography>
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

export default GroupId;
