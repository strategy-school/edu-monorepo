import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import TeacherCard from '@/src/features/teachers/components/TeacherCard/TeacherCard';
import { useAppSelector } from '@/src/app/hooks';
import { selectTeachers } from '@/src/features/teachers/teachersSlice';
import { stylesGlobal } from '@/src/styles';
import Link from 'next/link';

const TeachersWrapper = () => {
  const teachers = useAppSelector(selectTeachers);
  return (
    <>
      <Grid container justifyContent="center" my={4}>
        <Grid item>
          <Typography
            variant="h1"
            style={stylesGlobal.title}
            color="secondary.main"
            fontSize={stylesGlobal.fontSize}
            textAlign="center"
          >
            У нас профессиональные тренеры, которые готовы делиться своим опытом
            и знаниями
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {teachers.length > 0 &&
          teachers.slice(0, 3).map((teacher) => (
            <Grid
              item
              container
              justifyContent="center"
              flexWrap="wrap"
              xs={12}
              md={6}
              lg={4}
              key={teacher._id}
            >
              <TeacherCard
                _id={teacher._id}
                firstName={teacher.user.firstName}
                lastName={teacher.user.lastName}
                photo={teacher.photo}
                role="undefined"
              />
            </Grid>
          ))}
        <Grid item container justifyContent="center" mt={5}>
          <Grid item>
            <Button
              component={Link}
              href="/teachers/"
              variant="contained"
              color="secondary"
            >
              Посмотреть всех тренеров
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TeachersWrapper;