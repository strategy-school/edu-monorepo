import React from 'react';
import { Grid, Typography } from '@mui/material';
import studentImage from '../../../assets/images/students-main.png';

const styles = {
  welcomeBlock: {
    boxShadow: '0px 0px 13px 7px #DADADA',
    borderRadius: '15px',
    padding: '30px',
    height: '450px',
    background: `url(${studentImage.src}) no-repeat`,
    backgroundPositionX: 'right',
    backgroundSize: 'contain',
  },
  title: {
    fontWeight: 700,
    fontSize: '40px',
    lineHeight: '1.5',
    maxWidth: '635px',
  },
};

const WelcomeBlock = () => {
  return (
    <Grid container style={styles.welcomeBlock}>
      <Grid item container alignItems="center">
        <Typography variant="h1" style={styles.title} color="secondary.main">
          Стань востребованным специалистом по маркетингу в Strategia Marketing
          School
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WelcomeBlock;
