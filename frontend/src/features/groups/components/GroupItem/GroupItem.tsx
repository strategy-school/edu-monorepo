import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ApiGroup } from '@/src/types';
import { boxShadow } from '@/src/styles';
import theme from '@/src/theme';
import { useRouter } from 'next/router';

interface Props {
  group: ApiGroup;
}

const GroupItem: React.FC<Props> = ({ group }) => {
  const router = useRouter();

  const openPage = () => {
    void router.push(`/groups/${group._id}`);
  };

  return (
    <Card
      sx={{ m: 1 }}
      style={{ boxShadow, cursor: 'pointer', width: '40vw' }}
      className="card"
    >
      <CardContent onClick={openPage}>
        <Grid container direction="column" color={theme.palette.info.dark}>
          <Grid item>
            <Typography component="div" fontWeight={700}>
              {group.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="div">
              Начало занятий: {group.startsAt}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default GroupItem;
