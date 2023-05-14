import React from 'react';
import { Grid, Typography } from '@mui/material';
import { clientStyle, stylesGlobal, whyUs } from '@/src/styles';
import shirin from '@/src/assets/images/shirin.png';
import logoO from '@/src/assets/images/logo-o.png';
import gazprom from '@/src/assets/images/gazprom.png';
import giz from '@/src/assets/images/giz.png';
import idlo from '@/src/assets/images/idlo.png';
import imarat from '@/src/assets/images/imarat-stroy.png';
import toyboss from '@/src/assets/images/toyboss.png';
import krjs from '@/src/assets/images/krjc.png';
import ebpp from '@/src/assets/images/ebpp.png';
import Image from 'next/image';

const ClientWrapper = () => {
  return (
    <Grid textAlign="center">
      <Grid item>
        <Typography
          variant="h1"
          style={stylesGlobal.title}
          color="secondary.main"
          fontSize={stylesGlobal.fontSize}
        >
          Сотрудничаем с ведущими компаниями Кыргызстана
        </Typography>

        <Typography
          component="p"
          fontSize={clientStyle.fontSize}
          color="secondary.main"
          sx={{ marginTop: 2 }}
        >
          Собираем лучшие вакансии в отрасли, готовим к интервью и рекомендуем
          вас компаниям-партнерам.
        </Typography>
      </Grid>
      <Grid item sx={{ flexGrow: 1, marginTop: 4 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={6} sm={4}>
              <Image
                src={shirin}
                alt="Ширин"
                width={80}
                height={80}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={toyboss}
                alt="Тойбосс"
                width={100}
                height={73}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={imarat}
                alt="Имарат строй"
                width={110}
                height={110}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={6} sm={4}>
              <Image
                src={idlo}
                alt="IDLO"
                width={100}
                height={100}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={krjs}
                alt="KRJS"
                width={90}
                height={90}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={giz}
                alt="Giz"
                width={105}
                height={95}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={6} sm={4}>
              <Image
                src={gazprom}
                alt="Газпром"
                width={110}
                height={95}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={ebpp}
                alt="EBPP"
                width={110}
                height={90}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Image
                src={logoO}
                alt="0"
                width={100}
                height={100}
                style={{ margin: '3px 0 0 2px' }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientWrapper;
