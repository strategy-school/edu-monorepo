import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { apiURL } from '@/src/constants';
import { TeacherShort } from '@/src/types';
import Link from 'next/link';

interface Props {
  teacher: TeacherShort;
}

const TeacherCard: React.FC<Props> = ({ teacher }) => {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={apiURL + '/' + teacher.photo}
        title={teacher.user.firstName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teacher.user.firstName} {teacher.user.lastName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          href={`teachers/${teacher._id}`}
          variant="text"
        >
          Посмотреть профиль
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeacherCard;
