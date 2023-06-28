import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { ApiTransaction } from '@/src/types';
import { apiURL } from '@/src/constants';
import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  transactionCourse: ApiTransaction;
}

const ProfileCourseCard: React.FC<Props> = ({ transactionCourse }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            flexGrow: 1,
          }}
        >
          <Typography component="div" variant="h6">
            {transactionCourse.course.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="p">
            {transactionCourse.course.price} сом
          </Typography>
          <Typography
            variant="subtitle1"
            color={
              transactionCourse.isPaid === 'paid'
                ? 'info.main'
                : 'text.secondary'
            }
            fontWeight={500}
          >
            {transactionCourse.isPaid === 'paid' ? 'Оплачено' : 'В обработке'}
          </Typography>
          {transactionCourse.isPaid === 'paid' && (
            <Grid
              container
              spacing={2}
              sx={{
                flexGrow: 1,
                alignItems: 'flex-end',
              }}
            >
              {transactionCourse.course.exam && (
                <Grid item>
                  <Button
                    variant="text"
                    component={Link}
                    href={transactionCourse.course.exam}
                    sx={{
                      textTransform: 'none',
                      color: 'info.dark',
                      textDecoration: 'underline',
                      padding: 0,
                      mt: 2,
                    }}
                    target="_blank"
                  >
                    Финальный экзамен
                  </Button>
                </Grid>
              )}
              <Grid item>
                <Button
                  component={Link}
                  sx={{
                    textTransform: 'none',
                    color: 'info.dark',
                    textDecoration: 'underline',
                    padding: 0,
                    mt: 2,
                  }}
                  href={
                    transactionCourse.course_type === 'youtube'
                      ? `/lessons/${transactionCourse.course._id}`
                      : `/groups?course=${transactionCourse.course._id}`
                  }
                >
                  {transactionCourse.course_type === 'youtube'
                    ? 'Перейти к урокам'
                    : 'Перейти к расписанию'}
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{
          width: isSmallScreen ? '0px' : 170,
          display: isSmallScreen ? 'none' : 'block',
        }}
        image={`${apiURL}/${transactionCourse.course.image}`}
        alt={transactionCourse.course.title}
      />
    </Card>
  );
};

export default ProfileCourseCard;
