import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { CourseShort } from '@/src/types';
import { cardStyle, fullCardStyle } from '@/src/styles';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { apiURL } from '@/src/constants';
import theme from '@/src/theme';

interface Props {
  course: CourseShort;
  isFull?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, isFull }) => {
  const router = useRouter();
  const isSm = useMediaQuery('(max-width:599px)');
  const isXs = useMediaQuery('(max-width:420px)');
  const currentCardStyle = isFull ? fullCardStyle : cardStyle;

  const openCard = () => {
    void router.push(`/courses/${course._id}`);
  };

  return (
    <Box style={currentCardStyle.card}>
      <Card
        style={currentCardStyle.cardBody}
        className="card"
        sx={{ padding: isFull ? (isSm ? 0 : '25px') : 0 }}
      >
        <CardContent onClick={openCard}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            width={currentCardStyle.width}
            height={currentCardStyle.height}
            style={currentCardStyle.innerStyle}
            sx={{ pl: 2 }}
          >
            <Grid item xs={6} md={8} lg={8}>
              <Typography
                component="div"
                color={theme.palette.info.dark}
                fontSize={currentCardStyle.fontSize}
                fontWeight={700}
              >
                {course.title}
              </Typography>
              <Typography
                variant={isFull ? (isSm ? 'body2' : 'h6') : 'body2'}
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
                width={isFull ? (isXs ? 100 : isSm ? 150 : 200) : 100}
                height={isFull ? (isXs ? 100 : isSm ? 150 : 200) : 100}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
