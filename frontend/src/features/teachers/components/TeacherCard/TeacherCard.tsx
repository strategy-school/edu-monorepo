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
import Link from 'next/link';
import { Property } from 'csstype';
import FlexDirection = Property.FlexDirection;

const styles = {
  card: {
    minWidth: '290px',
    maxWidth: '300px',
  },
  media: {
    height: '140px',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'column' as FlexDirection,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface Props {
  photo: string;
  firstName: string;
  lastName: string;
  _id: string;
}

const TeacherCard: React.FC<Props> = ({ photo, firstName, lastName, _id }) => {
  return (
    <Card style={styles.card} className="card">
      <CardMedia
        style={styles.media}
        image={apiURL + '/' + photo}
        title={photo}
      />
      <CardContent style={styles.content}>
        <Typography gutterBottom variant="h6" fontWeight={500} component="div">
          {firstName} {lastName}
        </Typography>
      </CardContent>
      <CardActions style={styles.btnWrapper}>
        <Button
          component={Link}
          href={`teachers/${_id}`}
          variant="outlined"
          fullWidth
        >
          Посмотреть профиль
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeacherCard;
