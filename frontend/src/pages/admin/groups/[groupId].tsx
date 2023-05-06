import React from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import {
  selectOneGroup,
  selectOneGroupFetching,
} from '@/src/dispatchers/groups/groupsSlice';
import {
  fetchOneGroup,
  removeGroup,
} from '@/src/dispatchers/groups/groupsThunks';
import Layout from '@/src/components/UI/Layout/Layout';
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { blockStyle, blockTopStyle } from '@/src/styles';
import dayjs from 'dayjs';
import Link from 'next/link';

const GroupId = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { groupId } = router.query as { groupId: string };
  const group = useAppSelector(selectOneGroup);
  const groupLoading = useAppSelector(selectOneGroupFetching);

  React.useEffect(() => {
    void dispatch(fetchOneGroup(groupId));
  }, [dispatch, groupId]);

  const deleteGroup = async (id: string) => {
    if (window.confirm('Вы действительно хотите удалить эту группу?')) {
      await dispatch(removeGroup(id));
      void router.push('/admin/groups');
    }
  };

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
          {group && (
            <Grid item xs sx={{ m: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteGroup(group?._id)}
                sx={{ mr: 2 }}
              >
                Удалить группу
              </Button>
              <Button
                component={Link}
                href={`/admin/groups/edit-group/${group._id}`}
                variant="contained"
                color="warning"
              >
                Редактировать группу
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </Layout>
  );
};

export default GroupId;
