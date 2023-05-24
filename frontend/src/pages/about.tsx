import about from '@/src/assets/images/about.jpg';
import BlocksTitle from '@/src/components/UI/BlocksTitle/BlocksTitle';
import Layout from '@/src/components/UI/Layout/Layout';
import { selectTeachers } from '@/src/dispatchers/teachers/teachersSlice';
import { fetchTeachers } from '@/src/dispatchers/teachers/teachersThunks';
import TeacherCard from '@/src/features/teachers/components/TeacherCard/TeacherCard';
import { useAppSelector } from '@/src/store/hooks';
import { whyUs } from '@/src/styles';
import theme from '@/src/theme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HelpIcon from '@mui/icons-material/Help';
import NearMeIcon from '@mui/icons-material/NearMe';
import StarIcon from '@mui/icons-material/Star';
import { Container, Grid, Typography } from '@mui/material';
import { Property } from 'csstype';
import React from 'react';
import { wrapper } from '../store/store';
import TextAlign = Property.TextAlign;

const height = { xs: '200px', sm: '300px', md: '400px', lg: '450px' };

const About: React.FC = () => {
  const teachers = useAppSelector(selectTeachers);

  return (
    <Layout title="Школа Маркетинга Strategia: О школе">
      <BlocksTitle titleText="О школе" />
      <Container>
        <Grid container direction="column">
          <Typography
            component="div"
            height={height}
            style={{
              background: `url(${about.src}) no-repeat`,
              backgroundSize: 'cover',
              width: '100%',
              borderRadius: '10px',
            }}
          />
          <Grid item xs>
            <Typography
              component="p"
              style={{
                textAlign: 'justify' as TextAlign,
                marginTop: '14px',
                marginBottom: '14px',
                marginRight: '10px',
              }}
            >
              Школа Маркетинга Strategia – это новое учебное подразделение
              консалтинговой компании Strategia. Мы стремится к формированию
              нового поколения бизнес-профессионалов Кыргызстана. Наша цель -
              обучить практиков, дать необходимые навыки для достижения
              максимальной эффективности в своей деятельности по следующим
              направлениям: маркетинг, digital, продажи, телемаркетинг и
              японская концепция управления бизнесом “Кайдзен”.
            </Typography>
          </Grid>
          <Grid item xs style={{ position: 'relative' }}>
            <HelpIcon
              style={{ position: 'absolute', top: '4px', left: '1px' }}
            />
            <Typography variant="h6" style={{ paddingLeft: '27px' }}>
              Почему мы?
            </Typography>
            <Typography
              component="p"
              style={{ textAlign: 'justify' as TextAlign, marginRight: '10px' }}
            >
              Главным отличием Strategia Marketing School является - анализ
              запроса заказчика. На основе полученных данных, мы разрабатываем
              индивидуальную программу обучения краткосрочную или долгосрочную.
              Программа обучения полностью ориентируется на решение текущих
              задачи Вашего бизнеса. Это первый профессиональный подход на рынке
              образовательных услуг Кыргызстана.
            </Typography>
          </Grid>
          <Grid item xs style={{ position: 'relative' }}>
            <NearMeIcon
              style={{ position: 'absolute', top: '17px', left: '1px' }}
            />
            <Typography
              variant="h6"
              style={{ paddingLeft: '27px', marginTop: '14px' }}
            >
              Наша миссия
            </Typography>
            <Typography
              component="p"
              style={{ textAlign: 'justify' as TextAlign, marginRight: '10px' }}
            >
              Мы способствуем развитию экономики Кыргызстана предоставляя
              глобальные практики и знания по маркетингу для решения задач
              локального бизнеса.
            </Typography>
          </Grid>
          <Grid item xs style={{ position: 'relative' }}>
            <StarIcon
              style={{ position: 'absolute', top: '17px', left: '1px' }}
            />
            <Typography
              variant="h6"
              style={{ paddingLeft: '27px', marginTop: '14px' }}
            >
              Наши ценности
            </Typography>
            <Grid item container>
              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon
                  style={{ color: theme.palette.info.dark }}
                  fontSize="small"
                />
                <Typography style={whyUs.whyUsText}>
                  Клиентоориентированность – Клиент - наше все! Мы всегда
                  стараемся вовремя определить нужды и потребности клиентов,
                  чтобы удовлетворить их с максимальной win-win пользой. В
                  идеале - превзойти ожидания и вызвать вау-эффект.
                </Typography>
              </Grid>

              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon
                  style={{ color: theme.palette.info.dark }}
                  fontSize="small"
                />
                <Typography style={whyUs.whyUsText}>
                  Профессионализм - Ключевые бизнес-консультанты и тренеры
                  Центра имеют степень MBA, зарубежное образование и успешный,
                  измеримый опыт работы в ведущих компаниях страны.
                </Typography>
              </Grid>

              <Grid item paddingTop={'14px'} style={whyUs.whyUsItem}>
                <CheckCircleOutlineIcon
                  style={{ color: theme.palette.info.dark }}
                  fontSize="small"
                />
                <Typography style={whyUs.whyUsText}>
                  Инновации – трансформация достижений научно-технического
                  прогресса в пользу действующего бизнеса клиента с целью
                  улучшения качества продукции.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs style={{ position: 'relative' }}>
            <EmojiPeopleIcon
              style={{ position: 'absolute', top: '17px', left: '1px' }}
            />
            <Typography
              variant="h6"
              style={{ paddingLeft: '27px', marginTop: '14px' }}
            >
              Наши бизнес-тренеры
            </Typography>
            <Grid item container marginTop="14px" spacing={2}>
              {teachers.length > 0 &&
                teachers.map((teacher) => (
                  <Grid
                    item
                    container
                    justifyContent="center"
                    flexWrap="wrap"
                    xs={12}
                    md={6}
                    lg={4}
                    key={teacher._id}
                  >
                    <TeacherCard
                      _id={teacher._id}
                      firstName={teacher.user.firstName}
                      lastName={teacher.user.lastName}
                      photo={teacher.photo}
                    />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTeachers());

    return { props: {} };
  },
);

export default About;
