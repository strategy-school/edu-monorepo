import React from 'react';
import { Grid, Typography } from '@mui/material';
import { welcomeBlockStyle } from '@/src/styles';

const WelcomeBlock = () => {
  return (
    <Grid
      container
      style={welcomeBlockStyle.welcomeBlock}
      height={welcomeBlockStyle.height}
      padding={welcomeBlockStyle.padding}
    >
      <Grid item container alignItems="center">
        <Typography
          variant="h1"
          style={welcomeBlockStyle.title}
          fontSize={welcomeBlockStyle.fontSize}
          maxWidth={welcomeBlockStyle.maxWidth}
          color="secondary.main"
        >
          Стань востребованным специалистом по маркетингу в Strategia Marketing
          School
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
