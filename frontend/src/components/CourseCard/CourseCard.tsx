import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Course } from '@/src/types';
import { borderRadius } from '@/src/styles';
import { useRouter } from 'next/router';

interface Props {
  course: Course;
}

const styles = {
  courseCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: 'inset 0px 0px 21px 4px #ECECEC',
    },
  },
  cardBody: {
    height: '200px',
    width: '600px',
    borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const router = useRouter();

  const openCard = () => {
    void router.push(`/${course._id}`);
  };
  return (
    <Box style={styles.courseCard}>
      <Card onClick={openCard} style={styles.cardBody} className="card">
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            color="secondary.dark"
            textAlign="center"
            fontWeight={700}
          >
            {course.title}
          </Typography>
          <Typography
            variant="body2"
            color="secondary.dark"
            textAlign="center"
            fontWeight={600}
            mt={2}
          >
            Продолжительность: {course.duration.toLowerCase()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
