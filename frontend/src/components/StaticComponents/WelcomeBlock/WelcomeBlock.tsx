import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { welcomeBlockStyle } from '@/src/styles';
import Link from 'next/link';
import theme from '@/src/theme';

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
        textAlign="left"
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
          Школа Маркетинга Strategia: Стань профессионалом маркетинга за
          короткое время и начни зарабатывать больше!
        </Typography>
        <Button
          component={Link}
          href={`/about`}
          style={{
            display: 'block',
            color: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
            marginTop: '3%',
          }}
          variant="outlined"
        >
          Узнать больше
        </Button>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
