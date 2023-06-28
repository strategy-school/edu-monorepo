import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { borderRadius, boxShadow, stylesGlobal } from '@/src/styles';
import { Button, Grid, Typography } from '@mui/material';
import theme from '@/src/theme';
import { Property } from 'csstype';
import Link from 'next/link';
import { useAppSelector } from '@/src/store/hooks';
import { selectTests } from '@/src/dispatchers/tests/testsSlice';
import TestCardForSlide from '@/src/features/tests/components/TestCardForSlide/TestCardForSlide';
import TextAlign = Property.TextAlign;

const styles = {
  tests: {
    borderRadius,
    boxShadow,
  },
  coursesTitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  courseTitle: {
    maxWidth: '700px',
    textAlign: 'center' as TextAlign,
  },
  indicator: {
    color: '#fff',
    margin: '0 12px',
  },
  activeIndicator: {
    color: '#58595BFF',
  },
};

const TestWrapper = () => {
  const tests = useAppSelector(selectTests);

  return (
    <Grid
      style={styles.tests}
      padding={{ xs: '5px', sm: '30px' }}
      bgcolor={theme.palette.info.dark}
    >
      <Typography
        variant="h4"
        style={styles.coursesTitleWrapper}
        fontSize={stylesGlobal.fontSize}
        color="primary.light"
      >
        <span
          style={{
            ...stylesGlobal.title,
            ...styles.courseTitle,
          }}
        >
          Пройди тест и узнай свой уровень знаний маркетинга
        </span>
      </Typography>
      <Typography component="div" mt={1} mb={2}>
        <Carousel
          sx={{
            pt: 1,
          }}
          animation="slide"
          duration={1000}
          indicatorIconButtonProps={{
            style: styles.indicator,
          }}
          activeIndicatorIconButtonProps={{
            style: styles.activeIndicator,
          }}
        >
          {tests.map((test) => (
            <TestCardForSlide test={test} key={test._id} />
          ))}
        </Carousel>
      </Typography>
      <Grid textAlign="center" item>
        <Button
          style={{
            color: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
          }}
          variant="outlined"
          component={Link}
          href="/tests"
        >
          Просмотреть все тесты
        </Button>
      </Grid>
    </Grid>
  );
};

export default TestWrapper;
