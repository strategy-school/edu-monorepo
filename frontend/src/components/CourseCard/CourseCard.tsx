import React from 'react';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Course } from '@/src/types';
import { borderRadius } from '@/src/styles';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    position: 'relative' as const,
  },
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const openCard = () => {
    void router.push(`/courses/${course._id}`);
  };

  const openEditPage = () => {
    void router.push(`/edit-course/${course._id}`);
  };

  return (
    <Box style={styles.courseCard}>
      <Card style={styles.cardBody} className="card">
        <CardContent onClick={openCard}>
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
        {user && user.role === 'admin' && (
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <IconButton onClick={openEditPage}>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CourseCard;
