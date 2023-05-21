import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  cleanError,
  selectOneLesson,
} from '@/src/dispatchers/lessons/lessonsSlice';
import {
  editLesson,
  fetchOneLesson,
} from '@/src/dispatchers/lessons/lessonsThunk';
import LessonFrom from '@/src/features/lessons/admin/LessonForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ILesson } from '@/src/types';
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
    dispatch(cleanError());
    void router.push('/admin/lessons');
  };

  return (
    <AdminLayout pageTitle="Редактировать урок">
      {lesson && (
        <LessonFrom
          existingLesson={{
            theme: lesson.theme,
            video_link: lesson.video_link,
            document: null,
            course: lesson.course._id,
          }}
          onSubmit={onSubmit}
        />
      )}
    </AdminLayout>
  );
};

export default Edit;
