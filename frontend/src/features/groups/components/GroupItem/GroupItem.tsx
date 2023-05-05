import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ApiGroup } from '@/src/types';
import { boxShadow } from '@/src/styles';
import theme from '@/src/theme';

interface Props {
  group: ApiGroup;
}

const GroupItem: React.FC<Props> = ({ group }) => {
  return (
    <Card
      sx={{ m: 1 }}
      style={{ boxShadow, cursor: 'pointer' }}
      className="card"
    >
      <CardContent>
        <Grid container direction="column" color={theme.palette.info.dark}>
          <Grid item>
            <Typography component="div">{group.title}</Typography>
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
