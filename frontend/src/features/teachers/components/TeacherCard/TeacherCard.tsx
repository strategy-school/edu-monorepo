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
  role: string | undefined;
}

const TeacherCard: React.FC<Props> = ({
  photo,
  firstName,
  lastName,
  _id,
  role,
}) => {
  return (
    <Card style={styles.card}>
      <CardMedia
        style={styles.media}
        image={apiURL + '/' + photo}
        title={photo}
      />
      <CardContent style={styles.content}>
        <Typography gutterBottom variant="h5" component="div">
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
        {role === 'admin' && (
          <>
            <Button
              component={Link}
              href={`teachers/edit/${_id}`}
              variant="outlined"
              fullWidth
              color="primary"
              style={{ marginLeft: 0, marginTop: 5 }}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="error"
              style={{ marginLeft: 0, marginTop: 5 }}
            >
              Удалить
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default TeacherCard;
