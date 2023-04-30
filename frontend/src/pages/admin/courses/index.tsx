import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import CoursesAdmin from "@/src/features/courses/CoursesAdmin/CoursesAdmin";

const Courses = () => {


  return (
    <AdminLayout>
      <Grid container spacing={2} direction="column">
        <Grid item xs container justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">Курсы</Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href="courses/new-course"
              variant="contained"
              color="primary"
            >
              Добавить новый курс
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <CoursesAdmin/>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Courses;
