import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '@/src/components/UI/Layout/Layout';
import { useAppDispatch, useAppSelector } from '@/src/app/hooks';
import { fetchCourses } from '@/src/features/courses/coursesThunks';
import { selectCourses } from '@/src/features/courses/coursesSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  console.log(courses);
  return (
    <Layout title="Strategia home page">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        mt={5}
      >
        <Typography color="primary" fontWeight={300}>
          Strategia school with primary color and light fw
        </Typography>
        <Typography color="secondary.main" fontWeight={400}>
          Strategia school with secondary color and regular fw
        </Typography>
        <Typography color="secondary.dark" fontWeight={700}>
          Strategia school with custom color and bald fw{' '}
        </Typography>
        <h1>Strategia school</h1>
      </Box>
    </Layout>
  );
}
