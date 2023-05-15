import React from 'react';
import { Grid, Typography } from '@mui/material';
import YouTube from 'react-youtube';
import { stylesGlobal } from '@/src/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SellIcon from '@mui/icons-material/Sell';
import ShareIcon from '@mui/icons-material/Share';
import WorkIcon from '@mui/icons-material/Work';
import theme from '@/src/theme';

const AdBlock = () => {
  return (
    <Grid container direction="column">
      <Grid item container direction="row" paddingBottom="20px">
        <Grid
          item
          xs
          alignItems="center"
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        >
          <Typography
            variant="h1"
            style={stylesGlobal.title}
            color="info.dark"
            fontSize={stylesGlobal.fontSize}
            textAlign="center"
          >
            Для кого подходят наши курсы:
          </Typography>
        </Grid>
        <Grid item xs>
          <YouTube
            videoId={'lplDFlNtUeg'}
            title="Кому подходят наши курсы"
            className="video"
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="row"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        paddingTop="20px"
      >
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Typography component="div" position="relative">
            <TrendingUpIcon
              fontSize="large"
              style={{
                position: 'absolute',
                top: '10px',
                left: '5px',
                color: theme.palette.info.main,
              }}
            />
            <Typography component="p" marginLeft="50px">
              <Typography fontWeight={700}>Начинающим маркетологам</Typography>{' '}
              Научитесь работать с бренд-аналитикой, планировать рекламные
              кампании и выпускать продукты на рынок. Сможете начать карьеру
              маркетолога с нуля
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ mb: 2 }}>
          <Typography component="div" position="relative">
            <SellIcon
              fontSize="large"
              style={{
                position: 'absolute',
                top: '10px',
                left: '5px',
                color: theme.palette.info.main,
              }}
            />
            <Typography component="p" marginLeft="50px">
              <Typography fontWeight={700}>
                Маркетологам и менеджерам по рекламе или PR
              </Typography>{' '}
              Углубите знания в маркетинге и научитесь создавать стратегию
              продвижения продуктов на рынке
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="div" position="relative">
            <ShareIcon
              fontSize="large"
              style={{
                position: 'absolute',
                top: '10px',
                left: '5px',
                color: theme.palette.info.main,
              }}
            />
            <Typography component="p" marginLeft="50px">
              <Typography fontWeight={700}>Офлайн-маркетологам</Typography>{' '}
              Изучите новые инструменты продвижения, «подружитесь» с контекстом,
              таргетингом и SMM. Сможете сменить специализацию на более
              востребованную
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="div" position="relative">
            <WorkIcon
              fontSize="large"
              style={{
                position: 'absolute',
                top: '10px',
                left: '5px',
                color: theme.palette.info.main,
              }}
            />
            <Typography component="p" marginLeft="50px">
              <Typography fontWeight={700}>
                Руководителям и владельцам бизнеса
              </Typography>{' '}
              Узнаете, как планировать маркетинговые кампании, продвигать
              продукты и позиционировать бренд на рынке. Сможете повысить
              репутацию бренда и поднять продажи
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdBlock;
