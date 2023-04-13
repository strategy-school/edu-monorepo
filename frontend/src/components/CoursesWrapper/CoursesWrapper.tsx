import React from 'react';
import { Grid, Typography } from '@mui/material';
import { stylesGlobal } from '@/src/styles';
import { useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/features/courses/coursesSlice';
import Carousel from 'react-material-ui-carousel';
import CourseCard from '@/src/components/CourseCard/CourseCard';

const CoursesWrapper = () => {
  const courses = useAppSelector(selectCourses);
  return (
    <Grid>
      <Typography
        variant="h4"
        style={stylesGlobal.title}
        color="secondary.dark"
      >
        Ознакомьтесь с нашими образовательными программами:
      </Typography>
      <Typography variant="body1" mt={5}>
        Лучшие курсы. Большой выбор по уровню знаний и продолжительностью.
      </Typography>
      <Grid mt={5}>
        <Carousel animation="slide" duration={1000}>
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default CoursesWrapper;
