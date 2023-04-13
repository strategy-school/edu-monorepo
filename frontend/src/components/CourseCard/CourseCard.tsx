import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Course } from '@/src/types';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const openCard = () => {
    console.log('card opened');
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card onClick={openCard} sx={{ height: '200px', width: '600px' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2">
            Продолжительность: {course.duration}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
