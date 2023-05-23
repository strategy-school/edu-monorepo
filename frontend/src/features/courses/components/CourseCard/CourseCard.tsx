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
            paddingLeft={isXs ? 0 : '10px'}
          >
            <Grid item xs={12} sm={8}>
              <Typography
                component="div"
                color={theme.palette.info.dark}
                fontSize={currentCardStyle.fontSize}
                fontWeight={700}
                maxWidth="600px"
              >
                {course.title}
              </Typography>
              <Typography
                variant={isFull ? (isSm ? 'body2' : 'h6') : 'body2'}
                color={theme.palette.info.dark}
                fontWeight={600}
                fontSize={currentCardStyle.fontSize}
                mt={1}
              >
                {course.duration.toLowerCase()}
              </Typography>
            </Grid>
            <Grid item sm={4} display={{ xs: 'none', sm: 'inline-block' }}>
              <Image
                style={{ margin: '0 auto', borderRadius: '10%' }}
                src={apiURL + '/' + course.image}
                alt={course.title}
                width={isFull ? (isSm ? 150 : 200) : 100}
                height={isFull ? (isSm ? 150 : 200) : 100}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CourseCard;
