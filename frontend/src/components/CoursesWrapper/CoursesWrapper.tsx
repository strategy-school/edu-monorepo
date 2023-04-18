import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import {
  blockPadding,
  borderRadius,
  boxShadow,
  stylesGlobal,
} from '@/src/styles';
import { useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import Carousel from 'react-material-ui-carousel';
import CourseCard from '@/src/components/CourseCard/CourseCard';
import { Property } from 'csstype';
import TextAlign = Property.TextAlign;
import { useRouter } from 'next/router';

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
    margin: '0 10px',
  },
  activeIndicator: {
    color: '#58595BFF',
  },
};

const CoursesWrapper = () => {
  const courses = useAppSelector(selectCourses);

  const router = useRouter();

  const fullCoursesView = () => {
    void router.push(`/fullCourses`);
  };
  return (
    <Grid style={styles.courses} bgcolor="secondary.dark">
      <Typography
        variant="h4"
        style={styles.coursesTitleWrapper}
        color="primary.light"
      >
        <span style={{ ...stylesGlobal.title, ...styles.courseTitle }}>
          Ознакомьтесь с нашими образовательными программами:
        </span>
      </Typography>
      <Typography
        variant="body1"
        mt={5}
        color="primary.light"
        textAlign="center"
      >
        Лучшие программы. Большой выбор по продолжительности, которые варируются
        по уровням знаний и опыту.
      </Typography>
      <Grid mt={5} mb={2}>
        <Carousel
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
      </Grid>
      <Grid textAlign="center">
        <Button color="warning" variant="outlined" onClick={fullCoursesView}>
          Просмотреть все курсы
        </Button>
      </Grid>
    </Grid>
  );
};

export default CoursesWrapper;
