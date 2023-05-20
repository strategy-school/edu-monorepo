import React from 'react';
import { Grid, Typography } from '@mui/material';
import { stylesGlobal } from '@/src/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';

const styles = {
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const AfterCourse = () => {
  return (
    <Grid container my={5}>
      <Grid item xs={12} mb={5}>
        <Typography
          style={stylesGlobal.title}
          color="info.dark"
          variant="h4"
          fontSize={stylesGlobal.fontSize}
          textAlign="center"
        >
          Что вы получите по окончанию курса
        </Typography>
      </Grid>
      <Grid item container xs={12} spacing={1} justifyContent="space-between">
        <Grid
          item
          container
          xs={12}
          md={6}
          lg={3}
          justifyContent="space-evenly"
        >
          <Grid item style={styles.item} xs={2}>
            <PsychologyIcon fontSize="large" color="info" />
          </Grid>
          <Grid item style={styles.item} xs={8}>
            <Typography textAlign="center">
              Актуальные знания от практикующих экспертов
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          lg={3}
          justifyContent="space-evenly"
        >
          <Grid item style={styles.item} xs={2}>
            <WorkspacePremiumIcon fontSize="large" color="warning" />
          </Grid>
          <Grid item style={styles.item} xs={8}>
            <Typography textAlign="center">Сертификат</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          lg={3}
          justifyContent="space-evenly"
        >
          <Grid item style={styles.item} xs={2}>
            <MenuBookIcon fontSize="large" color="info" />
          </Grid>
          <Grid item style={styles.item} xs={8}>
            <Typography textAlign="center">Тренинговый материал</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          md={6}
          lg={3}
          justifyContent="space-evenly"
        >
          <Grid item style={styles.item} xs={2}>
            <GroupsIcon fontSize="large" color="warning" />
          </Grid>
          <Grid item style={styles.item} xs={8}>
            <Typography textAlign="center">
              Членство в клубе выпускников и привилегии
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AfterCourse;
