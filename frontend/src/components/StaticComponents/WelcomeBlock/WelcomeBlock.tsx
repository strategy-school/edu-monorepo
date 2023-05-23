import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { welcomeBlockStyle } from '@/src/styles';
import Link from 'next/link';

const WelcomeBlock = () => {
  return (
    <Grid
      container
      style={welcomeBlockStyle.welcomeBlock}
      height={welcomeBlockStyle.height}
      padding={welcomeBlockStyle.padding}
      position="relative"
    >
      <Typography
        component="div"
        position="absolute"
        style={welcomeBlockStyle.after}
      ></Typography>
      <Grid
        item
        container
        marginTop="auto"
        marginBottom="auto"
        alignItems="center"
        textAlign="center"
        direction="column"
        position="relative"
        zIndex={3}
      >
        <Typography
          variant="h1"
          style={welcomeBlockStyle.title}
          fontSize={welcomeBlockStyle.fontSize}
          maxWidth={welcomeBlockStyle.maxWidth}
          color="#fff"
        >
          Школа Маркетинга Strategia: Стань крутым маркетологом с нуля!
        </Typography>
        <Button
          component={Link}
          href={`/about`}
          style={{ display: 'block', width: '150px', color: '#fff' }}
        >
          Узнать больше
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
