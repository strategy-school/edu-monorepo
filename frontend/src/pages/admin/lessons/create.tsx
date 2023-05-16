import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { createLesson } from '@/src/dispatchers/lessons/lessonsThunk';
import LessonFrom from '@/src/features/lessons/admin/LessonFrom';
import { useAppDispatch } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Create: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (lesson: ILesson) => {
    await dispatch(createLesson(lesson));
    void router.back();
  };

  return (
    <AdminLayout>
      <Grid container direction="column" gap={2}>
        <Grid item>
          <Typography variant="h4">Создать урок</Typography>
        </Grid>
        <Grid>
          <LessonFrom onSubmit={onSubmit} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Create;
