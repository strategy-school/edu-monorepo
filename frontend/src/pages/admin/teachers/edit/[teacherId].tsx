import AdminLayout from '@/src/components/UI/AdminLayout/AdminLayout';
import {
  cleanError,
  selectOneTeacher,
} from '@/src/dispatchers/teachers/teachersSlice';
import {
  editTeacher,
  fetchOneTeacher,
} from '@/src/dispatchers/teachers/teachersThunks';
import TeacherForm from '@/src/features/teachers/components/TeacherForm/TeacherForm';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { ITeacher } from '@/src/types';
import { useRouter } from 'next/router';
import React from 'react';

const TeacherId = () => {
  const router = useRouter();
  const { teacherId } = router.query as { teacherId: string };
  const dispatch = useAppDispatch();
  const teacher = useAppSelector(selectOneTeacher);

  React.useEffect(() => {
    if (teacherId) {
      void dispatch(fetchOneTeacher(teacherId));
    }
  }, [dispatch, teacherId]);

  const onSubmit = async (teacher: ITeacher) => {
    await dispatch(editTeacher({ id: teacherId, teacher })).unwrap();
    dispatch(cleanError());
    void router.push(`/admin/teachers/`);
  };

  const existingTeacher = teacher && {
    user: teacher.user._id,
    info: teacher.info,
    photo: null,
    portfolio: teacher.portfolio,
  };

  return (
    <AdminLayout pageTitle="Редактировать профиль тренера">
      {existingTeacher && (
        <TeacherForm
          isEdit
          onSubmit={onSubmit}
          existingTeacher={existingTeacher}
        />
      )}
    </AdminLayout>
  );
};

export default TeacherId;
