import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import { selectOneLesson } from '@/src/dispatchers/lessons/lessonsSlice';
import {
  editLesson,
  fetchOneLesson,
} from '@/src/dispatchers/lessons/lessonsThunk';
import LessonFrom from '@/src/features/lessons/admin/LessonFrom';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Edit = () => {
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(selectOneLesson);
  const router = useRouter();
  const { lessonId } = router.query as { lessonId: string };

  React.useEffect(() => {
    dispatch(fetchOneLesson(lessonId));
  }, [lessonId, router, dispatch]);

  const onSubmit = async (lesson: ILesson) => {
    await dispatch(editLesson({ lesson, id: lessonId }));
    void router.back();
  };

  return (
    <AdminLayout>
      {lesson && (
        <Grid container direction="column" gap={2}>
          <Grid item>
            <Typography variant="h4">Редактировать урок</Typography>
          </Grid>
          <Grid>
            <LessonFrom
              existingLesson={{
                theme: lesson.theme,
                video_link: lesson.video_link,
                document: lesson.document,
                course: lesson.course._id,
              }}
              onSubmit={onSubmit}
            />
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default Edit;
