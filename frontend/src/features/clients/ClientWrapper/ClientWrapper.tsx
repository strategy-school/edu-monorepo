import React from 'react';
import { Grid, Typography } from '@mui/material';
import { stylesGlobal } from '@/src/styles';
import shirin from '@/src/assets/images/shirin.png';
import logoO from '@/src/assets/images/logo-o.png';
import gazprom from '@/src/assets/images/gazprom.png';
import giz from '@/src/assets/images/giz.png';
import idlo from '@/src/assets/images/idlo.png';
import imarat from '@/src/assets/images/imarat-stroy.png';
import toyboss from '@/src/assets/images/toyboss.png';
import krjs from '@/src/assets/images/krjc.png';
import ebpp from '@/src/assets/images/ebpp.png';
import mbank from '@/src/assets/images/mbank.jpg';
import Image from 'next/image';

const ClientWrapper = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item textAlign="center">
        <Typography
          variant="h1"
          style={stylesGlobal.title}
          color="info.dark"
          fontSize={stylesGlobal.fontSize}
        >
          Маркетологи ведущих компаний страны учились у нас
        </Typography>
      </Grid>
      <Grid item container spacing={1} sx={{ mt: 4 }} justifyContent="center">
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={shirin}
            alt="Ширин"
            width={80}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid
          item
          xs={5}
          sm={4}
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            textAlign: 'center',
          }}
        >
          <Image
            src={toyboss}
            alt="Тойбосс"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={imarat}
            alt="Имарат строй"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={idlo}
            alt="IDLO"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={krjs}
            alt="KRJS"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={giz}
            alt="Giz"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={gazprom}
            alt="Газпром"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={ebpp}
            alt="EBPP"
            width={120}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={logoO}
            alt="0"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
        <Grid item xs={5} sm={4} textAlign="center">
          <Image
            src={mbank}
            alt="0"
            width={110}
            style={{ margin: '3px 0 0 2px' }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientWrapper;
