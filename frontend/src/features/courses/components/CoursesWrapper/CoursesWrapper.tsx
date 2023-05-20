import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import {
  blockPadding,
  borderRadius,
  boxShadow,
  stylesGlobal,
} from '@/src/styles';
import { useAppSelector } from '@/src/store/hooks';
import Carousel from 'react-material-ui-carousel';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;
import { useRouter } from 'next/router';
import theme from '@/src/theme';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';

const styles = {
  courses: {
    borderRadius,
    boxShadow,
    padding: blockPadding,
  },
  coursesTitleWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  courseTitle: {
    maxWidth: '600px',
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

const CoursesWrapper = () => {
  const courses = useAppSelector(selectCourses);

  const router = useRouter();

  const fullCoursesView = () => {
    void router.push(`/courses`);
  };
  return (
    <Grid style={styles.courses} bgcolor={theme.palette.warning.main}>
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
          Ознакомьтесь с нашими образовательными программами:
        </span>
      </Typography>
      <Typography
        variant="body1"
        mt={5}
        color="primary.light"
        textAlign="center"
      >
        Большой выбор программ в зависимости от продолжительности,уровня знаний
        и опыта
      </Typography>
      <Typography component="div" mt={5} mb={2}>
        <Carousel
          sx={{ pt: 1 }}
          animation="slide"
          duration={1000}
          indicatorIconButtonProps={{
            style: styles.indicator,
          }}
          activeIndicatorIconButtonProps={{
            style: styles.activeIndicator,
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
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
          onClick={fullCoursesView}
        >
          Просмотреть все курсы
        </Button>
      </Grid>
    </Grid>
  );
};

export default CoursesWrapper;
