import React, { useState } from 'react';
import { Dialog, DialogContent, Grid, Typography } from '@mui/material';
import YouTube from 'react-youtube';
import { stylesGlobal } from '@/src/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SellIcon from '@mui/icons-material/Sell';
import ShareIcon from '@mui/icons-material/Share';
import WorkIcon from '@mui/icons-material/Work';
import theme from '@/src/theme';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const AdBlock = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2} direction="column">
      <Grid item container direction="row" paddingBottom="20px">
        <Grid
          item
          xs={12}
          sm={6}
          alignItems="center"
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        >
          <Typography
            variant="h1"
            style={stylesGlobal.title}
            color="info.dark"
            fontSize={stylesGlobal.fontSize}
            maxWidth={stylesGlobal.maxWidth}
            textAlign="center"
            paddingBottom={{ xs: '30px', sm: 0 }}
            paddingRight={{ xs: '10px', lg: 0 }}
          >
            Для кого подходят наши курсы и чем должен заниматься маркетолог:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="div" position="relative" fontSize="60px">
            <PlayCircleOutlineIcon
              fontSize="inherit"
              cursor="pointer"
              onClick={() => setOpen(true)}
              style={{
                position: 'absolute',
                top: '35%',
                left: '45%',
                color: 'white',
              }}
            />
            <Typography
              component="img"
              src="https://i.ytimg.com/vi/JUuG1P9OtRw/maxresdefault.jpg"
              style={{ width: '100%', height: 'auto' }}
              borderRadius="20px"
              onClick={() => setOpen(true)}
            />
          </Typography>
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
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2 }}>
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
            <Typography component="div" marginLeft="50px">
              <Typography fontWeight={700}>Начинающим маркетологам</Typography>{' '}
              Научитесь работать с бренд-аналитикой, планировать рекламные
              кампании и выпускать продукты на рынок. Сможете начать карьеру
              маркетолога с нуля
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ mb: 2 }}>
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
            <Typography component="div" marginLeft="50px">
              <Typography fontWeight={700}>
                Маркетологам и менеджерам по рекламе или PR
              </Typography>{' '}
              Углубите знания в маркетинге и научитесь создавать стратегию
              продвижения продуктов на рынке
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
            <Typography component="div" marginLeft="50px">
              <Typography fontWeight={700}>Офлайн-маркетологам</Typography>{' '}
              Изучите новые инструменты продвижения, «подружитесь» с контекстом,
              таргетингом и SMM. Сможете сменить специализацию на более
              востребованную
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
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
            <Typography component="div" marginLeft="50px">
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
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            width: '80%',
            maxWidth: 'none',
          },
        }}
      >
        <DialogContent>
          <YouTube
            videoId={'JUuG1P9OtRw'}
            title="Кому подходят наши курсы"
            className="video"
          />
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default AdBlock;
