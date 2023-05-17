import React from 'react';
import { useAppSelector } from '@/src/app/hooks';
import { selectCourses } from '@/src/dispatchers/courses/coursesSlice';
import CourseCard from '@/src/features/courses/components/CourseCard/CourseCard';
import { Grid, Typography, useMediaQuery } from '@mui/material';
import { stylesGlobal } from '@/src/styles';

const OneCourseBlock = () => {
  const courses = useAppSelector(selectCourses);
  const oneCourse = courses.find((course) =>
    course.title.includes('Специалист'),
  );
  const isXs = useMediaQuery('(max-width:599px)');

  return (
    <>
      {oneCourse && (
        <Grid container spacing={3} direction="column" mt={4}>
          <Grid item textAlign="center">
            <Typography
              variant={isXs ? 'h4' : 'h3'}
              color="info.dark"
              style={stylesGlobal.title}
              pl={2}
            >
              Можете попробовать этот курс:
            </Typography>
          </Grid>
          <Grid item>
            <CourseCard course={oneCourse} isFull />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OneCourseBlock;
