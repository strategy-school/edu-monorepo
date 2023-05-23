import React from 'react';
import { Grid, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { stylesGlobal, whyUs } from '@/src/styles';
import theme from '@/src/theme';

const AboutUs = () => {
  return (
    <Grid container alignItems="center" mt="100px">
      <Grid item lg={4}>
        <Typography
          variant="h1"
          style={stylesGlobal.title}
          color="info.dark"
          fontSize={stylesGlobal.fontSize}
          paddingBottom={{ xs: '20px', lg: 0 }}
        >
          Почему выбирают Школу Маркетинга Strategia?
        </Typography>
      </Grid>
      <Grid item container lg={8}>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon
            fontSize="small"
            style={{ color: theme.palette.info.dark }}
          />
          <Typography style={whyUs.whyUsText}>
            Тренеры — признанные профессионалы. Делятся опытом в решении
            бизнес‑задач и необходимыми инструментами
          </Typography>
        </Grid>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon
            fontSize="small"
            style={{ color: theme.palette.info.dark }}
          />
          <Typography style={whyUs.whyUsText}>
            Курсы обновляются регулярно. Получаете знания, которые отвечают
            требованиям рынка труда
          </Typography>
        </Grid>
        <Grid item style={whyUs.whyUsItem}>
          <CheckCircleOutlineIcon
            fontSize="small"
            style={{ color: theme.palette.info.dark }}
          />
          <Typography style={whyUs.whyUsText}>
            Практические задания и проверочные тесты. Закрепляете теорию на
            практике и получаете обратную связь
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
