import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: 'auto',
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
          {transactionCourse.course.exam &&
            transactionCourse.isPaid === 'paid' && (
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
