import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  selectLessonEditingError,
  selectOneLesson,
} from '@/src/dispatchers/lessons/lessonsSlice';
import {
  editLesson,
  fetchOneLesson,
} from '@/src/dispatchers/lessons/lessonsThunk';
import LessonForm from '@/src/features/lessons/admin/LessonForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const Edit = () => {
  const dispatch = useAppDispatch();
  const lesson = useAppSelector(selectOneLesson);
  const error = useAppSelector(selectLessonEditingError);
  const router = useRouter();
  const { lessonId } = router.query as { lessonId: string };

  React.useEffect(() => {
    dispatch(fetchOneLesson(lessonId));
  }, [lessonId, router, dispatch]);

  const onSubmit = async (lesson: ILesson) => {
    await dispatch(editLesson({ lesson, id: lessonId }));
    void router.push('/admin/lessons');
  };

  return (
    <AdminLayout>
      {lesson && (
        <Grid container direction="column" gap={2}>
          <Grid item>
            <Typography variant="h4">Редактировать урок</Typography>
          </Grid>
          <Grid>
            <LessonForm
              existingLesson={{
                theme: lesson.theme,
                video_link: lesson.video_link,
                document: null,
                course: lesson.course._id,
                number: lesson.number.toString(),
              }}
              error={error}
              onSubmit={onSubmit}
              isEditing
            />
          </Grid>
        </Grid>
      )}
    </AdminLayout>
  );
};

export default Edit;
