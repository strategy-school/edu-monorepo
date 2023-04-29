import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import about from '@/src/assets/images/about.jpg';
import Layout from '@/src/components/UI/Layout/Layout';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { whyUs } from '@/src/styles';

const height = { xs: '200px', sm: '300px', md: '400px', lg: '450px' };

const About = () => {
  return (
    <Layout title="Strategia school: about">
      <BlocksTitle titleText="О компании" />
      <Container>
        <Grid container xs>
          <Grid
            item
            xs={12}
            height={height}
            style={{
              background: `url(${about.src}) no-repeat`,
              backgroundSize: 'cover',
              width: '100%',
              borderRadius: '10px',
            }}
          />
          <Grid item>
            <Typography
              component="p"
              style={{
                textAlign: 'justify' as TextAlign,
                marginTop: '14px',
                marginBottom: '14px',
              }}
            >
              Strategia Marketing School – это новое учебное подразделение
              консалтинговой компании Strategia. Мы стремится к формированию
              нового поколения бизнес-профессионалов Кыргызстана. Наша цель -
              обучить практиков, дать необходимые навыки для достижения
              максимальной эффективности в своей деятельности по следующим
              направлениям: маркетинг, digital, продажи, телемаркетинг и
              японская концепция управления бизнесом “Кайдзен”.
            </Typography>
            <Typography variant="h6">Почему мы?</Typography>
            <Typography
              component="p"
              style={{ textAlign: 'justify' as TextAlign }}
            >
              Главным отличием Strategia Marketing School является - анализ
              запроса заказчика. На основе полученных данных, мы разрабатываем
              индивидуальную программу обучения краткосрочную или долгосрочную.
              Программа обучения полностью ориентируется на решение текущих
              задачи Вашего бизнеса. Это первый профессиональный подход на рынке
              образовательных услуг Кыргызстана. Все остальное вы можете узнать
              из Интернете бесплатно!
            </Typography>
            <Typography variant="h6" marginTop={'14px'}>
              Наша миссия
            </Typography>
            <Typography
              component="p"
              style={{ textAlign: 'justify' as TextAlign }}
            >
              Мы способствуем развитию экономики Кыргызстана предоставляя
              глобальные практики и знания по маркетингу для решения задач
              локального бизнеса.
            </Typography>
            <Typography variant="h6" marginTop={'14px'}>
              Наши ценности
            </Typography>
            <Grid item container>
              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon fontSize="small" color="secondary" />
                <Typography style={whyUs.whyUsText}>
                  Клиентоориентированность – Клиент - наше все! Мы всегда
                  стараемся вовремя определить нужды и потребности клиентов,
                  чтобы удовлетворить их с максимальной win-win пользой. В
                  идеале - превзойти ожидания и вызвать вау-эффект.
                </Typography>
              </Grid>

              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon fontSize="small" color="secondary" />
                <Typography style={whyUs.whyUsText}>
                  Профессионализм - Ключевые бизнес-консультанты и тренеры
                  Центра имеют степень MBA, зарубежное образование и успешный,
                  измеримый опыт работы в ведущих компаниях страны.
                </Typography>
              </Grid>

              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon fontSize="small" color="secondary" />
                <Typography style={whyUs.whyUsText}>
                  Инновации – трансформация достижений научно-технического
                  прогресса в пользу действующего бизнеса клиента с целью
                  улучшения качества продукции.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default About;
