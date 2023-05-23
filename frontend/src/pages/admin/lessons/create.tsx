import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { createLesson } from '@/src/dispatchers/lessons/lessonsThunk';
import LessonForm from '@/src/features/lessons/admin/LessonForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { selectLessonCreatingError } from '@/src/dispatchers/lessons/lessonsSlice';

const Create: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectLessonCreatingError);

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
          <LessonForm onSubmit={onSubmit} error={error} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Create;
