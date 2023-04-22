import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { Course } from '@/src/types';
import { courseCardStyle } from '@/src/styles';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { selectUser } from '@/src/features/users/usersSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectCourseDeleting } from '@/src/features/courses/coursesSlice';
import {
  deleteCourse,
  fetchCourses,
} from '@/src/features/courses/coursesThunks';
import Image from 'next/image';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector(selectCourseDeleting);

  const openCard = () => {
    void router.push(`/courses/${course._id}`);
  };

  const openEditPage = () => {
    void router.push(`/courses/edit/${course._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Подтвердите удаление курса')) {
      await dispatch(deleteCourse(course._id));
      dispatch(fetchCourses());
    }
  };

  return (
    <Box style={courseCardStyle.courseCard}>
      <Card style={courseCardStyle.cardBody} className="card">
        <CardContent onClick={openCard}>
          <Grid
            container
            spacing={2}
            justifyContent="space-between"
            width={courseCardStyle.width}
            height={courseCardStyle.height}
            style={courseCardStyle.innerStyle}
          >
            <Grid item xs>
              <Typography
                component="div"
                color="secondary.dark"
                fontSize={courseCardStyle.fontSize}
                fontWeight={700}
              >
                {course.title}
              </Typography>
              <Typography
                variant="body2"
                color="secondary.dark"
                fontWeight={600}
                mt={1}
              >
                Продолжительность: {course.duration.toLowerCase()}
              </Typography>
            </Grid>
            <Grid item>
              <Image
                style={{ margin: '0 auto', borderRadius: '10%' }}
                src={'http://localhost:8000/' + course.image}
                alt={course.title}
                width={100}
                height={100}
              />
            </Grid>
          </Grid>
        </CardContent>
        {user && user.role === 'admin' && (
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <IconButton onClick={openEditPage}>
              <EditIcon />
            </IconButton>
            <IconButton
              disabled={deleteLoading ? deleteLoading === course._id : false}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default CourseCard;
