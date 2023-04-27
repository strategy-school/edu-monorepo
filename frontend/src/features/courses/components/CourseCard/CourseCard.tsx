import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Course } from '@/src/types';
import { courseCardStyle } from '@/src/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { apiURL } from '@/src/constants';
import theme from '@/src/theme';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const router = useRouter();

  const openCard = () => {
    void router.push(`/courses/${course._id}`);
  };

  return (
    <Box style={courseCardStyle.courseCard}>
      <Card style={courseCardStyle.cardBody} className="card">
        <CardContent onClick={openCard}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            width={courseCardStyle.width}
            height={courseCardStyle.height}
            style={courseCardStyle.innerStyle}
            sx={{ pl: 2 }}
          >
            <Grid item xs={6} md={8} lg={8}>
              <Typography
                component="div"
                color={theme.palette.info.dark}
                fontSize={courseCardStyle.fontSize}
                fontWeight={700}
              >
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                color={theme.palette.info.dark}
                fontWeight={600}
                mt={1}
              >
                Продолжительность: {course.duration.toLowerCase()}
              </Typography>
            </Grid>
            <Grid item xs={6} md={4} lg={4}>
              <Image
                style={{ margin: '0 auto', borderRadius: '10%' }}
                src={apiURL + '/' + course.image}
                alt={course.title}
                width={100}
                height={100}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
