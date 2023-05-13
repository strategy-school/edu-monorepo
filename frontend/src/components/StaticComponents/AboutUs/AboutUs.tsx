import React from 'react';
import { Grid, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { stylesGlobal, whyUs } from '@/src/styles';

const AboutUs = () => {
  return (
    <Grid container alignItems="center" mt="100px">
      <Grid item lg={4}>
        <Typography
          variant="h1"
          style={stylesGlobal.title}
          color="secondary.main"
          fontSize={stylesGlobal.fontSize}
        >
          Почему выбирают Школу Маркетинга Strategia
        </Typography>
      </Grid>
      <Grid item container lg={8}>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={whyUs.whyUsText}>
            Тренеры — признанные профессионалы. Делятся опытом в решении
            бизнес‑задач и необходимыми инструментами
          </Typography>
        </Grid>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={whyUs.whyUsText}>
            Курсы обновляются регулярно. Получаете знания, которые отвечают
            требованиям рынка труда
          </Typography>
        </Grid>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon fontSize="small" color="secondary" />
          <Typography style={whyUs.whyUsText}>
            Практические задания и проверочные тесты. Закрепляете теорию на
            практике и получаете обратную связь
          </Typography>
        </Grid>
        {/*<Grid item style={whyUs.whyUsItem}>*/}
        {/*  <CheckCircleOutlineIcon fontSize="small" color="secondary" />*/}
        {/*  <Typography style={whyUs.whyUsText}>*/}
        {/*    Это первый профессиональный подход на рынке образовательных услуг*/}
        {/*    Кыргызстана. Все остальное вы можете узнать и так из Интернете*/}
        {/*    бесплатно!*/}
        {/*  </Typography>*/}
        {/*</Grid>*/}
      </Grid>
    </Grid>
  );
};

export default AboutUs;
