import React from 'react';
import { Grid, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { stylesGlobal } from '@/src/styles';

const styles = {
  whyUsItem: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 25px 0 ',
  },
  whyUsText: {
    margin: '0 0 0 15px',
  },
};

const AboutUs = () => {
  return (
    <Grid container alignItems="center" mt="100px">
      <Grid item lg={4}>
        <Typography
          variant="h1"
          style={stylesGlobal.title}
          color="secondary.main"
        >
          Почему вам стоит выбрать Strategia Marketing School
        </Typography>
      </Grid>
      <Grid item container lg={8}>
        <Grid item style={styles.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={styles.whyUsText}>
            Мы разрабатываем индивидуальную программу обучения, как
            краткосрочную, так и долгосрочную
          </Typography>
        </Grid>
        <Grid item style={styles.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={styles.whyUsText}>
            Программа обучения полностью ориентируется на решение задач бизнеса
            в соврменных условиях
          </Typography>
        </Grid>
        <Grid item style={styles.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={styles.whyUsText}>
            Мы стремится к формированию нового поколения бизнес-профессионалов
            Кыргызстана
          </Typography>
        </Grid>
        <Grid item style={styles.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={styles.whyUsText}>
            Это первый профессиональный подход на рынке образовательных услуг
            Кыргызстана. Все остальное вы можете узнать и так из Интернете
            бесплатно!
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
